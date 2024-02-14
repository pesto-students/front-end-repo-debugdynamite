import AvatarLabel from "../../components/avatar-label/AvatarLabel";

const containerStyles = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#FBFBFB",
  padding: "10px",
  justifyContent: "space-between",
};

function PlayersListContainer({
  image,
  name,
  gamesPlayed = 0,
  points = null,
  coins = null,
}) {
  const renderPlayerInfo = () => {
    return (
      <div style={{ display: "flex" }}>
        <AvatarLabel
          image={image}
          primaryLabel={name}
          secondaryLabel={
            gamesPlayed !== 0 ? `Games Played: ${gamesPlayed}` : null
          }
          isImgRounded={true}
        />
      </div>
    );
  };

  const renderScore = () => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="font-bold text-xl">{points}</div>
        <div className="font-bold mr-4 ml-7 text-yellow-400 text-xl">
          {coins}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyles}>
      {renderPlayerInfo()}
      {points != null && renderScore()}
    </div>
  );
}

export default PlayersListContainer;
