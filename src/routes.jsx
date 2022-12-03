import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Questionario from "./pages/questionario";
import Portfolio from "./pages/portfolio";
import StatusPage from "./pages/status";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/questionario" element={<Questionario />} />
        <Route path="/status/:id" element={<StatusPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
