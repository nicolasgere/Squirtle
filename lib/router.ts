import * as  express from 'express';
import {SquirtleController} from './squirtleController'

export class Router  {
    constructor(private controllers: Array<SquirtleController>) {
    }
    async exec(req: express.Request, res: express.Response, next: any) {

        let controller = this.controllers.find((item: SquirtleController) => {
            return item.isPathValid(req.path);
        })

        if (!controller) {
            res.status(404).send('Path not found')
            return;
        };

        try {
            let obj = controller.execute(req, req.method);
            res.header("Content-Type", "application/json" );
            if (obj.result && obj.result.then) {
                let rep = await obj.result;
                res.status(obj.statusCode |200).send(rep);
            } else {
                res.status(obj.statusCode |200).send(obj.result);
            }
            next();
        } catch (e) {
          console.log(e);
            if (e == 404) {
              res.status(404).send('Path not found')

            } else {

                res.status(500).send(e)
            }
        }
    }
}
