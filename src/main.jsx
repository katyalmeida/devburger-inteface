import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './hooks/UserContext';
import { CartProvider } from './hooks/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import GlobalStyles from './styles/globalStyles';
import stripePromise from './config/stripeConfig';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standard';
import { Router } from './routes';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={standardTheme}>
      <UserProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </Elements>

          <GlobalStyles />
          <ToastContainer autoClose={2000} />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
