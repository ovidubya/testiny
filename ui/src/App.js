import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import { Tab, Tabs } from "react-materialize";
import { ConfigContextProvider } from "./context/config.context";
import Basic from "./components/Basic";
import Auth from "./components/Auth";
import Tests from "./components/Tests";
import FAB from "./components/FAB";

function App() {
  return (
    <ConfigContextProvider>
      <h2>Testiny Generator</h2>
      <Tabs className="tab-demo z-depth-1">
        <Tab
          active
          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false,
          }}
          title="Basic"
        >
          <Basic />
        </Tab>
        <Tab
          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false,
          }}
          title="Authencation"
        >
          <Auth />
        </Tab>
        <Tab
          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false,
          }}
          title="Tests"
        >
          <Tests />
        </Tab>
      </Tabs>
      <FAB />
    </ConfigContextProvider>
  );
}

export default App;
