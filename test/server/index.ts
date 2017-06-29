import { Salameche, Route,HttpGet, HttpPost, Injectable } from "./../../index";
import  { UserController } from "./controllers/user";
import { MongoService } from "./services/dbService";
import * as session from 'express-session';

import { SimpleController }  from "./controllers/simple";
import { Simple2Controller }  from "./controllers/simple2";
import { SimpleInjectionController }  from "./controllers/simpleInjection";

import { SimpleService }  from "./services/simpleService";
import { SimpleService2 }  from "./services/simpleService0";


declare var process: any;

let server = new Salameche();


server.init({
  controllers:[SimpleController,Simple2Controller, SimpleInjectionController],
  services:[SimpleService2,SimpleService]
});
