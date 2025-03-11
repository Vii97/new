import * as React from "react";
import { ItemBlockProps } from "@/shared/types/Items";

interface ItemBlockComponentProps extends ItemBlockProps {
  onEdit: (item: ItemBlockProps) => void;
}

const ItemBlock: React.FC<ItemBlockComponentProps> = ({ id, user_id, name, price, description, onEdit }) => {
    const handleEdit = () => {
      onEdit({ id, user_id, name, price, description });
    };
  
    return (
      <article className="flex items-center justify-between gap-4 rounded-lg border border-gray-500 bg-gray-900 p-6">
        <div className="flex items-center gap-4">
          <div>
          <p className="text-sm text-sky-300">{name}</p>
            <p className="text-2xl font-medium text-gray-300">{price} €</p>
            <p className="text-sm text-sky-300">{description}</p>
          </div>
        </div>
  
        <div>
          <button
            className="p-2 rounded text-white bg-blue-700 hover:bg-blue-900"
            onClick={handleEdit}
          >
            Editar
          </button>
        </div>
      </article>
    );
  };
export default ItemBlock;