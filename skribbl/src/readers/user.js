import _property from "lodash/property";

export const userReader = {
  userId: _property("user_id"),
  name: _property("name"),
  gamesPlayed: _property("games_played"),
  totalMoneyEarned: _property("total_money_earned"),
  walletBalance: _property("wallet_balance"),
  profilePictureUrl: _property("profile_picture_url"),
};
