import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";

import "../style/subscribe.css";

const Subscribe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vpa: "",
  });
  const [message, setMessage] = React.useState([]);
  const [messageFlag, setMessageFlag] = React.useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status) {
        localStorage.setItem("apiKey", result.data.apiKey);
        setMessageFlag(true);
        setMessage([result.data.res]);
        window.location.reload()
      } else {
        const r2 = await fetch("http://localhost:3000/auth/send/otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        });
        const result2 = await r2.json();

        console.log(result.data, result2.data);

        if (result2?.data) {
          setMessageFlag(true);
          console.log([result.data.msg, result2.data.msg]);
          setMessage([result.data.msg, result2.data.msg]);
        }
      }

      setTimeout(() => {
        setMessageFlag(false);
      }, 10000);

      setFormData({ name: "", email: "", phone: "", vpa: "" });
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="flex justify-content-center p-4 align-item-center">
      {messageFlag && (
        <div className="card flex justify-content-center">
          {message.map((msg, idx) => (
            <Message key={idx} text={msg} severity="info" />
          ))}
        </div>
      )}
      <Card title="Start your journey with us" className="w-6">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field mb-2">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field mb-2">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field mb-2">
            <label htmlFor="phone">Phone</label>
            <InputText
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              keyfilter="int"
              maxLength={10}
              required
            />
          </div>

          <div className="field mb-2">
            <label htmlFor="vpa">VPA</label>
            <InputText
              id="vpa"
              name="vpa"
              value={formData.vpa}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            label="Submit"
            icon="pi pi-check"
            type="submit"
            className="subscribeButton"
          />
        </form>
      </Card>
    </div>
  );
};

export default Subscribe;
