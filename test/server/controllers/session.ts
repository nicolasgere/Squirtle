import {Route, HttpGet, HttpPost,HttpDelete, Injectable, Controller } from "./../../../index";

function checkRight() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}


@Route("api/[controller]")
export class SessionController extends Controller{
    constructor(){
        super();
    }

    @HttpPost
    public Post(params:string): any {
        this.req.session.params = params
        return "Ok";
    }

    
    @HttpGet @checkRight()
    public Get(): any {
        return this.req.session;
    }

}
