import express from 'express';
import { Note } from '../model/Note';
import { PrismaClient } from '@prisma/client';
import { NoteService } from '../service/NoteService';
import { errorLog } from '../logging';
const router = express.Router();

router.get("/shared/:meetingId", async (req, res) => {

    let meetingId: number = parseInt(req.params.meetingId)

    let notes: Note[] | undefined =
        await NoteService.getSharedNotesPerMeeting(meetingId)

    if (notes == undefined) {
        return res.sendStatus(404)
    }

    return res.json(notes)

})
router.get("/shared/:meetingId/topic/:topic", async (req, res) => {
    let meetingId: number = parseInt(req.params.meetingId)

    let topic: string = req.params.topic

    //So that "TOPIC" & TOPIC can be both recognised 
    topic = topic.split("\"").join("")

    let notes: Note[] | undefined =
        await NoteService.getNotesByMeetingAndTopic(meetingId, topic)

    if (notes == undefined) {
        return res.sendStatus(500)
    }

    return res.json(notes)
})
router.get('/private/:meetingId/:userId', async (req, res) => {

    let meetingId: number = parseInt(req.params.meetingId)

    let userId: number = parseInt(req.params.userId)

    let notes: Note[] | undefined =
        await NoteService.getPrivateNotesPerMeeting(meetingId, userId)

    if (notes == undefined) {
        return res.sendStatus(404)
    }

    return res.json(notes)
})
router.post("/", async (req, res) => {
    let note: Note = req.body;
    console.log("POST Request here ", note)
    let createdNote: Note | undefined =
        await NoteService.createNote(note)

    if (createdNote == undefined) {
        return res.sendStatus(409)
    }

    return res.json(createdNote);

})

router.put("/:id", async (req, res) => {
    let id: number = parseInt(req.params.id)
    let note: Note = req.body;

    let updatedNote: Note | undefined =
        await NoteService.updateNote(id, note)

    if (updatedNote == undefined) {
        return res.sendStatus(404)
    }

    return res.json(updatedNote);
})

router.delete("/:id", async (req, res) => {
    let id: number = parseInt(req.params.id)

    let deletedNote: Note | undefined =
        await NoteService.deleteNote(id)

    if (deletedNote == undefined) {
        return res.sendStatus(404)
    }

    return res.json(deletedNote);
})

export default router;