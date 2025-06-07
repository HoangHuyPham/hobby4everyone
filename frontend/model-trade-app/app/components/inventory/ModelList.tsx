import React from "react";
import ImageList from "./ImageList";

interface Model {
    modelId: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    see: boolean;
    isDelete: boolean;
    images: Array<string>
}

interface ModelListProps {
    models: Array<Model>
}

const ModelList: React.FC<ModelListProps> = ({ models }) => {
  return (
    <div className="flex flex-col gap-4">
      {models.map((model) => {
        const borderColor = model.see ? "border-red-500" : "border-yellow-500";
        const bgColor = model.isDelete ? "bg-gray-200" : "bg-white";

        return (
          <div
            key={model.modelId}
            className={`border-2 ${borderColor} rounded-xl p-4 shadow ${bgColor} relative`}
          >
            <h3 className="text-lg font-bold">
              {model.modelId} - {model.name} -{" "}
              {model.price.toLocaleString()} đ
            </h3>
            <p className="text-gray-700 mt-2">{model.description}</p>

            <ImageList images={model.images} />

            <div className="absolute bottom-2 right-4 text-sm text-gray-600 font-semibold">
              Số: {model.quantity}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ModelList;

