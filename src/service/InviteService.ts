import { PrismaClient,Invite } from '@prisma/client';
import { errorLog, infoLog } from '../logging';

const prisma = new PrismaClient();

export class InviteService {

    // Get All Meetings from the database
    public static async getAllMeetings(meetingId: number) {
        try {
            let meetings = await prisma.meeting.findMany({
                where: { id: meetingId}
            })

            infoLog("Meetings "+JSON.stringify(meetings))

            return meetings != null ? meetings : []

        } catch (err) {
            errorLog(err)
            return undefined
        }

    }

    // Create a new invite
    public static async createInvite(userId:number, meetingId:number) {

        try {
            let createdInvite = await prisma.invite.create({
                data:{userId:userId,status:"PENDING",meetingId:meetingId}
            })

            infoLog("Created New Invite "+JSON.stringify(createdInvite))

            return createdInvite;

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }

    // Update Invite
    public static async updateInvite(meetingId: number, userId:number, status:string) {
        
        try {
            let updatedInvite = await prisma.invite.updateMany({
                where: { userId: userId,meetingId:meetingId },
                data: {status:status}
            })

            infoLog("Updated Invite "+JSON.stringify(updatedInvite))

            return updatedInvite;

        } catch (err) {
            errorLog(err)
            return undefined
        }

    }

}
