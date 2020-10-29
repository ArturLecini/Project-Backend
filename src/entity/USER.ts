
export type WithPrecisionColumnType = "float"
import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn , UpdateDateColumn} from "typeorm";
import { Timestamp } from "typeorm";
import{ IsEmail, IsEmpty, IsNotEmpty, MaxLength, MinLength }  from 'class-validator'
import * as bcrypt from "bcryptjs";


@Entity()

export class USER{
    @PrimaryGeneratedColumn()
     ID: number;
     

    @Column({length: 20,
        nullable: true})
    FIRSTNAME: string;

    

    @Column({length: 20,
        nullable: true })
   
        LASTNAME: string;



  @MinLength(6)
@MaxLength(30)
    @IsNotEmpty()
    @Column({length: 30,
        nullable: false,
        unique: true })
    EMAIL: string;



@MinLength(8)
@MaxLength(12)
    @IsNotEmpty()
    @Column({length: 12 ,
        nullable: false})
    PASSWORD: string;
 


   
    @Column({length: 70,
        nullable: true})
    ADRESS: string
    nullable: true

  

    @Column({length: 15,
        nullable: true
    })
    PHONE: string;


    
    @Column( {nullable: false, 
        length: 5,
        default: "user"})
    ROLE:string;


    
    @Column( { type:"timestamp",
    precision: 1,
    nullable: false,
    default: () => "CURRENT_TIMESTAMP(1)",
    })
    CREATED:Timestamp;
   

    @Column({nullable: true})
  @UpdateDateColumn()
  UPDATED_AT: Date;

 bcrypt = require('bcryptjs') ;


  hashPassword(): void { 
      const salt = bcrypt.genSaltSync(10);
      this.PASSWORD = bcrypt.hashSync(this.PASSWORD, salt);
}
  checkPassword(PASSWORD: string) {
    return bcrypt.compareSync(PASSWORD, this.PASSWORD);
  }

}





@Entity()
export class user_button{
    @PrimaryColumn()
    ID: number;

    @Column({ 
        nullable: false,
        })
    ACTIVATE: boolean;}