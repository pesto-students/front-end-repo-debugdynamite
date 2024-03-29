import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import List from "../../components/list/List";
import GamesListContainer from "../games-list-container/GamesListContainer";
import {
  ALL_GAMES_ROUTE,
  getPastLeaderBoardRoute,
} from "../../constants/routes";

import { userGamesReader } from "../../readers";

function RecentGames({
  header,
  recentGames,
  numberOfGamesToRender = Number.MAX_SAFE_INTEGER,
  shouldRenderSeeAll = true,
}) {
  const gamesToRenderLength = Math.min(
    numberOfGamesToRender,
    recentGames.length
  );

  const gamesToRender = recentGames.slice(0, gamesToRenderLength);

  const renderSeeAll = () => {
    return (
      <Link className="font-semibold text-pink-600" to={ALL_GAMES_ROUTE}>
        See all
        <span className="ml-1">
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
      </Link>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between px-4">
        <p className="font-semibold text-lg text-gray-700">{header}</p>
        {shouldRenderSeeAll ? renderSeeAll() : null}
      </div>
    );
  };

  const recentGamesList = () => {
    return (
      <div className="flex-1 min-h-0">
        <List
          dataSource={gamesToRender}
          renderItem={(game) => (
            <div key={userGamesReader.gameId(game)} className="m-3">
              <Link to={getPastLeaderBoardRoute(userGamesReader.gameId(game))}>
                <GamesListContainer
                  images={userGamesReader.images(game)}
                  date={userGamesReader.date(game)}
                  time={userGamesReader.time(game)}
                  money={userGamesReader.money(game)}
                  isMoneyGained={userGamesReader.isMoneyGained(game)}
                />
              </Link>
            </div>
          )}
        />
      </div>
    );
  };
  return (
    <>
      {renderHeader()}
      {recentGamesList()}
    </>
  );
}

export default RecentGames;
