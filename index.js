const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());


mongoose.connect(
    'mongodb+srv://mongodb+srv://Inflog:Inflog@cluster0.zm0iz.mongodb.net/Inflog?retryWrites=true&w=majority', { useNewUrlParser: true },
    () => console.log('connected to DB')
);

const influencerRouter = require('./routes/influencer');
const brandRouter = require('./routes/brand')

app.use('/brand', brandRouter)
app.use('/influencer', influencerRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});