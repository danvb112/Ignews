import styles from './styles.module.scss';
import {useSession, signIn} from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

interface SubscribeButtonProps {
    productId: string;
}

export function SubscribeButton({productId}: SubscribeButtonProps) {
    const {data}= useSession();

    const handleSubscribe = async () => {
        if(!data) {
            signIn('github');
            return;
        }

        try {
            const response = await api.post('/subscribe');
            
            const {sessionId} = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({sessionId})
        } catch (error) {
            alert(error);
        }

    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}