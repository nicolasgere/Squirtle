import { Controller } from './../index';


/**
 * Interface for create a configuration object for the init function of the squirtle class
 */
export interface Configuration {

    /** List of class: SHOULD extends Controller*/
    controllers: Array<any>,
    /** List of class: SHOULD be Injectable*/  
    services?: Array<any>,
    /** List of middlewares: Should be a function (req,res,next) see */        
    middlewares?:Array<{(req:any,res:any,next:any):void}>
    /** Port listening by the server, by default 4000*/
    port?: number;
}