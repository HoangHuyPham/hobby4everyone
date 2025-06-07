import React from "react";

interface ImageListProps {
  images: string[];
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`img-${idx}`}
          className="w-full h-40 object-cover rounded"
        />
      ))}
    </div>
  );
};

export default ImageList;