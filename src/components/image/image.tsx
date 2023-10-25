interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = "20px",
  height = "48px",
}) => {
  return <img src={src} alt={alt} width={width} height={height} />;
};

export default Image;
