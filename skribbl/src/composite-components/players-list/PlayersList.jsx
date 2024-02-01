import { Avatar } from "flowbite-react";
import PlayersListContainer from "../players-list-container/PlayersListContainer";
import List from "../../components/list/List";
import { playersInfoReader } from "../../readers";

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
          <div key={playersInfoReader.playerId(playerInfo)} className="m-1">
            <PlayersListContainer
              image={playersInfoReader.profileUrl(playerInfo)}
              name={playersInfoReader.name(playerInfo)}
              gamesPlayed={playersInfoReader.gamesPlayed(playerInfo)}
              points={playersInfoReader.points(playerInfo)}
              coins={playersInfoReader.coins(playerInfo)}
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
