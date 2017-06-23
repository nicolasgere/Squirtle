import { Injectable } from "./../../../index";
import * as Mongo from 'mongodb';


@Injectable
export class MongoService {

    private MONGO_URL = 'mongodb://ubimu:ubisoft@ds033046.mlab.com:33046/ubimu-dev';
    public users: Mongo.Collection;

    constructor() {
        Mongo.MongoClient.connect(this.MONGO_URL, (err, db) => {
            this.users = db.collection('users');
        });
    }
}
