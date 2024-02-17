import _property from "lodash/property";

export const userGamesReader = {
  gameId: _property("game_id"),
  date: _property("date"),
  time: _property("time"),
  money: _property("money"),
  isMoneyGained: _property("is_money_gained"),
  images: _property("images"),
};
