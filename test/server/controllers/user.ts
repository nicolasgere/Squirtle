import { Route, HttpGet, HttpPost, Injectable, Controller } from "./../../../index";


@Route("api/[controller]")
export class UserController extends Controller {
    constructor(){
        super();
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
