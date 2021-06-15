//import { Meeting } from '../model/Meeting';
import { PrismaClient,Meeting } from '@prisma/client';
import { errorLog, infoLog } from '../logging';

const prisma = new PrismaClient();

export class MeetingService {

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

    // Create a new meeting
    public static async createMeeting(meeting: Meeting) {

        try {
            let createdMeeting = await prisma.meeting.create({
                data: meeting
            })

            infoLog("Created New Meeting "+JSON.stringify(createdMeeting))

            return createdMeeting;

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }

    // Update Meeting
    public static async updateMeeting(meetingId: number, meeting: Meeting) {
        try {
            let updatedMeeting = await prisma.meeting.update({
                where: { id: meetingId,},
                data: meeting
            })

            infoLog("Updated Meeting "+JSON.stringify(updatedMeeting))

            return updatedMeeting;

        } catch (err) {
            errorLog(err)
            return undefined
        }

    }

    // Delete a meeting from the database
    public static async deleteMeeting(meetingId: number) {
        try {
            let deletedMeeting = await prisma.meeting.delete({
                where: { id: meetingId }
            })

            infoLog("Deleted Meeting "+JSON.stringify(deletedMeeting))

            return deletedMeeting;

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }
}
