# Testiny 

> A declarative way to test RESTful API's with a single JS config.

<img src="https://raw.githubusercontent.com/ovidubya/testiny/main/testiny_logo-200x200.png" align="right"
     alt="testiny logo">

Testiny is a API testing tool for any language. It checks a single JS config file and parses to generate tests. Every generate will run and produce either a success or an error. 


![usage](https://raw.githubusercontent.com/ovidubya/testiny/main/demo.gif)

## Usage

```
Options:
  -V, --version       output the version number
  -h, --help          display help for command

Commands:
  generate [options]  Initializes a Testiny JS config file
  run [options]       Run config file
  help [command]      display help for command
```


## JS Testing Schema

- `host` _&lt;string&gt;_ **required** - this is the host name of the api 
- `isHttps` _&lt;boolean&gt;_ *optional* - indicate whether the api domain is https, (default: false)
- `authentication` _&lt;object&gt;_ *optional*
    - `strategy` _&lt;string&gt;_  **required** - oneOf ["FIREBASE"]
    - `placement` _&lt;object&gt;_ **required** where to place the JWT token or cookie
        - `type` _&lt;string&gt;_ **required** oneOf ["header", "payload", "query", "cookie"]
        - `key` _&lt;string&gt;_ **required** the name of the token or cookie to inject the value in
    - `apiKey` _&lt;string&gt;_ **required** api key for the firebase app
    - `email` _&lt;string&gt;_ **required** email of the user to authenticate 
    - `password` _&lt;string&gt;_ **required** password of the user to authenticate 
- `tests` _Array&lt;object&gt;_ *optional* the tests in which will 
    - `name` _&lt;string&gt;_ **required** name of the test, can be anything but should be descriptive
    - `authenticated` _&lt;boolean&gt;_ *optional* whether or not this request should be authenticated (default: false)
    - `path` _&lt;string&gt;_ **required** path of the api route
    - `method` _&lt;string&gt;_ **required** method of the api route to test
    - `skip` _&lt;boolean&gt;_ *optional* skips this test (default: false)
    - `validateResponse` &lt;AxiosResponse=>{}&gt;_ *optional* function to call for each test, it accepts an axios response object and expects an object thrown in format of {message: 'your message', response: response} (default: ()=>{})
    - `payloads` _&lt;object&gt;_ *optional* method of the api route to test
    - `whitelistHttpCodes` Array&lt;number&gt; *optional* a list of status codes that are considered successful. ie if passed [500] then this test will be treated as a successful test
    


## Example file

```js
// schema.js
module.exports = {
  host: "api.todo.com",
  isHttps: true,
  authentication: {
    strategy: "FIREBASE",
    placement: {
      type: "header",
      key: "Token",
    },
    apiKey: "KSzafeFYRfeeIs3368E1RD4jpdWfeafdRjhtfee",
    email: "mrcool@gmail.com",
    password: "myPassword123",
  },
  tests: [
    {
      name: "get all todos",
      authenticated: false,
      path: "todos/all",
      method: "GET"
    },
    {
      name: "add todos",
      authenticated: true,
      path: "todos/add",
      method: "POST",
      payload: {
        todo: ["get milk", "drive car", "shower"]
      }
    },
  ],
};
```

The above json file will be parsed and converted to 4 tests dynamically, it will have the following generated and runned:

```http
GET https://api.todo.com/todos/all
token: <id token value here>
```

```
POST https://api.todo.com/todos/add HTTP/1.1
Content-Type: application/json
Token: <id token value here>

{
    "todo": "get milk"
}
```

```
POST https://api.todo.com/todos/add HTTP/1.1
Content-Type: application/json
Token: <id token value here>

{
    "todo": "drive car"
}
```

```
POST https://api.todo.com/todos/add HTTP/1.1
Content-Type: application/json
Token: <id token value here>

{
    "todo": "shower"
}
```


## Supported authentication

Authentication is a very important thing when testing APIS. There is currently out of box support for Firebase auth. 

### Firebase

```js
{
  strategy: "FIREBASE",
  placement: {
    type: "header",
    key: "Token",
  },
  apiKey: "KSzafeFYRfeeIs3368E1RD4jpdWfeafdRjhtfee",
  email: "mrcool@gmail.com",
  password: "myPassword123",
}
```



Since there is only one supported method of authentication, any PR's would be greatly appreciated 🙏🙏🙏

