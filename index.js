const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());


mongoose.connect(
    'mongodb://inflog:inflog@cluster0-shard-00-00.0ctlv.mongodb.net:27017,cluster0-shard-00-01.0ctlv.mongodb.net:27017,cluster0-shard-00-02.0ctlv.mongodb.net:27017/inflog?ssl=true&replicaSet=atlas-eh1gtz-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true },
    () => console.log('connected to DB')
);

const influencerRouter = require('./routes/influencer');
const brandRouter = require('./routes/brand')

app.use('/brand', brandRouter)
app.use('/influencer', influencerRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});