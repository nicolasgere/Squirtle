/// <reference types="express" />
import * as express from 'express';
import { SquirtleController } from './squirtleController';
export declare class Router {
    private controllers;
    constructor(controllers: Array<SquirtleController>);
    exec(req: express.Request, res: express.Response, next: any): Promise<void>;
}
