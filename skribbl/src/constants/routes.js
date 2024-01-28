export const DASHBOARD_ROUTE = "/dashboard";
export const ALL_GAMES_ROUTE = "/all-games";
export const SIGN_IN_ROUTE = "/sign-in";
export const getPastLeaderBoardRoute = (gameId) =>
  `/game/${gameId}/leaderboard-past`;
