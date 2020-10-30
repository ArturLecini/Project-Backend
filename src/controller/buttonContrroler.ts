
import { validate} from 'class-validator';
import { Request ,Response} from 'express';
import {getRepository} from 'typeorm';
import { BUTTON } from '../entity/BUTTON';


export class ButtonController {

static editbutton= async (req: Request, res: Response)=>{
    let button ;
    const{ID}= req.params;
    const { ACTIVATE }= req.body;
    const buttonRepository =getRepository(BUTTON);
    
    //try get button
    try{
        button= await buttonRepository.findOneOrFail(ID);
        
        button.ACTIVATE= ACTIVATE;
    }
    catch(e){
        return res.status(404).json({ status : "not found",code: "404", message: `button ${ID} not found`});
    }
    const errors = await validate(button);
    if(errors.length > 0 )  {
        res.status(400).json(errors);
        return;
    }
    //try to save button
    try{
     await buttonRepository.save(button);
    }
    catch(e){
        res.status(409).json({status : "conflict",code: "409",message : `button  alaready  in use`});
    }
    res.status(201).json({ status : "true",code: "201", message : `button with id ${ID} updated`});
     };

static newbutton = async(req: Request ,res: Response)=>{
        const {  ID, ACTIVATE} = req.body;
        const button = new BUTTON();
        button.ACTIVATE= ACTIVATE;
          button.ID=ID;
    
    const buttonRepository = getRepository(BUTTON);
    
    try
    { 
       await buttonRepository.save(button);
    } 
    catch (e) {
           res.status(409).json({status : "conflict",code: "409",message : `BUTTON alaready  in use`});
           return;
       }
       //If all ok, send 201 response
       res.status(201).json({ status : "true",code: "201", message : `BUTTON Created successfully`});
    };

 }
     export default ButtonController;