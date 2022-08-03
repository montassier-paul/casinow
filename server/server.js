const express = require("express"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require('morgan'); 
const cors = require('cors');

const casinosRoute = require('./routes/casinos')
const tournamentsRoute = require('./routes/tournaments')
const evenementsRoute = require('./routes/evenements')
const machinesRoute = require('./routes/machines')
const tablesRoute = require('./routes/tables')
const trendsRoute = require('./routes/trends')

dotenv.config();
const port = process.env.PORT 


const app = express()

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
  res.send('Hello World!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
