import {Squirtle, Route,HttpGet, HttpPost, Injectable } from "./../../index";
import  { UserController } from "./controllers/user";
import * as session from 'express-session';

import { SimpleController }  from "./controllers/simple";
import { Simple2Controller }  from "./controllers/simple2";
import { SessionController }  from "./controllers/session";
import { SimpleInjectionController }  from "./controllers/simpleInjection";

import { SimpleService }  from "./services/simpleService";
import { SimpleService2 }  from "./services/simpleService0";


declare var process: any;

let server = new Squirtle();

let sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})

server.init({
  controllers:[SimpleController,Simple2Controller, SimpleInjectionController, SessionController],
  services:[SimpleService2,SimpleService],
  middlewares:[sessionMiddleware]
});
