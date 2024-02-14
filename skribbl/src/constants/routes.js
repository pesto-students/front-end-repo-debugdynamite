export const DASHBOARD_ROUTE = "/dashboard";
export const ALL_GAMES_ROUTE = "/all-games";
export const SIGN_IN_ROUTE = "/sign-in";
export const getPastLeaderBoardRoute = (gameId) =>
  `/game/${gameId}/leaderboard-past`;
export const getPresentLeaderBoardRoute = (gameId) =>
  `/game/${gameId}/leaderboard-present`;
export const JOIN_GAME_ROUTE = "/join-game";
export const GAME_DETAILS_ROUTE = "/game-details";
export const GAME_AREA_ROUTE = "/game-area";
export const GAME_LOBBY_ROUTE = "/lobby";
