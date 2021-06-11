import { User } from '../model/User';
import { Note } from '../model/Note';
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
            return null
        }

    }



    /**
     * Get a single user by id
     */
    public static async getAllUsers() {
        try {
            let users: User[] = await prisma.user.findMany({
                include: {
                    notes: true
                }
            })
            return users
        }
        catch (err) {
            errorLog(err)
            return undefined
        }

    }
    /**
      * Get a single user by id
      */
    public static async createUser(user: User) {
        try {
            let createdUser = await prisma.user.create({
                data:user
            })
            return createdUser
        } catch (err) {
            errorLog(err)
            return undefined
        }
    }
}