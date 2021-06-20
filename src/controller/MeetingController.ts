import express from 'express';
import { Meeting, User } from '.prisma/client';
import { MeetingService } from '../service/MeetingService';
import { UserService } from '../service/UserService';
import { EmailService } from '../service/EmailService';
import { infoLog } from '../logging';
import { InviteService } from '../service/InviteService';
const router = express.Router();

router.get("/upcoming/", async (req, res) => {

    let userEmail = req.body.email

    // //So that "email@example.com" & email@example.com can be both recognised 
    userEmail = userEmail.split("\"").join("")

    infoLog(userEmail)

    let upcomingMeetings: Meeting[] | undefined =
        await MeetingService.getUpcomingMeetings(userEmail.toString())

    if (upcomingMeetings == undefined) {
        return res.sendStatus(404)
    }

    return res.json(upcomingMeetings)
})
router.get("/:meetingId", async (req, res) => {

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

    else {
        let emailInvites = createdMeeting.users.split(",")
        infoLog(JSON.stringify(emailInvites))

        emailInvites.forEach(async (email) => {
            let user: User | null = await UserService.getUserByEmail(email)
            if (user != null && createdMeeting != undefined) {
                await EmailService.sendMail(email, createdMeeting.id, user.id)
                await InviteService.createInvite(user.id, createdMeeting.id)
            }
        });
        return res.json(createdMeeting);
    }
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
