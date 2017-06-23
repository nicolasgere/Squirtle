import { Injectable } from "./../../../index";


@Injectable
export class SimpleService {

    constructor() {

    }

    public getName() {
      return 'SimpleService'
    }
}
