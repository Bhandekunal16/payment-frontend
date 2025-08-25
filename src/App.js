import "./App.css";
import React from "react";
import Subscribe from "./components/subscribe";
import OtpForm from "./components/validateOtp";
import GenerateQrForm from "./components/staticQr";
import DynamicQr from "./components/dyanmicQr";
import SendBillForm from "./components/billing";
import { TabMenu } from "primereact/tabmenu";

function App() {
  const [subscribeFlag, setSubscribeFlag] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    localStorage.getItem("apiKey") == null
      ? setSubscribeFlag(true)
      : setSubscribeFlag(false);
  }, [subscribeFlag]);

  const items = [
    { label: "Dynamic", icon: "pi pi-qrcode" },
    { label: "Static", icon: "pi pi-qrcode" },
    { label: "Bill", icon: "pi pi-send" },
  ];

  return (
    <div className="App">
      <div className="header">
        <h1>PayX</h1>
      </div>

      {subscribeFlag && (
        <>
          <Subscribe />
          <OtpForm />
        </>
      )}

      {!subscribeFlag && (
        <>
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
            className="bottom-nav"
          
          />

          {activeIndex === 0 && <DynamicQr />}
          {activeIndex === 1 && <GenerateQrForm />}
          {activeIndex === 2 && <SendBillForm />}
        </>
      )}
    </div>
  );
}

export default App;
