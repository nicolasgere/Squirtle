import { Injectable } from "./../../../index";


@Injectable
export class SimpleService2 {

    constructor() {

    }

    getName():string {
      return 'injection2'
    }
}
