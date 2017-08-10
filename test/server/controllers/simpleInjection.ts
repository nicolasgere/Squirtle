import { Route, HttpGet, HttpPost,HttpDelete, Injectable, Controller } from "./../../../index";
import { SimpleService } from "./../services/simpleService";

@Route("api/injection")
export class SimpleInjectionController extends Controller {
    constructor(private simpleService:SimpleService){
        super();
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
