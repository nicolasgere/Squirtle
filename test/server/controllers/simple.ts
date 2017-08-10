import { Route, HttpGet, HttpPost,HttpDelete, Injectable, Controller } from "./../../../index";

@Route("api/[controller]")
export class SimpleController extends Controller{
    constructor(){
        super();
    }

    @HttpGet
    public Get(): any {
        return {value:"get"};
    }

    @HttpGet
    public Foo(): any {
        return {value:"foo"};
    }
    @HttpGet
    public GetById(id:string): any {
        return {value:id};
    }

    @HttpPost
    public Post(): any {
        return {value:"post"};
    }

    @HttpDelete
    public Delete(param1:string, param2:string): any {
        return {value:"delete", param1: param1, param2:param2};
    }

}
