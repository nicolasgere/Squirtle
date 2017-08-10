

export interface Configuration {
    /** the port listening by the server, by default 4000*/
    port?: number;
    /**a list of controllers*/
    controllers: Array<any>,
    /**a list of services*/    
    services?: Array<any>,
    /**a list of middlewares*/        
    middlewares?:Array<any>
}