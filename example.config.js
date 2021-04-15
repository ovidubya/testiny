module.exports = {
  host: "jsonplaceholder.typicode.com",
  isHttps: true,
  tests: [
    {
      name: "Todos API",
      path: "todos/1",
      method: "GET",
      validateResponse: (response) => {
        throw {
          response: response,
          message: "just becasue i can",
        };
      },
    },
    {
      name: "Todos API 2",
      path: "todos/1",
      method: "GET",
    },
    {
      name: "Todos API 2",
      path: "todo/1",
      method: "GET",
    },
  ],
};
