const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require('morgan');
const cors = require('cors');
const Machine = require("./models/Machine")
const Casino = require("./models/Casino")
const Table = require("./models/Table")
const sms = require("./twilio/sms")




const casinosRoute = require('./routes/casinos')
const tournamentsRoute = require('./routes/tournaments')
const evenementsRoute = require('./routes/evenements')
const machinesRoute = require('./routes/machines')
const tablesRoute = require('./routes/tables')
const trendsRoute = require('./routes/trends')

dotenv.config();
const port = process.env.PORT || 3000


const app = express()
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: '*',
  }
});




//connect to the mongoDB database
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// add middleware
app.use(express.json());
app.use(cors({ origin: true }))
app.use(helmet());
app.use(morgan("common"));

app.use("/api/casinos", casinosRoute);
app.use("/api/tournaments", tournamentsRoute);
app.use("/api/evenements", evenementsRoute);
app.use("/api/machines", machinesRoute);
app.use("/api/tables", tablesRoute);
app.use("/api/trends", trendsRoute);




app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
  // res.sendFile(__dirname + '/index.html');
});

// app.get('/frontscript.js', (req, res) => {
//   res.sendFile(__dirname + '/frontscript.js');
// });




http.listen(port, () => {
  console.log("Running on Port: " + port);
});




Machine.watch().
  on('change', async (data) => {

    switch (data.operationType) {
      case 'update':
        io.emit('machine update',
          {
            "jackpot": data.updateDescription.updatedFields.jackpot,
            "id": String(data.documentKey._id)
          }
        );
        console.log(data)

        if (data.updateDescription.updatedFields.jackpot > 50000) {

          try {
            const machine = await Machine.findById(String(data.documentKey._id), { "game": 1, "casinoId": 1 })
            const casino = await Casino.findById(String(machine.casinoId), { "name": 1 })
            sms.SMSController(casino.name, machine.game, data.updateDescription.updatedFields.jackpot)
          } catch {

            console.log("Erro un connecting to database")
          }


        }

        break;




      case "insert":
        console.log(data.fullDocument);
        io.emit('new machine',
          {
            "jackpot": data.fullDocument.jackpot,
            "game": data.fullDocument.game,
            "id": String(data.fullDocument._id)
          });
        break;
    }
  }
  );


Table.watch().
  on('change', async (data) => {

    switch (data.operationType) {
      case 'update':
        io.emit('table update',
          {
            "open": data.updateDescription.updatedFields.open,
            "id": String(data.documentKey._id)
          }
        );
        console.log(data.updateDescription)


        break;




      case "insert":
        console.log(data.fullDocument);
        io.emit('new table',
          {
            "open": data.fullDocument.open,
            "game": data.fullDocument.game,
            "id": String(data.fullDocument._id)
          });
        break;
    }
  }
  );