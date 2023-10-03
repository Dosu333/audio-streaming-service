const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()


// middleware
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Environment variables
require('dotenv/config');
const api = process.env.API_URL;

// Routes
const userRoutes = require('./routers/userRoute');
const songRoutes = require('./routers/songRoute');

app.use(`${api}/users`, userRoutes);
app.use(`${api}/songs`, songRoutes);


app.listen(3000, () => {
    console.log('server is running on localhost');
})