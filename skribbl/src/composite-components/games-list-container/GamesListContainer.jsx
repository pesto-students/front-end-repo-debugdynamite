import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import AvatarGroup from "../../components/avatar-group/AvatarGroup";
import DateTimeDisplay from "../date-time-display/DateTimeDisplay";
import MoneyInfo from "../money-info/MoneyInfo";

const listItemStyles = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#FBFBFB",
  padding: "10px",
  justifyContent: "space-between",
};

function GamesListContainer({ images, date, time, money, isMoneyGained }) {
  const renderPlayersAndTime = () => {
    return (
      <div style={{ display: "flex" }}>
        <AvatarGroup images={images} styles={{ marginRight: "1.5rem" }} />
        <DateTimeDisplay date={date} time={time} />
      </div>
    );
  };

  const renderMoneyInfoandAngleIcon = () => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <MoneyInfo isPositive={isMoneyGained} money={money} />
        <FontAwesomeIcon
          icon={faAngleRight}
          style={{ fontSize: "1.5em", color: "grey", marginLeft: "1rem" }}
        />
      </div>
    );
  };
  return (
    <div style={listItemStyles}>
      {renderPlayersAndTime()}
      {renderMoneyInfoandAngleIcon()}
    </div>
  );
}

export default GamesListContainer;
