import "./App.css";
import React from "react";
import Subscribe from "./components/subscribe";
import OtpForm from "./components/validateOtp";
import GenerateQrForm from "./components/staticQr";
import DynamicQr from "./components/dyanmicQr";
import SendBillForm from "./components/billing";
import { Button } from "primereact/button";

function App() {
  const [subscribeFlag, setSubscribeFlag] = React.useState(false);
  const [DynamicQR, setDynamicQR] = React.useState(false);
  const [staticQr, setStaticQr] = React.useState(false);
  const [sendBill, setSendBill] = React.useState(false);

  React.useEffect(() => {
    localStorage.getItem("apiKey") == null
      ? setSubscribeFlag(true)
      : setSubscribeFlag(false);
  }, [subscribeFlag]);

  const onDynamicGen = () => {
    setDynamicQR(true);
    setStaticQr(false);
    setSendBill(false);
  };

  const onStaticGen = () => {
    setStaticQr(true);
    setDynamicQR(false);
    setSendBill(false);
  };

  const onSendBill = () => {
    setStaticQr(false);
    setDynamicQR(false);
    setSendBill(true);
  };

  const close = () => {
    setDynamicQR(false);
    setStaticQr(false);
    setSendBill(false);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>PayX</h1>
      </div>
      {subscribeFlag && (
        <div className="subscribe">
          <Subscribe />
        </div>
      )}
      {subscribeFlag && (
        <div className="subscribe">
          <OtpForm />
        </div>
      )}
      {!subscribeFlag && (
        <div className="buttonDiv">
          <Button label="Generate Dynamic Qr" onClick={onDynamicGen} />
          <Button label="Generate static Qr" onClick={onStaticGen} />
          <Button label="Send Bill" onClick={onSendBill} />
          <Button icon="pi pi-times" onClick={close} severity="warning" />
        </div>
      )}
      {staticQr && <GenerateQrForm />}
      {DynamicQR && <DynamicQr />}
      {sendBill && <SendBillForm />}
    </div>
  );
}

export default App;
