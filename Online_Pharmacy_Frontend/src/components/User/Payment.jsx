import React from "react";
import "../../styles/User/Payment.css";
import phonepeLogo from "../../media/phonepe.jpg";
import googlepayLogo from "../../media/googlepay.png";
import rupayLogo from "../../media/RuPay.png";

const Payment = () => {
  const handlePayment = async (method) => {
    try {
      const response = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 130 })
      });

      const data = await response.json();

      const options = {
        key: "YOUR_KEY_ID",
        amount: data.amount,
        currency: "INR",
        name: "Pharmacy Cart",
        description: "Purchase Medicines",
        order_id: data.id,
        handler: function (response) {
          alert("✅ Payment successful! Razorpay ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Shravani",
          email: "shravanix@example.com",
          contact: "9999999999"
        },
        theme: { color: "#3399cc" },
        method: {
          upi: method === "upi",
          card: method === "card"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("❌ Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-heading">Choose Your Payment Method</h2>
      <div className="payment-options">
        <div className="payment-button" onClick={() => handlePayment("upi")}>
          <img src={phonepeLogo} alt="PhonePe" className="payment-logo PhonePe" />
          <span className="payment-label ">PhonePe</span>
        </div>
        <div className="payment-button" onClick={() => handlePayment("upi")}>
          <img src={googlepayLogo} alt="Google Pay" className="payment-logo GooglePay" />
          <span className="payment-label">Google Pay</span>
        </div>
        <div className="payment-button" onClick={() => handlePayment("card")}>
          <img src={rupayLogo} alt="RuPay" className="payment-logo RuPay" />
          <span className="payment-label">RuPay Card</span>
        </div>
      </div>
      <button className="back-button" onClick={() => window.history.back()}>
        ⬅️ Back to Cart
      </button>
    </div>
  );
};

export default Payment;