const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const app = express()


// middleware
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/static/uploads', express.static(path.join(__dirname, 'static/uploads')));

// Environment variables
require('dotenv/config');
const api = process.env.API_URL;

// Routes
const userRoutes = require('./routers/user');
const songRoutes = require('./routers/song');''
const albumRoutes = require('./routers/album');
const artistRoutes = require('./routers/artist');

app.use(`${api}/users`, userRoutes);
app.use(`${api}/songs`, songRoutes);
app.use(`${api}/album`, albumRoutes);
app.use(`${api}/artist`, artistRoutes);


app.listen(3000, () => {
    console.log('server is running on localhost');
})