import { Salameche, Route, HttpGet, HttpPost,HttpDelete, Injectable } from "./../../../index";
import { SimpleService } from "./../services/simpleService";

@Route("api/[controller]")
export class SimpleInjectionController {
    constructor(private simpleService:SimpleService){
    }

    @HttpGet
    public Get(): any {
        return this.simpleService.getName();
    }
}
