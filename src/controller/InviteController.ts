import { Invite } from '@prisma/client';
import {InviteService} from '../service/InviteService';
import express from 'express';
import { infoLog } from '../logging';

const router = express.Router();

router.get("/:meetingId/acceptedBy/:userId", async (req, res) => {
    let meetingId: number = parseInt(req.params.meetingId)
    let userId: number = parseInt(req.params.userId)
    let updatedInvite =
        await InviteService.updateInvite(meetingId,userId,"ACCEPTED")
    infoLog(JSON.stringify(updatedInvite?.count))
    if (updatedInvite?.count == 0) {
        return res.sendStatus(404)
    }
    
    return res.json(`User with ID: ${userId} accepted meeting - ${meetingId}`)
})

router.get("/:meetingId/declinedBy/:userId", async (req, res) => {
    let meetingId: number = parseInt(req.params.meetingId)
    let userId: number = parseInt(req.params.userId)
    return res.json(`User with ID: ${userId} declined meeting - ${meetingId}`)
})

export default router;
