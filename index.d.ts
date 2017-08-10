import "reflect-metadata";
import { Configuration } from './lib/configuration';
export declare function Injectable(target: any): void;
export declare function Route(route?: string): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function HttpGet(target: any, key: any): void;
export declare function HttpPost(target: any, key: any): void;
export declare function HttpDelete(target: any, key: any): void;
export declare function HttpPut(target: any, key: any): void;
export declare class Controller {
    req: any;
}
export declare class Squirtle {
    private middlewares;
    private controllers;
    private services;
    constructor();
    addControlleur<T>(T: any): void;
    use(obj: any): void;
    addService(service: any): void;
    listen(port?: number): void;
    init(obj: Configuration, test?: boolean): void;
    getApp(port?: number): void;
}
