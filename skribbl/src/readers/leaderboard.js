import _property from "lodash/property";

export const leaderboardReader = {
  gameId: _property("game_id"),
  entryFees: _property("entry_fees"),
  playersInfo: _property("players_info"),
};

export const playersInfoReader = {
  playerId: _property("player_id"),
  name: _property("name"),
  profileUrl: _property("profile_url"),
  gamesPlayed: _property("games_played"),
  points: _property("points"),
  coins: _property("coins"),
  rank: _property("rank"),
};
