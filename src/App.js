import React from "react";
import Header from "./Header";
import Login from "./Login";
import TransactionInfo from "./TransactionInfo";
import TransactionView from "./TransactionView";
import Devices from "./Devices";

const App = () => {
  return (
    <div className="ui container">
      <Header />
      <div className="ui grid">
        <div className="eight wide column">
          <Login />
          <TransactionInfo />
          <Devices />
        </div>

        <div className="eight wide column">
          <TransactionView />
        </div>
      </div>
    </div>
  );
};

export default App;
