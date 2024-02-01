const BASE_URI = "http://localhost:3001/api/";

export const USER_URI = BASE_URI + "user/";
export const getUserGamesURI = (userId) => BASE_URI + `user/${userId}/games`;
export const getLeaderBoardURI = (gameId) =>
  BASE_URI + `game/${gameId}/leaderboard`;
