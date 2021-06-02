import express from 'express';
import cors from 'cors';
import userController from './controller/UserController';
import {infoLog} from './logging';
const app = express();


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(cors());

app.use("/api/users/",userController);

app.get('/', async (req, res) => {
  res.send("Hello")
})


const PORT = process.env.PORT || 8000
app.listen(PORT , () => {
    infoLog(`Application is listening on port ${PORT}`)
})