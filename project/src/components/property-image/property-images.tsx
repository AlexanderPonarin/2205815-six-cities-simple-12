type PropertyImagesProps = {
    image: string;
}

function PropertyImages({image}: PropertyImagesProps): JSX.Element {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={image} alt="Photo studio" />
    </div>
  );
}
export default PropertyImages;

