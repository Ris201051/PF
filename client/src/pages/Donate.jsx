import React from 'react';

export default function Donate() {
  const donateWithStripe = async () => {
    const res = await fetch('http://localhost:5000/donate/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000 }), // $10
    });
    const data = await res.json();
    window.location = `https://checkout.stripe.com/pay/${data.id}`;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Support Our Mission</h2>
      <button onClick={donateWithStripe}>
        Donate via Stripe ($10)
      </button>
      <div style={{ marginTop: '2rem' }}>
        <div id="paypal-button-container"></div>
      </div>
      <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"></script>
      <script>
        paypal.Buttons().render('#paypal-button-container');
      </script>
    </div>
  );
}
