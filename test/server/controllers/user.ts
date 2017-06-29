import { Salameche, Route, HttpGet, HttpPost, Injectable } from "./../../../index";


@Route("api/[controller]")
export class UserController {
    constructor(){
    }

    @HttpGet
    public Get(isArchived:boolean = false): any {
        return {"TEST":"OK"};
    }

    @HttpGet
    public GetById(id:string): any {
       return {"TEST":"OK"};
    }

    @HttpPost
    public Post(email:string,age:number):any{
         return {"TEST":"OK"};
    }

}
