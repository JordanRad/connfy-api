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
     * Login with user credentials
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
     * Register an user
     */
    public static async register(user: User) {

        let newUser = user

        let hash: string = bcrypt.hashSync(user.password, saltRounds)

        newUser.password = hash

        let createdUser = await UserService.createUser(newUser)

        return createdUser
    }

}