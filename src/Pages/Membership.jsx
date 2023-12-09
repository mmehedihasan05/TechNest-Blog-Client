import SectionTitle from "../Components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Payment/Checkout";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Membership = () => {
    return (
        <div className="custom-width">
            <div>
                <SectionTitle data={{ title: "Make Payment", noBorder: true }}></SectionTitle>
            </div>
            <Elements stripe={stripePromise}>
                <Checkout></Checkout>
            </Elements>
        </div>
    );
};

export default Membership;
