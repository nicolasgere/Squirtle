import { Salameche, Route, HttpGet, HttpPost,HttpDelete, Injectable } from "./../../../index";
import { SimpleService } from "./../services/simpleService";

@Route("api/injection")
export class SimpleInjectionController {
    constructor(private simpleService:SimpleService){
    }

    @HttpGet
    public Get(): any {
        return {value:this.simpleService.getName()};
    }
    @HttpGet
    public Injection2(): any {
        return {value:this.simpleService.getName2()};
    }
}
