import "reflect-metadata";

const routeMetadataKey = Symbol("route");
const typeMetadataKey = Symbol("type");
const injectMetadataKey = Symbol("inject");
import * as  express from 'express';
import * as  bodyParser from 'body-parser';
import { PropertyRoute } from './lib/route';
import { SquirtleController } from './lib/squirtleController';
import { Router } from './lib/router';
import {Configuration} from './interface/configuration';
let controllers = {};


/**
 * Made this class injectable in another service or controller.
 * @param target 
 */
export function Injectable(target: any) {
}

/**
 * Decorator for define base route for controller
 * @param route api/[controller] will use the controller name as path, api/foobar will overwrite it
 */
export function Route(route?: string) {
    return Reflect.metadata(routeMetadataKey, route);
}


function _httpMethod(target: any, key: any, method: string) {
    if (!controllers[target.constructor.name]) controllers[target.constructor.name] = {};
    controllers[target.constructor.name][key] = new PropertyRoute(method, key, target[key].toString());
}
/** Decorator for a GET handler */
export function HttpGet(target: any, key: any) {
    _httpMethod(target, key, 'GET')
}

/** Decorator for a POST handler */
export function HttpPost(target: any, key: any) {
    _httpMethod(target, key, 'POST')
}

/** Decorator for a DELETE handler */
export function HttpDelete(target: any, key: any) {
    _httpMethod(target, key, 'DELETE')
}

/** Decorator for a PUT handler */
export function HttpPut(target: any, key: any) {
    _httpMethod(target, key, 'DELETE')
}


/**
 * Extends all your controller with this class for have acces to the properties.
 */
export class Controller {
    /**
     * Express request definition
     */
    public req : Express.Request;
}


/**
 * Create your server with that class
 */
export class Squirtle {
    private middlewares: Array<any> = [];
    private controllers: Array<any> = [];
    private services: Array<any> = [];

    constructor() {
        this.middlewares = [];
    }

    private addControlleur<T>(T: any) {

        this.controllers.push(new SquirtleController(T, this.services, controllers, routeMetadataKey));
    }

    private use(obj: any) {
        this.middlewares.push(obj);
    }

    private addService(service: any) {
        let tempInject = Reflect.getMetadata("design:paramtypes", service);
        if (tempInject == undefined) {
            this.services.push(new service())
        } else {
            let toInject = tempInject.map(item => this.services.find(service => service.constructor.name == item.name));
            this.services.push(new service(...toInject))
        }
    }

    private listen(port: number = 4000) {
        const app = express();
        app.use(bodyParser.json());
        this.middlewares.forEach(middleware => {
            app.use(middleware);
        });
        let router = new Router(this.controllers);
        app.use(router.exec.bind(router));
        app.listen(port);
        console.log(`server listen port ${port}`)
    }

    public init(configuration: Configuration) {
        if (!configuration.port) configuration.port = 4000;

        if (configuration.services) configuration.services.forEach(x => this.addService(x));


        if (!configuration.controllers && !(configuration.controllers.length > 0)) throw new Error("Controllers is missings");
        configuration.controllers.forEach(x => this.addControlleur(x));

        if(configuration.middlewares){
            configuration.middlewares.forEach(x => this.use(x));
        }

        const app = express();
        app.use(bodyParser.json());
        this.middlewares.forEach(middleware => {
            app.use(middleware);
        });
        let router = new Router(this.controllers);
        app.use(router.exec.bind(router));
        app.listen(configuration.port);
        console.log(`server listen port ${configuration.port}`)
    }
    
}
