import { Timestamp } from "typeorm";


export class user_table{
    ID: number;
    FIRSTNAME: string;
    LASTNAME: string;
    EMAIL: string;
    PASSWORD: string;
    ADRESS: string
    PHONE: string;
    ROLE:boolean;
    CREATED :Timestamp;
}
export class user_button{
    ACTIVATE: boolean;
}