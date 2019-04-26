import React, { Component } from "react";
import { executeTransaction } from "./payServer";

class TransactionInfo extends Component {
  state = {
    amount: "",
    currency: "USD",
    autoCapture: "true",
    type: "CHARGE",
    subject: "",
    customIdentifier: "",
    statementDescriptor: ""
  };

  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
  };

  handleSubjectChange = event => {
    this.setState({ subject: event.target.value });
  };

  handleCustomIdentifierChange = event => {
    this.setState({ customIdentifier: event.target.value });
  };
  handleStatementDescriptorChange = event => {
    this.setState({ statementDescriptor: event.target.value });
  };

  handleTransaction = () => {
    const transactionData = {
      executeTransactionRequest: {
        mode: "ONLINE",
        transactionParameters: {
          amount: this.state.amount,
          currency: this.state.currency,
          autoCapture: this.state.autoCapture,
          type: this.state.type,
          subject: this.state.subject,
          customIdentifier: this.state.customIdentifier,
          statementDescriptor: this.state.statementDescriptor,
          applicationFee: null,
          includedTipAmount: null,
          metadata: {
            my: "metadata"
          }
        }
      }
    };

    executeTransaction(transactionData);
  };

  render() {
    return (
      <div className="inline field">
        <div className="ui form">
          <div className="fields">
            <div class="field">
              <label>Currency</label>
              <select class="ui dropdown">
                <option value="">Currency</option>
                <option value="">USD</option>
              </select>
            </div>
            <div className="field">
              <label>Amount</label>
              <input
                type="text"
                placeholder="Amount"
                onChange={this.handleAmountChange}
              />
            </div>
          </div>
        </div>

        <div className="ui form">
          <div className="field">
            <label>Subject</label>
            <input
              type="text"
              placeholder="Subject"
              onChange={this.handleSubjectChange}
            />
          </div>
        </div>

        <div className="ui form">
          <div className="two fields">
            <div className="field">
              <label>Custom Identifier</label>
              <input
                type="text"
                placeholder="Custom Identifier"
                onChange={this.handleCustomIdentifierChange}
              />
            </div>

            <div className="field">
              <label>Statement Descriptor</label>
              <input
                type="text"
                placeholder="Statement Descriptor"
                onChange={this.handleStatementDescriptorChange}
              />
            </div>
          </div>

          <div>
            <button
              class="positive big ui button"
              onClick={this.handleTransaction}
            >
              Checkout!
            </button>
            <button class="negative big ui button">Abort</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionInfo;
