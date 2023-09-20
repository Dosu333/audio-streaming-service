const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()

// Environment variables
require('dotenv/config');


app.listen(3000, () => {
    console.log('server is running on localhost');
})