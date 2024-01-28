const BASE_URL = "http://localhost:3001/api/";

export const SAVE_USER_URI = BASE_URL + "user/save";
export const getUserGamesURI = (userId) => BASE_URL + `user/${userId}/games`;
export const getLeaderBoardURI = (gameId) =>
  BASE_URL + `game/${gameId}/leaderboard`;
