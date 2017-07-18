# Squirtle [![Build Status](https://travis-ci.org/nicolasgere/Squirtle.svg?branch=master)](https://travis-ci.org/nicolasgere/Squirtle)
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
export class UserController extends Controller {
    @HttpGet
    public Get(): User {
        return new User();
    }    
}
```
