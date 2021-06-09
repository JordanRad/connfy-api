import { User } from "./User";

export interface Note{
    description: string, 
    meetingId:number,
    user?:User, 
    topic:string,
    type:string,
}