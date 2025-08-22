import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

export default function SendBillForm() {
  const [formData, setFormData] = useState({
    amount: null,
    name: "",
    email: "",
  });
  const toast = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { amount, name, email } = formData;
    if (!amount || !name || !email) {
      toast.current.show({
        severity: "warn",
        summary: "Missing Data",
        detail: "Please fill all fields",
        life: 3000,
      });
      return;
    }

    try {
      const url = `https://unified-billing-api.vercel.app/auth/send/bill/${amount}/${encodeURIComponent(
        name
      )}/${encodeURIComponent(email)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": localStorage.getItem("apiKey"),
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      console.log("✅ Success:", result);

      if (result.status) {
        toast.current.show({
          severity: "success",
          summary: "Bill Sent",
          detail: result.msg || "Bill has been sent successfully",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Failed",
          detail: result.msg || "Unable to send bill",
          life: 3000,
        });
      }

      setFormData({
        amount: null,
        name: "",
        email: "",
      });
    } catch (error) {
      console.error("❌ Error:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    }
  };

  return (
    <div className="flex justify-content-center p-4">
      <Toast ref={toast} />
      <Card title="Send Bill" className="w-6">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field mb-3">
            <label htmlFor="amount">Amount (INR)</label>
            <InputNumber
              id="amount"
              name="amount"
              value={formData.amount}
              onValueChange={(e) =>
                setFormData({ ...formData, amount: e.value })
              }
              mode="currency"
              currency="INR"
              locale="en-IN"
              required
              className="w-full"
            />
          </div>

          <div className="field mb-3">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field mb-3">
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

          <Button label="Send Bill" icon="pi pi-send" type="submit" />
        </form>
      </Card>
    </div>
  );
}
