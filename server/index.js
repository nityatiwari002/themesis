import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
import userRoutes from './routes/userRouter.js';

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/api/v1/users', userRoutes);

const CONNECTION_URL = 'mongodb+srv://singhshreya0511:shreya1234@themesis.39cw6yy.mongodb.net/';
const PORT = process.env.port || 5001;

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => {console.log(`Server is Running on Port : ${PORT}`)}))
.catch((error) => {console.log(error.message)});

