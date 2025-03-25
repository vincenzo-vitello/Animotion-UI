import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./store/src/components/Layout";

// Lazy load pages
const Home = React.lazy(() => import("./store/src/pages/Home/Home"));
// const Components = React.lazy(() => import("@store/pages/Components"));
// const Cart = React.lazy(() => import("@store/pages/Cart"));

const App: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Caricamento...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/components" element={<Components />} />
          <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
