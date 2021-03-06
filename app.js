const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

const adminRoutes = require( './routes/admin' );
const userRoutes = require( './routes/user' );
const videoRoutes = require('./routes/video');

mongoose.connect('mongodb+srv://admin:admin123@pmdatabase-jyrlm.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connection success'))
    .catch(() => console.log('MongoDB Connection failure'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);

module.exports = app;
