/// <reference types="express" />
import * as express from 'express';
export declare class PropertyRoute {
    private methode;
    name: string;
    private functionString;
    haveId: boolean;
    nameLower: string;
    private id;
    arguments: Array<string>;
    constructor(methode: string, name: string, functionString: string);
    getArguments(func: any): string[];
    match(func: any, method: any): boolean;
    getParameters(req: express.Request): any;
}
