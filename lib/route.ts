import * as  express from 'express';


export class PropertyRoute {
    public haveId: boolean
    public nameLower: string
    private id: string
    public arguments: Array<string>
    constructor(private methode: string, public name: string, private functionString: string) {
        this.nameLower = name.toLowerCase();
        this.haveId = this.nameLower == this.methode.toLowerCase() + 'byid';
        this.arguments = this.getArguments(this.functionString);
    }
    getArguments(func) {
        return (func + '')
            .replace(/[/][/].*$/mg, '') // strip single-line comments
            .replace(/\s+/g, '') // strip white space
            .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
            .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters
            .replace(/=[^,]+/g, '') // strip any ES6 defaults
            .split(',').filter(Boolean); // split & filter [""]
    }

    match(func, method) {
        if (method != this.methode) return false;
        let res = false;
        func = func.replace('/', '').replace('/', '');
        switch (true) {
            case (func == '' && this.nameLower == this.methode.toLowerCase()): {
                res = true;
                break;
            }
            case (func != '' && this.haveId): {
                this.id = func;
                res = true;
                break
            }
            case (func == this.nameLower): {
                res = true;
                break;
            }
        }
        return res;
    }

    getParameters(req: express.Request): any {
        let params = Object.assign(req.body, req.query);
        if (this.haveId) params.id = this.id;
        return this.arguments.map(argument => {
            return params[argument]
        })
    }
}
