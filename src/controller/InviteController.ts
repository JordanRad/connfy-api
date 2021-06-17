import { Invite } from '@prisma/client';
import { InviteService } from '../service/InviteService';
import express from 'express';
import { infoLog } from '../logging';
import { EmailService } from '../service/EmailService';
const router = express.Router();

router.get("/:meetingId/acceptedBy/:userId", async (req, res) => {
    let meetingId: number = parseInt(req.params.meetingId)
    let userId: number = parseInt(req.params.userId)
    let updatedInvite =
        await InviteService.updateInvite(meetingId, userId, "ACCEPTED")

    if (updatedInvite?.count == 0) {
        return res.sendStatus(404)
    }

    let filePath = __dirname + `/view/AcceptMeeting.html`
    
    return res.sendFile(filePath)
})

router.get("/:meetingId/declinedBy/:userId", async (req, res) => {
    let meetingId: number = parseInt(req.params.meetingId)
    let userId: number = parseInt(req.params.userId)
    let updatedInvite =
        await InviteService.updateInvite(meetingId, userId, "DECLINED")

    if (updatedInvite?.count == 0) {
        return res.sendStatus(404)
    }

    return res.json(`The host will be informed that you will not be available fo this meeting`)
})
// router.post("/sendMail", async (req, res) => {
    
// })
export default router;
