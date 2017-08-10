import { Squirtle, Route, HttpGet, HttpPost,HttpDelete, Injectable } from "./../../../index";

@Route("api/foo")
export class Simple2Controller {
    constructor(){
    }

    @HttpGet
    public Get(params1:string, params2:string): any {
        return {value:"get-simple2", params1: params1, params2:params2};
    }
}