import "./Donate.css";
import { useState } from "react";
import api from "../../api/axios";

export default function Donate() {
    const [amount, setAmount] = useState(100);
const [loading, setLoading] = useState(false);

const handleDonate = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const { data } = await api.post(
      "/payment/create-order",
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const options = {
      key: data.key,

      amount: data.order.amount,

      currency: "INR",

      name: "FixMyArea",

      description: "Support Civic Change",

      order_id: data.order.id,

      handler: async function (response) {
        try {
          const verify = await api.post(
            "/payment/verify",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verify.data.success) {
            alert("🎉 Thank you for supporting FixMyArea!");
          }
        } catch (err) {
          console.log(err);
          alert("Payment verification failed");
        }
      },

      theme: {
        color: "#C8FF1A",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  
   


  return (
    <div className="donate-page">

      <div className="donate-card">

        <span className="donate-badge">
           Support FixMyArea
        </span>

        <h1>
          Help us build
          <span> better cities.</span>
        </h1>

        <p>
          Every contribution helps us improve
          FixMyArea, maintain servers,
          build new features and keep the
          platform free for everyone.
        </p>

        <div className="amount-grid">

          <button onClick={() => setAmount(100)}>₹100</button>
          <button onClick={() => setAmount(250)}>₹250</button>
          <button onClick={() => setAmount(500)}>₹500</button>
          <button onClick={() => setAmount(1000)}>₹1000</button>

        </div>

        <div className="custom-amount">

          <label>Custom Amount</label>

         <input
  type="number"
  value={amount}
  onChange={(e) => setAmount(Number(e.target.value))}
/>
        

        </div>

       <button
  className="donate-btn"
  onClick={handleDonate}
  disabled={loading}
>
            {loading ? "Processing..." : `Donate ₹${amount}`}
</button>

        <p className="secure-text">
        Secure payments powered by Razorpay
        </p>

      </div>

    </div>
  );
}