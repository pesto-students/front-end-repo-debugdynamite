import { Avatar } from "flowbite-react";

function AvatarGroup({ images, displayImagesMaxLength = 3, styles = {} }) {
  let totalImages = images.length;
  let extraImages = Math.max(totalImages - displayImagesMaxLength, 0);
  let displayImages = images.slice(
    0,
    Math.min(displayImagesMaxLength, totalImages)
  );

  return (
    <div style={styles}>
      <Avatar.Group>
        {displayImages.map((image) => (
          <Avatar img={image} alt="" rounded stacked />
        ))}
        {extraImages > 0 ? <Avatar.Counter total={extraImages} /> : null}
      </Avatar.Group>
    </div>
  );
}

export default AvatarGroup;
