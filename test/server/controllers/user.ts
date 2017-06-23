import { Salameche, Route, HttpGet, HttpPost, Injectable } from "./../../../index";
import { MongoService } from "./../services/dbService";

@Route("api/[controller]")
export class UserController {
    constructor(private db:MongoService){
    }

    @HttpGet
    public Get(isArchived:boolean = false): any {
        return {"TEST":"OK"};
    }

    @HttpGet
    public GetById(id:string): Promise<any> {
        return this.db.users.find({_id:id}).toArray();
    }

    @HttpPost
    public Post(email:string,age:number):Promise<any>{
        return this.db.users.insert({email,age});
    }

}
