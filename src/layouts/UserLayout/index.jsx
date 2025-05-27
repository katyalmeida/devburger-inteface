import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
