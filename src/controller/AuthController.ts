import { User } from '../model/User';
import express from 'express';
import { Credentials } from '../model/Credentials';
import { AuthService } from '../service/AuthService';
import { UserResponse } from '../model/UserResponse';
const router = express.Router();

router.post("/login", async (req, res, next) => {

    let credentials: Credentials = req.body;

    let loggedUser: User | null = await AuthService.login(credentials)

    if(loggedUser!=null){

        let jwt:string = AuthService.generateJWT(credentials.email)

        let response:UserResponse= {
            email:credentials.email,
            name:loggedUser.name,
            bearerToken:`Bearer ${jwt}`,
            id:loggedUser.id
        }

        return res.json(response)
    }
    return res.sendStatus(404)
})

router.post("/register", async (req, res) => {
    
    let user: User = req.body
   
    let createdUser: User | undefined  = await AuthService.register(user)

    if(createdUser == undefined){
        return res.sendStatus(409)
    }

    let userResponse: UserResponse = { email: createdUser.email, name: createdUser.name, id: createdUser.id }

    return res.json(userResponse)


})

export default router