import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AllGames from "./pages/all-games/AllGames";
import Container from "./components/container";
import Dashboard from "./pages/dashboard";
import GameLobby from "./pages/game-lobby";
import LeaderboardPast from "./pages/leaderboard-past";
import LeaderboardPresent from "./pages/leaderboard-present";
import ProtectedRoute from "./components/protected-route";
import SignIn from "./pages/sign-in";
import UserProfile from "./pages/user-profile";
import JoinGame from "./pages/join-game";
import GameDetails from "./pages/game-details/GameDetails";
import GameArea from "./pages/game-area/GameArea";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-games" element={<AllGames />} />
          <Route path="join-game" element={<JoinGame />} />
          <Route path="user/:userId" element={<Container />}>
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="lobby" element={<GameLobby />} />
          <Route path="game-details" element={<GameDetails />} />
          <Route path="game-area" element={<GameArea />} />
          <Route path="game/:gameId" element={<Container />}>
            <Route
              path="leaderboard-present"
              element={<LeaderboardPresent />}
            />
            <Route path="leaderboard-past" element={<LeaderboardPast />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
