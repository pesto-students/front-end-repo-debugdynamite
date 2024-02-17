import { Avatar } from "flowbite-react";

function AvatarLabel({
  image,
  primaryLabel,
  secondaryLabel = null,
  avatarSize = "md",
  primaryLabelSize = "text-lg",
  secondaryLabelSize = "text-sm",
  isImgRounded = false,
}) {
  return (
    <Avatar size={avatarSize} rounded={isImgRounded} img={image}>
      <div className="font-medium dark:text-white">
        <div className={`${primaryLabelSize}`}>{primaryLabel}</div>
        {secondaryLabel ? (
          <div
            className={`${secondaryLabelSize} text-gray-500 dark:text-gray-400`}
          >
            {secondaryLabel}
          </div>
        ) : null}
      </div>
    </Avatar>
  );
}

export default AvatarLabel;
