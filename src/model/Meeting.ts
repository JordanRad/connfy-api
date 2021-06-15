import {Note} from '../model/Note';
import {User} from '../model/User';

export interface Meeting{
    id : number,
    title:string,
    users?:User[],
    notes?:Note[],
    date: Date,
    description:string
}