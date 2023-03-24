const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/environment/.env` });

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Express app home');
});

app.listen(port, () => {
    console.log(`[INFO]: Express server is running at http://dev.quuple.com:${port}`);
});