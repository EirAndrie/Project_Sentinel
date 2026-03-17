import React from "react";
import { Route, Routes } from "react-router";
import LoginPage from "./components/pages/LoginPage.jsx";
import DashboardPage from "./components/pages/DashboardPage.jsx";
import CreatorProfilesPage from "./components/pages/CreatorProfilesPage.jsx";
import ViewCreatorProfilePage from "./components/pages/ViewCreatorProfilePage.jsx";
import WebsiteProfilesPage from "./components/pages/WebsiteProfilesPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main-dashboard" element={<DashboardPage />} />
        <Route path="/creator-profiles" element={<CreatorProfilesPage />} />
        <Route
          path="/view-creator-profile/:id"
          element={<ViewCreatorProfilePage />}
        />
        <Route path="/website-profiles" element={<WebsiteProfilesPage />} />
      </Routes>
    </>
  );
};

export default App;
