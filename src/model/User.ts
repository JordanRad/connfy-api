import { Note } from "./Note";

export interface User{
    email:string,
    name:string,
    notes?: Note[]
}