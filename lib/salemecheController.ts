import "reflect-metadata";

import {PropertyRoute} from './route';
const typeMetadataKey = Symbol("type");
const injectMetadataKey = Symbol("inject");
import * as  express from 'express';
import * as  bodyParser from 'body-parser';

export class SalamecheController {
    private routes: Array<PropertyRoute> = [];
    private path: string;
    private pathArray: Array<string>;
    private ctl: any;
    private toInject:any = [];
    constructor(obj: any, services: Array<any>, controllers:any, routeMetadataKey ) {
        let tempInject = Reflect.getMetadata("design:paramtypes", obj);
        if (tempInject == undefined) {
        } else {
            this.toInject = tempInject.map(item => services.find(service => service.constructor.name == item.name));
        }
        this.ctl = obj;
        this.path = Reflect.getMetadata(routeMetadataKey, obj).replace('[controller]', obj.name.replace('Controller', '')).toLowerCase();
        this.pathArray = this.path.split('/');
        Object.keys(controllers[obj.name]).forEach(key => {
            let route: PropertyRoute = controllers[obj.name][key];
            if (route.haveId) {
                this.routes.push(controllers[obj.name][key]);
            } else {
                this.routes.unshift(controllers[obj.name][key]);
            }
        })
    }
    isPathValid(reqPath: string): boolean {
        let reqPathArray = reqPath.toLowerCase().split('/');
        reqPathArray = reqPathArray.slice(1, reqPathArray.length);
        let result: boolean = null;
        let i = 0;

        while (result === null) {
            if (reqPathArray[i] != this.pathArray[i]) {
                result = false;
            } else {
                if (i == this.pathArray.length - 1) {
                    result = true;
                }
            }
            i++
        }
        return result;
    }
    execute(req: express.Request, method: string) {
        let func = req.path.toLowerCase().replace(this.path, '');
        let route = this.routes.find(route => {
            return route.match(func, method);
        })
        if (!route) throw '404';

        let ctlTemp = new this.ctl(...this.toInject);
        ctlTemp.req = req;

        let result =  ctlTemp[route.name](...route.getParameters(req));
        return {result, statusCode:ctlTemp.statusCode, contentType:ctlTemp.contentType}
    }
}
