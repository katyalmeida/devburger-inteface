/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes } from 'react-router-dom';

import { Home } from '../containers/Home/index.jsx';
import { Login } from '../containers/Login';
import { Register } from '../containers/Register';
import { Menu } from '../containers/Menu';

import { Cart } from '../components/Cart/index.jsx';
import { CompletePayment } from '../containers/CompletePayment/index.jsx';
import { Checkout } from '../containers/Checkout/index.jsx';
import { UserLayout } from '../layouts/UserLayout/index.jsx';
import { AdminLayout } from '../layouts/AdminLayout/index.jsx';
import { Orders } from '../containers/Admin/Orders/index.jsx';
import { NewProducts } from '../containers/Admin/NewProducts/index.jsx';

import { EditProduct } from '../containers/Admin/EditProducts/index.jsx';
import { Products } from '../containers/Admin/Products/index.jsx';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="cardapio" element={<Menu />} />
        <Route path="carrinho" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="complete" element={<CompletePayment />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/pedidos" element={<Orders />} />
        <Route path="/admin/novo-pedido" element={<NewProducts />} />
        <Route path="/admin/editar-produto" element={<EditProduct />} />
        <Route path="/admin/produtos" element={<Products />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
    </Routes>
  );
}

// export const router = createBrowserRouter([
//   {
//     path: '/Login',
//     element: <Login />,
//   },
//   {
//     path: '/cadastro',
//     element: <Register />,
//   },
//   {
//     path: '/',
//     element: (
//       <PrivateRoute>
//         <>
//           <Header />
//         </>

//         <Home />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: '/cardapio',
//     element: <Menu />,
//   },
//   {
//     path: '/carrinho',
//     element: <Cart />,
//   },
//   {
//     path: '/checkout',
//     element: <Checkout />,
//   },
//   {
//     path: '/complete',
//     element: <CompletePayment />,
//   },
// ]);
