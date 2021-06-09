import express from 'express';
import { Note } from '../model/Note';
import { PrismaClient } from '@prisma/client';
import {NoteService} from '../service/NoteService';
const router = express.Router();

router.get("/shared/:meetingId", async (req, res) => {

    let meetingId = parseInt(req.params.meetingId)

    let notes = await NoteService.getSharedNotesPerMeeting(meetingId)

    if(notes==undefined){
        return res.sendStatus(500)
    }

    return res.json(notes)
    
})
router.get('/private/:meetingId/:userId', async (req, res) => {
    
    let meetingId = parseInt(req.params.meetingId)
    console.log(meetingId)
    let userId = parseInt(req.params.userId)

    let notes = await NoteService.getPrivateNotesPerMeeting(meetingId,userId)

    if(notes==undefined){
        return res.sendStatus(500)
    }

    return res.json(notes)
})
router.post("/", async (req, res) => {
    
})
export default router;