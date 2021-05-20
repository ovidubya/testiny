import React, { useContext } from "react";
import { ConfigContext } from "../context/config.context";
import { downloadFile } from "../util/downloadFile";

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".fixed-action-btn");
  try {
    // eslint-disable-next-line no-undef
    M.FloatingActionButton.init(elems, { direction: "left" });
  } catch (e) {
    console.log(e);
  }
});
const FAB = () => {
  const { host, isHttps, authentication, tests } = useContext(ConfigContext);
  return (
    <div className="fixed-action-btn">
      <button
        onClick={(e) => {
          localStorage.setItem("host", host);
          localStorage.setItem("isHttps", isHttps);
          localStorage.setItem(
            "authentication",
            JSON.stringify(authentication)
          );
          localStorage.setItem("tests", JSON.stringify(tests));
          if (typeof M !== "undefined") {
            // eslint-disable-next-line no-undef
            M.toast({
              html: "Saved succesfully 👍",
            });
          }
        }}
        className="btn-floating btn-large red"
      >
        <i className="large material-icons">save</i>
      </button>
      <ul>
        <li>
          <button
            onClick={(e) => {
              const fileData = {
                host: localStorage.getItem("host"),
                isHttps: localStorage.getItem("isHttps"),
                authentication: JSON.parse(
                  localStorage.getItem("authentication")
                ),
                tests: JSON.parse(localStorage.getItem("tests")),
              };
              downloadFile(
                "config.js",
                `module.exports = ${JSON.stringify(fileData, null, 2)};`
              );
            }}
            className="btn-floating yellow darken-1"
          >
            <i className="material-icons">download</i>
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              localStorage.clear();
              if (typeof M !== "undefined") {
                // eslint-disable-next-line no-undef
                M.toast({
                  html: "Local storage deleted",
                });
              }
            }}
            className="btn-floating green"
          >
            <i className="material-icons">delete</i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FAB;
