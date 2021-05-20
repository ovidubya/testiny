import React, { createContext, useState } from "react";

export const ConfigContext = createContext(null);

let authFromLocalStorage = {};
try {
  const jsonParsed = JSON.parse(localStorage.getItem("authentication") || {});
  authFromLocalStorage = jsonParsed;
} catch (e) {
  console.log("no localstorage data for authentication");
}

let testsFromLocalStorage = [];
try {
  const jsonParsed = JSON.parse(localStorage.getItem("tests") || []);
  testsFromLocalStorage = jsonParsed;
} catch (e) {
  console.log("no localstorage data for tests");
}

export const ConfigContextProvider = ({ children }) => {
  const [host, setHost] = useState(localStorage.getItem("host") || "");
  const [isHttps, setIsHttps] = useState(
    localStorage.getItem("isHttps") || "false"
  );
  const [authentication, setAuthentication] = useState(authFromLocalStorage);
  const [tests, setTests] = useState(testsFromLocalStorage);
  // {
  //   name: "COOOL",
  //   authenticated: true,
  //   path: "scorecards",
  //   method: "post",
  //   whitelistHttpCodes: [413, 411],
  //   payloads: {
  //     dayview: ["month", "day", "week"],
  //     metric1: ["Sales - Net Sales"],
  //   },
  // },
  return (
    <ConfigContext.Provider
      value={{
        host,
        setHost,
        isHttps,
        setIsHttps,
        authentication,
        setAuthentication,
        tests,
        setTests,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
