import { Avatar } from "flowbite-react";
import PlayersListContainer from "../players-list-container/PlayersListContainer";
import List from "../../components/list/List";

function PlayersList({ playersInfo }) {
  const renderRankHeader = () => {
    return (
      <div className="flex flex-row-reverse mx-4 my-2">
        <Avatar
          img={process.env.PUBLIC_URL + "/coin.png"}
          size="xs"
          className="mx-4"
        />
        <div className="font-bold mx-6">Pts</div>
      </div>
    );
  };

  const renderRankList = () => {
    return (
      <List
        dataSource={playersInfo}
        renderItem={(playerInfo) => (
          <div key={playerInfo.playerId} className="m-1">
            <PlayersListContainer
              image={playerInfo.profileUrl}
              name={playerInfo.name}
              gamesPlayed={playerInfo.gamesPlayed}
              points={playerInfo.points}
              coins={playerInfo.coins}
            />
          </div>
        )}
      />
    );
  };

  const renderRankings = () => {
    return (
      <div>
        {renderRankHeader()}
        {renderRankList()}
      </div>
    );
  };
  return <div>{renderRankings()}</div>;
}

export default PlayersList;
