import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import List from "../../components/list/List";
import GamesListContainer from "../games-list-container/GamesListContainer";
import { ALL_GAMES_URI } from "../../constants/routeContants";

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
      <Link className="font-semibold text-pink-600" to={ALL_GAMES_URI}>
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
          renderItem={(item) => (
            <div key={item.id} className="m-3">
              <GamesListContainer
                images={item.images}
                date={item.date}
                time={item.time}
                money={item.money}
                isMoneyGained={item.isMoneyGained}
              />
            </div>
          )}
        />
      </div>
    );
  };
  return (
    <div>
      {renderHeader()}
      {recentGamesList()}
    </div>
  );
}

export default RecentGames;
