import {loadStripe} from '@stripe/stripe-js';

export async function getStripeJs() {
    // Levar para arquivo de variáveis de ambiente NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    const stripeJs = await loadStripe('pk_test_51KveO9HYWLZ2H8OUQMmsKx7Zi9BF4TPHYMOulHTjCOcI84Y5bQ7Z8rsp3YJnMDSiOaySmHN9yktmN8DdS9ORvqrD00e5xNho2z')

    return stripeJs;
}