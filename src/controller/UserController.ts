import express from 'express';
import { User } from '../model/User';
import { PrismaClient } from '@prisma/client';
import { errorLog } from '../logging';

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    let users: User[] = [];
    try { 
        users = await prisma.user.findMany();
    }
    catch (err) {
        res.json(err)
    }
    res.json(users)
})
router.get('/:id', async (req, res) => {
    let user: User | null = null;
    try {
        user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
    }
    catch (err) {
        res.sendStatus(404);
    }
    res.json(user)
})
router.post("/", async (req, res) => {
    let user: User | null = null;
    try {
        user = await prisma.user.create({
            data: req.body
        })
    } catch (err) {
        errorLog(err)
        res.sendStatus(409).json({ message: "Email constraint violation. Such user already exists." })
    }
    res.send(user)
})
export default router;