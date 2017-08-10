import { Injectable } from "./../../../index";
import { SimpleService2 } from "./simpleService0";


@Injectable
export class SimpleService {

    constructor(private simpleService2:SimpleService2) {

    }

    getName():string {
      return 'injection1'
    }
    getName2():string {
      return this.simpleService2.getName();
    }
}
