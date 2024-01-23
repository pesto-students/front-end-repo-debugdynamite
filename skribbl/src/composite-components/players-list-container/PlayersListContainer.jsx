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
  gamesPlayed,
  points = 0,
  coins = 0,
}) {
  const renderPlayerInfo = () => {
    return (
      <div style={{ display: "flex" }}>
        <AvatarLabel
          image={image}
          primaryLabel={name}
          secondaryLabel={`Games Played: ${gamesPlayed}`}
          isImgRounded={true}
        />
      </div>
    );
  };

  const renderScore = () => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="font-bold m-4 text-xl">{points}</div>
        <div className="font-bold m-4 text-yellow-400 text-xl">{coins}</div>
      </div>
    );
  };

  return (
    <div style={containerStyles}>
      {renderPlayerInfo()}
      {renderScore()}
    </div>
  );
}

export default PlayersListContainer;
