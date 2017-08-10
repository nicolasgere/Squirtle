/// <reference types="express" />
import "reflect-metadata";
import * as express from 'express';
export declare class SquirtleController {
    private routes;
    private path;
    private pathArray;
    private ctl;
    private toInject;
    constructor(obj: any, services: Array<any>, controllers: any, routeMetadataKey: any);
    isPathValid(reqPath: string): boolean;
    execute(req: express.Request, method: string): {
        result: any;
        statusCode: any;
        contentType: any;
    };
}
