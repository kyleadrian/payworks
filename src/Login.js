import React, { Component } from "react";
import { payServerLogin } from "./payServer";

class Login extends Component {
  state = {
    providerMode: "TEST",
    merchantIdentifier: "",
    merchantSecret: ""
  };

  handleModeChange = event => {
    this.setState({ mode: event.target.value });
  };

  handleIdentifierChange = event => {
    this.setState({ merchantIdentifier: event.target.value });
  };
  handleSecretChange = event => {
    this.setState({ merchantSecret: event.target.value });
  };

  handleNewLogin = () => {
    const data = { loginMerchantRequest: this.state };
    payServerLogin(data);
  };

  handleExistingLogin = () => {
    const data = {
      loginMerchantRequest: {
        providerMode: this.state.providerMode,
        merchantIdentifier: localStorage.getItem("merchantIdentifier"),
        merchantSecret: localStorage.getItem("merchantSecret")
      }
    };
    payServerLogin(data);
  };

  useMerchantIdentifier = () => {
    if (localStorage.merchantIdentifier) {
      return localStorage.merchantIdentifier;
    }
  };

  useMerchantSecret = () => {
    if (localStorage.merchantSecret) {
      return localStorage.merchantSecret;
    }
  };

  render() {
    return (
      <div>
        <div className="inline field">
          <div className="ui toggle checkbox">
            <input type="checkbox" tabindex="0" className="hidden" />
            <label>Test/Live</label>
          </div>
        </div>

        <div className="ui form">
          <div className="fields">
            <div className="field">
              <label>Merchant Identifier</label>
              <input
                type="text"
                placeholder="Merchant Identifier"
                onChange={this.handleIdentifierChange}
                value={this.useMerchantIdentifier()}
              />
            </div>
            <div className="field">
              <label>Merchant Secret</label>
              <input
                type="password"
                placeholder="Merchant Secret"
                onChange={this.handleSecretChange}
                value={this.useMerchantSecret()}
              />
            </div>
            <button
              class="ui primary button"
              onClick={
                localStorage.merchantIdentifier
                  ? () => this.handleExistingLogin()
                  : () => this.handleNewLogin()
              }
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
