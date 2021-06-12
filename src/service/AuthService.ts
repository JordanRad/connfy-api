import { User } from '../model/User';
import { PrismaClient } from '@prisma/client';
import { errorLog, infoLog } from '../logging';
import { UserService } from '../service/UserService';
import { Credentials } from "../model/Credentials";

import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
const saltRounds = 10;

const prisma = new PrismaClient();

export class AuthService {

    /**
     * Get a single user by id
     */
    public static async login(credentials: Credentials) {

        //Check if such email exists
        let user: User | null = await UserService.getUserByEmail(credentials.email)

        if (user != null) {

            //Compare the password with the hash from the database
            let isPasswordValid: boolean = bcrypt.compareSync(credentials.password, user.password)

            if (user.email == credentials.email && isPasswordValid) {

                return user
            }
            return null
        }
        return null
    }

    /**
     * Generate JWT
     */
    public static generateJWT(email: string) {

        let secret = process.env.JWT_SECRET || "111111"
        let token = jwt.sign({ email: 'email' }, secret)

        return token
    }

    /**
     * Register user
     */
    public static async register(user: User) {

        let newUser = user

        let hash: string = bcrypt.hashSync(user.password, saltRounds)

        newUser.password = hash

        let createdUser = await UserService.createUser(newUser)

        return createdUser
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
            infoLog("USERS: "+JSON.stringify(users))
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
                data: user
            })
            infoLog("CREATED USER: "+JSON.stringify(createdUser))
            return createdUser
        } catch (err) {
            errorLog(err)
            return undefined
        }
    }
}