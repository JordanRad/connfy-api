import { Note } from '../model/Note';
import { PrismaClient } from '@prisma/client';
import { errorLog } from '../logging';

const prisma = new PrismaClient();

export class NoteService {

    /**
     * Get private notes per meeting by meeting id & user id
     */
    public static async getPrivateNotesPerMeeting(meetingId: number, userId: number) {
        try {
            let notes = await prisma.note.findMany({
                where: { meetingId: meetingId, type: "PRIVATE", userId: userId },
                orderBy: { createdAt: "desc" }
            })
            return notes != null ? notes : []
        } catch (err) {
            errorLog(err)
        }

    }

     /**
     * Get shared notes per meeting by meeting id
     */
    public static async getSharedNotesPerMeeting(meetingId: number) {
        try {
            let notes = await prisma.note.findMany({
                where: { meetingId: meetingId, type: "SHARED" },
                include: { user: true },
                orderBy: { createdAt: "asc" }
            })
            return notes != null ? notes : []
        } catch (err) {
            errorLog(err)
        }
    }

    public static getNotesByMeetingTopic(meetingId: number, topic: string): Note[] {
        return [];
    }
}