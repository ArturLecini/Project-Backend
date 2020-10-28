import {Entity} from "typeorm";
import { Timestamp } from "typeorm";
@Entity()

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
@Entity()
export class user_button{
    ACTIVATE: boolean;
}