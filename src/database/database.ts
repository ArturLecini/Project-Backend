import { Timestamp } from "typeorm";


export class USER{
    ID: number;
    FIRSTNAME: string;
    LASTNAME: string;
    EMAIL: string;
    PASSWORD: string;
    ADRESS: string
    PHONE: string;
    ROLE:boolean;
    CREATED :Timestamp;
    UPDATED_AT:Date;
}
export class user_button{
    ACTIVATE: boolean;
}