
export type WithPrecisionColumnType = "float"
import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import { Timestamp } from "typeorm";
export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    
}

@Entity()

export class user_table{
    @PrimaryGeneratedColumn()
     ID: number;

    @Column({length: 20,
        nullable: true})
    FIRSTNAME: string;

    @Column({length: 20,
        nullable: true })
    LASTNAME: string;

    @Column({length: 50,
        nullable: false,
        unique: true })
    EMAIL: string;

    @Column({length: 12 ,
        nullable: false})
    PASSWORD: string;

    @Column({length: 50,
        nullable: true})
    ADRESS: string
    nullable: true

    @Column({length: 15,
        nullable: true
    })
    PHONE: string;

    @Column( {nullable: false
    ,  type: "enum",
    enum: UserRole,
    default: UserRole.USER})
   
    ROLE:UserRole;
    @Column( { type:"timestamp",
    precision: 1,
    nullable: false,
    default: () => "CURRENT_TIMESTAMP(1)",
    })
    CREATED:Timestamp;
     
}
@Entity()
export class user_button{
    @PrimaryColumn()
    ID: number;

    @Column({ 
        nullable: false,
        })
    ACTIVATE: boolean;}