import express from 'express';
import { Meeting } from '../model/Meeting';
import { MeetingService } from '../service/MeetingService';
const router = express.Router();

router.get("/meetings/:meetingId", async (req, res) => {

    let meetingId: number = parseInt(req.params.meetingId)

    let meetings: Meeting[] | undefined =
        await MeetingService.getAllMeetings(meetingId)

    if (meetings == undefined) {
        return res.sendStatus(404)
    }

    return res.json(meetings)
})

router.post("/", async (req, res) => {
    let meeting: Meeting = req.body;
    
    let createdMeeting: Meeting | undefined =
        await MeetingService.createMeeting(meeting)

    if (createdMeeting == undefined) {
        return res.sendStatus(409)
    }

    return res.json(createdMeeting);

})

router.put("/:meetingId", async (req, res) => {
    let meetingId: number = parseInt(req.params.meetingId)
    let meeting: Meeting = req.body;

    let updatedMeeting: Meeting | undefined =
        await MeetingService.updateMeeting(meetingId, meeting)

    if (updatedMeeting == undefined) {
        return res.sendStatus(404)
    }

    return res.json(updatedMeeting);
})

router.delete("/:meetingId", async (req, res) => {
    let meetingId: number = parseInt(req.params.meetingId)

    let deletedMeeting: Meeting | undefined =
        await MeetingService.deleteMeeting(meetingId)

    if (deletedMeeting == undefined) {
        return res.sendStatus(404)
    }

    return res.json(deletedMeeting);
})

export default router;
