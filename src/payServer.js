const uuidv4 = require("uuid/v4");
const secretKey = "xxxxxxxxxxxxxxxxx";

let devices = [];

export const payServerLogin = data => {
  try {
    const loginData = {
      tag: uuidv4(),
      type: "LOGIN_MERCHANT_REQUEST",
      ...data
    };

    const websocket = new WebSocket("ws://localhost:8080");

    websocket.onopen = event => {
      websocket.send(JSON.stringify(loginData));
    };

    websocket.onmessage = event => {
      const response = JSON.parse(event.data);
      console.log(response);
      devices = response.loginMerchantResponse.devices;

      if (response.status === "OK") {
        localStorage.setItem(
          "merchantIdentifier",
          loginData.loginMerchantRequest.merchantIdentifier
        );
        localStorage.setItem(
          "merchantSecret",
          loginData.loginMerchantRequest.merchantSecret
        );
      }
    };
  } catch (err) {
    alert(err);
  }
};

export const executeTransaction = data => {
  try {
    const transactionData = {
      tag: uuidv4(),
      type: "EXECUTE_TRANSACTION_REQUEST",
      resource: devices[0].resource,
      ...data
    };

    const websocket = new WebSocket("ws://localhost:8080");

    websocket.onopen = () => {
      websocket.send(JSON.stringify(transactionData));
    };

    websocket.onmessage = event => {
      const response = JSON.parse(event.data);

      if (response.status === "ERROR") {
        return console.log(response.error);
      }
    };
  } catch (err) {
    console.log(err);
  }
};
