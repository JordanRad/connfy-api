import {Note} from '../model/Note';
import {User} from '../model/User';

export interface Meeting{
    meetingId : number,
    title:string,
    usersId:number,
    users:User[],
    notes:Note[],
    date: Date,
    description:string
}