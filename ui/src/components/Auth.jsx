import React, { useContext } from "react";
import { ConfigContext } from "../context/config.context";
import { Row, Select, TextInput } from "react-materialize";

// apiKey: "AIzaSyCPRlgyIs3368E1RD4jpdWkavydRjhteps",
//     email: "test@test.com",
//     password: "password",
const Auth = () => {
  const { authentication, setAuthentication } = useContext(ConfigContext);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(authentication)}</code>
      </pre>
      <Row>
        <h4>STRATEGY:</h4>
        <Select
          id="auth-choice"
          multiple={false}
          onChange={(e) => {
            setAuthentication({ ...authentication, strategy: e.target.value });
          }}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value={authentication?.strategy || ""}
        >
          <option disabled value="">
            Choose your option
          </option>
          <option value="FIREBASE">FIREBASE</option>
        </Select>
      </Row>

      <Row>
        <h4>PLACEMENT:</h4>
        <Select
          id="placement"
          multiple={false}
          onChange={(e) => {
            setAuthentication({
              ...authentication,
              placement: {
                ...authentication?.placement,
                type: e.target.value,
              },
            });
          }}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value={authentication?.placement?.type || ""}
        >
          <option disabled value="">
            Choose your option
          </option>
          <option value="header">header</option>
          <option value="payload">payload</option>
          <option value="query">query</option>
          <option value="cookie">cookie</option>
        </Select>
      </Row>
      <Row>
        <TextInput
          placeholder="TOKEN"
          value={authentication?.placement?.key || ""}
          onChange={(e) => {
            setAuthentication({
              ...authentication,
              placement: {
                ...authentication?.placement,
                key: e.target.value,
              },
            });
          }}
          id="placement.key"
          label="key"
        />
      </Row>
      <Row>
        <TextInput
          placeholder="APIKEY"
          value={authentication?.apiKey || ""}
          onChange={(e) => {
            setAuthentication({
              ...authentication,
              apiKey: e.target.value,
            });
          }}
          id="apiKey"
          label="API KEY"
        />
      </Row>
      <Row>
        <TextInput
          type="email"
          placeholder="email"
          value={authentication?.email || ""}
          onChange={(e) => {
            setAuthentication({
              ...authentication,
              email: e.target.value,
            });
          }}
          id="email"
          label="EMAIL"
        />
      </Row>
      <Row>
        <TextInput
          type="password"
          placeholder="password"
          value={authentication?.password || ""}
          onChange={(e) => {
            setAuthentication({
              ...authentication,
              password: e.target.value,
            });
          }}
          id="password"
          label="PASSWORD"
        />
      </Row>
    </div>
  );
};

export default Auth;
