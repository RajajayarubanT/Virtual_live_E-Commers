import React from "react";
import logo from "../../img/_addUser.svg";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function App({ TotalAmount }) {
  const history = useHistory();
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // const result = await axios.post("http://localhost:4000/payment/orders");
    const result = await axios({
      method: "Post",
      url: "http://localhost:4000/payment/orders",
      data: { TotalAmount: TotalAmount },
    });
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_9ONeG6cPmReArK", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Suriya Fashion World",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        try {
          const result = await axios
            .post("http://localhost:4000/payment/success", data)
            .then((d) => {
              d.json();
            });
        } catch (e) {
          console.log(e);
        }
        if (result) {
          window.location.reload();
        }

        // alert(order_id);
        // alert(response.msg);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      // prefill: {
      //     name: "Soumya Dey",
      //     email: "SoumyaDey@example.com",
      //     contact: "9999999999",
      // },
      // notes: {
      //     address: "Soumya Dey Corporate Office",
      // },
      // theme: {
      //     color: "#61dafb",
      // },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="paymentOrderBtn_Main">
      <button
        style={{ width: "180px" }}
        class="banner__button"
        onClick={displayRazorpay}
      >
        Place Order
      </button>
    </div>
  );
}

export default App;
