import { Meeting } from "./Meeting";
import { User } from "./User";

export interface Note{
    id:number
    description: string, 
    meeting?:Meeting,
    user?:User, 
    topic:string,
    type:string,
}