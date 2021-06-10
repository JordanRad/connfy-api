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
                    topic: { equals: topic }
                },
                include: { user: true },
                orderBy: { createdAt: "asc" }
            })
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

            return deletedNote;

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }
}
