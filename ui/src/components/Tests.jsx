import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Chip,
  Icon,
  Modal,
  Row,
  Select,
  TextInput,
} from "react-materialize";
import { ConfigContext } from "../context/config.context";

const Tests = () => {
  const { tests, setTests, host } = useContext(ConfigContext);
  const [testName, setTestName] = useState("");
  const [isAuth, setIsAuth] = useState("false");
  const [path, setPath] = useState("");
  const [method, setMethod] = useState("GET");
  const [payloads, setPayloads] = useState([]);
  const [whitelistHttpCodes, setWhitelistHttpCodes] = useState([]);

  return (
    <div>
      <Modal
        actions={[
          <Button flat modal="close" node="button" waves="green">
            Close
          </Button>,
          <Button
            onClick={(e) => {
              let test = {
                name: testName,
                authenticated: isAuth === "true" ? true : false,
                path: path,
                method: method,
                whitelistHttpCodes: whitelistHttpCodes.map((num) =>
                  Number(num)
                ),
              };
              const formattedPayloads = payloads.reduce((acc, current) => {
                acc[current.name] = current.value;
                return acc;
              }, {});
              if (
                !(
                  Object.keys(formattedPayloads).length === 0 &&
                  formattedPayloads.constructor === Object
                )
              ) {
                test.payloads = formattedPayloads;
              }
              setTests([...tests, test]);
              setTimeout(() => {
                setTestName("");
                setIsAuth("false");
                setPath("");
                setMethod("GET");
                setPayloads([]);
                setWhitelistHttpCodes([]);
              }, 1000);
            }}
            className="blue"
            modal="close"
            node="button"
            waves="light"
          >
            Add
          </Button>,
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Test specs"
        id="Modal-0"
        open={false}
        options={{
          dismissible: true,
          endingTop: "10%",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%",
        }}
        trigger={<Button node="button">add test</Button>}
      >
        <div>
          <Row>
            <TextInput
              placeholder="get scorecards"
              label="Test Name:"
              value={testName}
              onChange={(e) => {
                setTestName(e.target.value);
              }}
            />
          </Row>
          <Row>
            <h5>auth:</h5>
            <Select
              id="isauth"
              multiple={false}
              onChange={(e) => {
                setIsAuth(e.target.value);
                console.log(e.target.value);
              }}
              value={isAuth}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </Select>
          </Row>
          <Row>
            <TextInput
              placeholder="api/cats"
              label={"route: " + host + "/" + path}
              value={path}
              onChange={(e) => {
                setPath(e.target.value);
              }}
            />
          </Row>
          <Row>
            <Select
              id="method"
              multiple={false}
              onChange={(e) => {
                setMethod(e.target.value);
              }}
              value={method || ""}
            >
              <option value="get">get</option>
              <option value="post">post</option>
              <option value="put">put</option>
              <option value="delete">delete</option>
            </Select>
          </Row>
          <Row>
            <h4>Whitelist HTTP Codes:</h4>
            <Chip
              close={false}
              closeIcon={<Icon className="close">close</Icon>}
              options={{
                placeholder: "HTTP Code",
                data: whitelistHttpCodes.map((el) => {
                  return {
                    tag: el,
                  };
                }),
                onChipDelete: (item, chip) => {
                  setWhitelistHttpCodes(
                    item[0].M_Chips.chipsData.map((el) => el.tag)
                  );
                },
                onChipAdd: (item, chip) => {
                  setWhitelistHttpCodes(
                    item[0].M_Chips.chipsData.map((el) => el.tag)
                  );
                },
              }}
            />
          </Row>
          <Row>
            <h4>Payloads:</h4>
            <button
              onClick={(e) => {
                const copyPayloads = [...payloads];
                copyPayloads.push({
                  name: "",
                  value: [],
                });
                setPayloads(copyPayloads);
              }}
            >
              add
            </button>
            <pre>
              <code>{JSON.stringify(payloads)}</code>
            </pre>
            {payloads.map((el, index) => {
              return (
                <div key={index}>
                  <Row>
                    <div>key: </div>
                    <TextInput
                      type="text"
                      value={payloads[index].name}
                      onChange={(e) => {
                        const copy = [...payloads];
                        copy[index] = {
                          ...copy[index],
                          name: e.target.value,
                        };
                        setPayloads(copy);
                      }}
                    />
                  </Row>
                  <Row>
                    <div>value: </div>
                    <Chip
                      close={false}
                      closeIcon={<Icon className="close">close</Icon>}
                      options={{
                        data: payloads[index].value.map((el) => {
                          return {
                            tag: el,
                          };
                        }),
                        onChipDelete: (item, chip) => {
                          const copy = [...payloads];
                          copy[index] = {
                            ...copy[index],
                            value: item[0].M_Chips.chipsData.map(
                              (el) => el.tag
                            ),
                          };
                          setPayloads(copy);
                        },
                        onChipAdd: (item, chip) => {
                          const copy = [...payloads];
                          copy[index] = {
                            ...copy[index],
                            value: item[0].M_Chips.chipsData.map(
                              (el) => el.tag
                            ),
                          };
                          setPayloads(copy);
                        },
                      }}
                    />
                  </Row>
                  <Row>
                    <Button
                      onClick={(e) => {
                        const copy = [...payloads];
                        copy.splice(index, 1);
                        setPayloads(copy);
                      }}
                      className="red"
                    >
                      delete
                    </Button>
                  </Row>
                </div>
              );
            })}
          </Row>
        </div>
      </Modal>
      {tests.map((test, index) => {
        return (
          <div key={index}>
            <Card
              actions={[
                <Button
                  key={0}
                  className="red"
                  flat
                  modal="close"
                  node="button"
                  waves="green"
                  onClick={(e) => {
                    const copy = [...tests];
                    copy.splice(index, 1);
                    setTests(copy);
                  }}
                >
                  Delete
                </Button>,
                <Button
                  key={1}
                  className="blue"
                  flat
                  modal="close"
                  node="button"
                  waves="light"
                >
                  Copy CURL
                </Button>,
              ]}
              className="blue-grey darken-1"
              closeIcon={<Icon>close</Icon>}
              reveal={
                <pre>
                  <code>{JSON.stringify(test, null, 2)}</code>
                </pre>
              }
              revealIcon={<Icon>more_vert</Icon>}
              textClassName="white-text"
              title={test.name}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tests;
