import { Controller } from "./../../../index";
import { SimpleService } from "./../services/simpleService";
export declare class SimpleInjectionController extends Controller {
    private simpleService;
    constructor(simpleService: SimpleService);
    Get(): any;
    Injection2(): any;
}
