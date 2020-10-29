export type WithPrecisionColumnType = "float"
import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn , UpdateDateColumn} from "typeorm";
import{ MaxLength, MinLength }  from 'class-validator'
@Entity()
export class BUTTON{
    @PrimaryGeneratedColumn()
    ID: number;
    @MinLength(1)
    @MaxLength(1)
    @Column({ 
        nullable: false,
        })
    ACTIVATE: number;



}



