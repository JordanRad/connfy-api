import { PrismaClient, User } from '@prisma/client';
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
            infoLog(JSON.stringify(user))
            return user || null

        }
        catch (err) {
            errorLog(err)
            return null
        }

    }

    /**
    * Get a single user by email
    */
    public static async getUserByEmail(email: string) {
        try {
            let user: User | null = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            infoLog(JSON.stringify(user))
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
            infoLog(JSON.stringify(users))
            return users
        }
        catch (err) {
            errorLog(err)
            return undefined
        }

    }
    /**
      * Create user
      */
    public static async createUser(user: User) {
        try {
            let createdUser = await prisma.user.create({
                data: user
            })
            infoLog(JSON.stringify(createdUser))
            return createdUser
        } catch (err) {
            errorLog(err)
            return undefined
        }
    }

    /**
     * Update user
     */
    public static async updateUser(id: number, user: User) {
        try {
            let updatedUser = await prisma.user.update({
                where: { id: id },
                data: user
            })
            infoLog(JSON.stringify(updatedUser))
            return updatedUser

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }
}