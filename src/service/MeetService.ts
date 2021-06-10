import { Meeting } from '../model/Meet';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid} from 'uuid';

const prisma = new PrismaClient();

export class MeetService {
   
    private meetings = [] as any;
    static deleteMeeting: any;
    
    // Get All Meetings from the database
    getAllMeetings() {
        return this.meetings
    }

    // public static async getAllMeetings(id: number, userId: number) {
    //     try {
    //         const meetings = await prisma.meeting.findMany({
    //             where: { id: id, userId: userId }
    //         })
    //         return meetings != null ? meetings : []
    //     } catch (err) {
    //         return(err)
    //     }
    // }


    // Create a new meeting
    createMeeting(title: string, id: string, date: Date): Meeting{
        const meeting: Meeting = {
            //uuid generates automatuc a unique id for the meeting
            id: uuid(),
            title,
            noteId: '',
            usersId: '',
            date: date,
        };

        this.meetings.push(meeting);

        return meeting;
    }

    // Delete a meeting from the database
    deleteMeeting(id: number) {
        try {
            const deleteMeeting = prisma.meeting.delete({
                where: { id: id }
            })
            return deleteMeeting;
        } catch (err) {
            return(err) 
        }
    }
}