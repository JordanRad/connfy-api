import { PrismaClient, Note } from '@prisma/client';
import { errorLog, infoLog } from '../logging';

const prisma = new PrismaClient();

export class NoteService {

    /**
     * Get All notes based on user id
     */
    public static async getAllNotesByUserId(userId:number) {
        try {
            let notes = await prisma.note.findMany({
                where: { userId: userId },
                include:{topic:true},
                orderBy: { createdAt: "desc" }
            })

            infoLog("NOTES "+JSON.stringify(notes))

            return notes != null ? notes : []

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }

    /**
     * Get All notes based on user id & topic
     */
     public static async getAllNotesByUserIdAndTopic(userId:number,topicId:number) {
        try {
            let notes = await prisma.note.findMany({
                where: { userId: userId, topicId:topicId },
                include:{topic:true},
                orderBy: { createdAt: "desc" }
            })

            infoLog("NOTES "+JSON.stringify(notes))

            return notes != null ? notes : []

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }
    
    /**
     * Get private notes per meeting by meeting id & user id
     */
    public static async getPrivateNotesPerMeeting(meetingId: number, userId: number) {
        try {
            let notes = await prisma.note.findMany({
                where: { meetingId: meetingId, type: "PRIVATE", userId: userId },
                orderBy: { createdAt: "desc" }
            })

            infoLog("NOTES "+JSON.stringify(notes))

            return notes != null ? notes : []

        } catch (err) {
            errorLog(err)
            return undefined
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

            infoLog("NOTES: "+JSON.stringify(notes))

            return notes != null ? notes : []

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }


    /**
    * Get shared notes per meeting by meeting id and filtered by topic
    */
    public static async getNotesByMeetingAndTopic(meetingId: number, topic: string) {

        try {
            let notes = await prisma.note.findMany({
                where: {
                    meetingId: { equals: meetingId },
                    type: { equals: "SHARED" },
                    topicString: { equals: topic }
                }, 
                include: { user: true },
                orderBy: { createdAt: "asc" }
            })

            infoLog("NOTES: "+JSON.stringify(notes))

            return notes != null ? notes : []

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }

    /**
     * Create note
     */
    public static async createNote(note: Note) {

        try {
            let createdNote = await prisma.note.create({
                data: note
            })

            infoLog("CREATED NOTE "+JSON.stringify(createdNote))

            return createdNote;

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }

    /**
     * Update note
     */
    public static async updateNote(id: number, note: any) {
        try {
            let updatedNote = await prisma.note.update({
                where: { id: id },
                data: note
            })

            infoLog("UPDATED NOTE "+JSON.stringify(updatedNote))

            return updatedNote;

        } catch (err) {
            errorLog(err)
            return undefined
        }

    }

    /**
     * Delete note
     */
    public static async deleteNote(id: number) {
        try {
            let deletedNote = await prisma.note.delete({
                where: { id: id }
            })

            infoLog("DELETED NOTE "+JSON.stringify(deletedNote))

            return deletedNote;

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }
}
