import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51QPCcjKPNS37iVuUkIAwwwGCqUAsr5K7zRhrMiB3XTLlKaE9EEn3YVfzbT0SytPUbFNxhnK9H5zUgaBVd0xpHXHE00Zt9ZG3Zu',
);
export default stripePromise;
