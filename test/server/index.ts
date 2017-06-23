import { Salameche, Route,HttpGet, HttpPost, Injectable } from "./../../index";
import  { UserController } from "./controllers/user";
import * as session from 'express-session';

declare var process: any;

let server = new Salameche();

server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false  }
}))
server.addService([MongoService]);
server.addControlleur(UserController);
server.listen(process.env.PORT || 3001);
