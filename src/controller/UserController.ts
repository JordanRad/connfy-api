import e from 'express';
import express from 'express';
import { User } from '../model/User';
import { UserService } from '../service/UserService';
const router = express.Router();

router.get("/", async (req, res) => {

    let users: User[] | undefined = await UserService.getAllUsers();

    if (users == undefined) {
        return res.sendStatus(404)
    }

    return res.json(users)
})
router.get('/:id', async (req, res) => {

    let user: User | null = await UserService.getUserById(parseInt(req.params.id));

    user != null ? res.json(user) : res.sendStatus(404)

})

router.get('/:email', async (req, res) => {

    let email:string = req.body

    let user: User | null = await UserService.getUserByEmail(email);

    user != null ? res.json(user) : res.sendStatus(404)

})

router.post("/", async (req, res) => {
    let user: User = req.body

    let createdUser: User | undefined = await UserService.createUser(user);

    if (createdUser == undefined) {
        return res.sendStatus(409)
    }

    return res.json(createdUser)
})
export default router;