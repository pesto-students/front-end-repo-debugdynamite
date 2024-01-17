import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Container from "./components/container";
import Dashboard from "./pages/dashboard";
import GameLobby from "./pages/game-lobby";
import LeaderboardPast from "./pages/leaderboard-past";
import LeaderboardPresent from "./pages/leaderboard-present";
import ProtectedRoute from "./components/protected-route";
import SignIn from "./pages/sign-in";
import UserProfile from "./pages/user-profile";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user/:user_id" element={<Container />}>
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="game/:game_id" element={<Container />}>
            <Route
              path="current-leaderboard"
              element={<LeaderboardPresent />}
            />
            <Route path="past-leaderboard" element={<LeaderboardPast />} />
            <Route path="lobby" element={<GameLobby />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
