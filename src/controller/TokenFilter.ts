import { Request, Response, NextFunction } from "express";
import { errorLog, infoLog } from "../logging"
import jwt from "jsonwebtoken"
import HeaderDetails from "../model/HeaderDetails";

export default function (req: Request, res: Response, next: NextFunction) {

    let token: string | undefined = req.headers["authorization"]

    //Remove the "Bearer " prefix
    token = token?.split(" ")[1] || ""

    if (isProtectedRoute(req)) {
        infoLog("Protected route... " + req.url)
        if (isJWTValid(token)) {
            return next()
        }
        errorLog("JWT is invalid.")
        return res.sendStatus(403)
    }

    infoLog("Unprotected route... " + req.url)
    next()

}
function isProtectedRoute(req: Request): boolean {

    let isMatching: boolean[] = urlMatchers.map(item => {
        if (req.url.toString().includes(item.url) && req.method == item.method) {
            return true
        }
        return false
    }).filter(item => item == true)

    if (isMatching[0] == true) {

        return true
    }

    return false
}

function isJWTValid(token: string): boolean {

    let secret = process.env.JWT_SECRET || "111111"

    try {
        const decoded = jwt.verify(token, secret);
        return true
    }
    catch (ex) {
        infoLog(ex.message);
        return false
    }

}

const urlMatchers: HeaderDetails[] = [{
    method: "GET",
    url: `/api/notes`
},
{
    method: "POST",
    url: `/api/notes`
},
{
    method: "PUT",
    url: `/api/notes`
},
{
    method: "DELETE",
    url: `/api/notes`
}]