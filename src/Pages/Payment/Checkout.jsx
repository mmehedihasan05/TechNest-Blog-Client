import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();

    console.log("Checkout running");
    const handleCheckout = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // As stripe is not available
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("[error]", error);
            toast.error(error.message);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
        }
    };

    return (
        <div>
            <form onSubmit={handleCheckout} className="space-y-6">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                    border: "1px solid red",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                ></CardElement>
                <button type="submit" className="_btn _btn-readmore " disabled={!stripe}>
                    Make Payment
                </button>
            </form>
        </div>
    );
};

export default Checkout;
