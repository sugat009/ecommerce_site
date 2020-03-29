import React from 'react';
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_bk3zlc6T3aftq9hH7DkowMB600a9TUYujn";

    const onToken = token => {
        alert("Payment Successful");
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="ecommerce-site"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
