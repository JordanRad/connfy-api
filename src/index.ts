import express from 'express';
import cors from 'cors';
import userController from './controller/UserController';
import noteController from './controller/NoteController';
import authController from './controller/AuthController';
import meetingController from './controller/MeetingController';
import {infoLog} from './logging';

import TokenFilter from './controller/TokenFilter'
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(cors());

app.use(TokenFilter)
app.use("/api/users/",userController);
app.use("/api/notes/",noteController);
app.use("/api/auth",authController)
app.use("/api/meetings/",meetingController);

app.get('/', async (req, res) => {
  res.send("Hello")
})


const PORT = process.env.PORT || 8000
app.listen(PORT , () => {
    infoLog(`Application is listening on port ${PORT}`)
})