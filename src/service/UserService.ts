import { User } from '../model/User';
import {Note} from '../model/Note';
import { PrismaClient } from '@prisma/client';
import { errorLog, infoLog } from '../logging';

const prisma = new PrismaClient();

export class UserService {

    /**
     * Get a single user by id
     */
    public static async getUserById(id: number) {
        try {
            let user: User | null = await prisma.user.findUnique({
                where: {
                    id: id
                },
                include: {
                    notes: true
                }
            })
            return user || null
        }
        catch (err) {
            errorLog(err) 
        }

    }

}