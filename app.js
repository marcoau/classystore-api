'use strict';

const express = require('express');
const app = express();

const PORT = 8001;

const router = require('./routes');
app.use(router);

app.listen(PORT);
console.log(`ClassyStore API @ :${PORT}`);
