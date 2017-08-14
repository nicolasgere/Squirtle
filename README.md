# Squirtle [![Build Status](https://travis-ci.org/nicolasgere/Squirtle.svg?branch=master)](https://travis-ci.org/nicolasgere/squirtle)[![npm version](https://badge.fury.io/js/squirtle.svg)](https://badge.fury.io/js/squirtle)
A typescript backend framework using the convention over configuration pattern and dependency injection. Inspire by dotnetmvc, angular2 and express.

## Getting Started

That package is currently in development and not ready for PRODUCTION. Feel free to contribute, any issues, pull request or stars are welcome.

### Simple Exemple

```ts
const server = new Squirtle();

server.init({
  controllers: [UserController],
  port: 8080
});

```
And the controller: 

```ts
@Route("api/[controller]")
class UserController extends Controller {
    @HttpGet
    public Get(): User {
        return new User();
    }    
}
```

### How to use it?

This package is only for TS, and need this 3 options in tsconfig.json : 
```js
    "compilerOptions": {
       "target": "es6",
       "emitDecoratorMetadata": true,
       "experimentalDecorators": true
   }
}
```

Once we have everything setup, we can create a server 
```ts
const server = new Squirtle();

server.init({
  controllers: [SimpleController],
  port: 8080
});

``` 
and the controller 
```ts
@Route("api/[controller]")
class VersionController extends Controller {
    @HttpGet
    public Get(): any {
        return {version: '1.0.0'};
    }    
}
``` 

We can hit this handlers using ``` http://localhost:8080/api/version ```
