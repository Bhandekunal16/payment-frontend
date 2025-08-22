import "./App.css";
import React from "react";
import Subscribe from "./components/subscribe";
import OtpForm from "./components/validateOtp";
import GenerateQrForm from "./components/staticQr";
import DynamicQr from "./components/dyanmicQr";
import SendBillForm from "./components/billing";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
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
          <Button
            label="Generate Dynamic Qr "
            icon="pi pi-check"
            onClick={onDynamicGen}
          />
          <Button
            label="Generate static Qr "
            icon="pi pi-check"
            onClick={onStaticGen}
          />
          <Button label="Send Bill" icon="pi pi-check" onClick={onSendBill} />

          <Button icon="pi pi-times" onClick={close} />
        </div>
      )}
      {staticQr && <GenerateQrForm />}
      {DynamicQR && <DynamicQr />}
      {sendBill && <SendBillForm />}
    </div>
  );
}

export default App;
