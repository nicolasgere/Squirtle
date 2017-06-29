import "reflect-metadata";

const routeMetadataKey = Symbol("route");
const typeMetadataKey = Symbol("type");
const injectMetadataKey = Symbol("inject");
import * as  express from 'express';
import * as  bodyParser from 'body-parser';
import {PropertyRoute} from './lib/route';
import {SalamecheController} from './lib/salemecheController';
import {Router} from './lib/router';

let controllers = {};


export function Injectable(target: any) {
}

export function Route(route?: string) {
    return Reflect.metadata(routeMetadataKey, route);
}


function _httpMethod(target: any, key: any, method:string){
  if (!controllers[target.constructor.name]) controllers[target.constructor.name] = {};
  controllers[target.constructor.name][key] = new PropertyRoute(method, key, target[key].toString());
}

export function HttpGet(target: any, key: any) {
  _httpMethod(target, key, 'GET')
}
export function HttpPost(target: any, key: any) {
  _httpMethod(target, key, 'POST')

}
export function HttpDelete(target: any, key: any) {
  _httpMethod(target, key, 'DELETE')
}
export function HttpPut(target: any, key: any) {
  _httpMethod(target, key, 'DELETE')
}






export class Salameche {
    private middlewares: Array<any> = [];
    private controllers: Array<any> = [];
    private services: Array<any> = [];

    constructor() {
        this.middlewares = [];
    }

    public addControlleur<T>(T: any) {

        this.controllers.push(new SalamecheController(T, this.services, controllers, routeMetadataKey));
    }

    public use(obj:any){
        this.middlewares.push(obj);
    }

    public addService(service: any) {
            let tempInject = Reflect.getMetadata("design:paramtypes", service);
            if (tempInject == undefined) {
                this.services.push(new service())
            } else {
                let toInject = tempInject.map(item => this.services.find(service => service.constructor.name == item.name));
                this.services.push(new service(...toInject))
            }
    }

    public listen(port:number = 4000) {
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

    public init(obj:any, test:boolean = false) {
        if(!obj.port) obj.port = 4000;

      if(obj.services) obj.services.forEach(x => this.addService(x));


      if(!obj.controllers && !(obj.controllers.length > 0)) throw new Error("Controllers is missings");
      obj.controllers.forEach(x => this.addControlleur(x));

      if(test){
        const app = express();
        app.use(bodyParser.json());
        this.middlewares.forEach(middleware => {
            app.use(middleware);
        });
        let router = new Router(this.controllers);
        app.use(router.exec.bind(router));
        //app.listen(port);
        return app;
      }else {
        const app = express();
        app.use(bodyParser.json());
        this.middlewares.forEach(middleware => {
            app.use(middleware);
        });
        let router = new Router(this.controllers);
        app.use(router.exec.bind(router));
        app.listen(obj.port);
        console.log(`server listen port ${obj.port}`)
      }
    }
    public getApp(port:number = 4000) {


    }
}
