import React from "react";
import { Route, Routes } from "react-router";
import DashboardPage from "./components/pages/DashboardPage.jsx";
import CreatorProfiles from "./components/pages/CreatorProfiles.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/main-dashboard" element={<DashboardPage />} />
        <Route path="/creator-profiles" element={<CreatorProfiles />} />
      </Routes>
    </>
  );
};

export default App;
