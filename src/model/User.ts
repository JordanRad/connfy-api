import { Note } from "./Note";

export interface User{
    id:number,
    email:string,
    name:string,
    notes?: Note[],
    password:string
}