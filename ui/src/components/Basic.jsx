import React, { useContext } from "react";
import { RadioGroup, Row, TextInput } from "react-materialize";
import { ConfigContext } from "../context/config.context";

const Basic = () => {
  const { host, setHost, isHttps, setIsHttps } = useContext(ConfigContext);
  return (
    <div>
      <pre>
        <code>
          {JSON.stringify({
            host: host,
            isHttps: isHttps,
          })}
        </code>
      </pre>
      <Row>
        <h5>HOST:</h5>
        <TextInput
          placeholder="api.facebook.co"
          value={host}
          onChange={(e) => {
            setHost(e.target.value);
          }}
          id="host"
          label="Host"
        />
      </Row>
      <Row>
        <h5>HTTPS:</h5>
        <RadioGroup
          label="HTTPS"
          name="size"
          onChange={(e) => {
            setIsHttps(e.target.value);
          }}
          value={isHttps}
          options={[
            {
              label: "true",
              value: "true",
            },
            {
              label: "false",
              value: "false",
            },
          ]}
        />
      </Row>
    </div>
  );
};

export default Basic;
