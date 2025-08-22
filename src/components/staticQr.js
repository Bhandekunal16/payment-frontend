import React, { useState, useRef } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import "../style/validateOtp.css";

export default function GenerateQrForm() {
  const [amount, setAmount] = useState(null);
  const [qrData, setQrData] = useState(null);
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/generateQr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": localStorage.getItem("apiKey"),
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      console.log("✅ Success:", result);

      if (result.status) {
        setQrData(result.data);
        toast.current.show({
          severity: "success",
          summary: "QR Generated",
          detail: result.msg,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Failed",
          detail: result.msg,
          life: 3000,
        });
      }
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
    <div
      className="flex justify-content-center p-4"
      style={{ marginTop: "1px" }}
    >
      <Toast ref={toast} />
      <Card title="Generate UPI QR" className="w-6">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field mb-3">
            <label htmlFor="amount">Amount (INR)</label>
            <InputNumber
              id="amount"
              value={amount}
              onValueChange={(e) => setAmount(e.value)}
              mode="currency"
              currency="INR"
              locale="en-IN"
              required
              className="w-full"
            />
          </div>

          <Button
            label="Generate QR"
            icon="pi pi-qrcode"
            type="submit"
            className="validateButton"
          />
        </form>

        {qrData && (
          <div className="mt-4 text-center">
            <h3>Scan to Pay</h3>
            <img src={qrData.qr} alt="UPI QR" style={{ width: "250px" }} />
            <p className="mt-2">
              <a href={qrData.upiUrl} target="_blank" rel="noopener noreferrer">
                {qrData.upiUrl}
              </a>
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
