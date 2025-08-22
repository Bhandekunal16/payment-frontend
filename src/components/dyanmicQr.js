import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

export default function DynamicQr() {
  const [qrData, setQrData] = useState(null);
  const toast = useRef(null);

  const handleGenerate = async () => {
    try {
      const response = await fetch(
        "https://unified-billing-api.vercel.app/auth/generateDynamicQR",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": localStorage.getItem("apiKey"),
          },
        }
      );

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
    <div className="flex justify-content-center p-4">
      <Toast ref={toast} />
      <Card title="Dynamic UPI QR" className="w-6 text-center">
        <Button
          label="Generate Dynamic QR"
          icon="pi pi-qrcode"
          onClick={handleGenerate}
          className="mb-3"
        />

        {qrData && (
          <div className="mt-4">
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
