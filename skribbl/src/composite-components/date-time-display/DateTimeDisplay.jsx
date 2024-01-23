import React from "react";
import AvatarLabel from "../../components/avatar-label/AvatarLabel";

function DateTimeDisplay({ date, time }) {
  const renderTime = () => {
    return (
      <AvatarLabel
        image={process.env.PUBLIC_URL + "/clock.png"}
        primaryLabel={time}
        avatarSize="xs"
        fontSize="font-small"
        primaryLabelSize="text-sm"
      />
    );
  };

  const renderDate = () => {
    return (
      <AvatarLabel
        image={process.env.PUBLIC_URL + "/calendar.png"}
        primaryLabel={date}
        avatarSize="xs"
        fontSize="font-small"
        primaryLabelSize="text-sm"
      />
    );
  };
  return (
    <div>
      {renderTime()}
      {renderDate()}
    </div>
  );
}

export default DateTimeDisplay;
