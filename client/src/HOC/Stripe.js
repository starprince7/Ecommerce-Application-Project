import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Hr8foLLQ44ySXdyqnUBmLKVFNUJWfbLuvy1oUbxSScBijuIRP4jdbnFOxH2qy2TM4SITvIxanS0vJLPyjfLGM1Z00M1p4pRPE"
);

function Stripe({ children }) {
  return (
    <div>
      <Elements stripe={stripePromise}>{children}</Elements>
    </div>
  );
}

export default Stripe
