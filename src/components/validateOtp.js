import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import "../style/validateOtp.css";

export default function OtpForm() {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const toast = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://unified-billing-api.vercel.app/auth/userDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      console.log("✅ Success:", result);

      if (result?.status) {
        localStorage.setItem("apiKey", result.data.value.key);
        toast.current.show({
          severity: "success",
          summary: "Verified",
          life: 3000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 10000);
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Failed",
          life: 3000,
        });
      }

      setFormData({ email: "", otp: "" });
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
      <Card title="OTP Verification" className="w-6">
        <form onSubmit={handleSubmit} className="p-fluid">
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

          <div className="field mb-3">
            <label htmlFor="otp">OTP</label>
            <InputText
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              keyfilter="int"
              maxLength={6}
              required
            />
          </div>

          <Button
            label="Verify OTP"
            icon="pi pi-check"
            type="submit"
            className="validateButton"
          />
        </form>
      </Card>
    </div>
  );
}
