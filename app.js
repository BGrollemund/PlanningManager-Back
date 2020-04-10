const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({ message: 'no more 404' });
});

module.exports = app;
