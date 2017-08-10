import { Controller } from "./../../../index";
export declare class UserController extends Controller {
    constructor();
    Get(isArchived?: boolean): any;
    GetById(id: string): any;
    Post(email: string, age: number): any;
}
