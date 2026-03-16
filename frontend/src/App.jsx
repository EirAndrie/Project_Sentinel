import React from "react";
import { Route, Routes } from "react-router";
import DashboardPage from "./components/pages/DashboardPage.jsx";
import CreatorProfilesPage from "./components/pages/CreatorProfilesPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/main-dashboard" element={<DashboardPage />} />
        <Route path="/creator-profiles" element={<CreatorProfilesPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
