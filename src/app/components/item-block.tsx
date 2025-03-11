import * as React from "react";
import { ItemBlockProps } from "@/shared/types/Items";

interface ExpenseBlockComponentProps extends ItemBlockProps {
    onDelete: (id: ItemBlockProps["name"]) => void;
    onEdit: (expense: ItemBlockProps) => void;
  }
  const ExpenseBlock: React.FC<ExpenseBlockComponentProps> = ({ user_id, name, description, onEdit }) => {
  
    const handleEdit = () => {
      onEdit({ user_id, name, price, description });
    };
  
    return (
      <article
        className={`flex items-center justify-between gap-4 rounded-lg border ${
          type === "income" ? "border-indigo-500" : "border-fuchsia-500"
        } bg-gray-900 p-6`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`rounded-full p-3 ${
              type === "income" ? "bg-indigo-200" : "bg-fuchsia-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`size-8 ${
                type === "income" ? "text-indigo-500" : "text-fuchsia-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>
  
          <div>
            <p
              className={`text-2xl font-medium ${
                type === "income" ? "text-indigo-500" : "text-fuchsia-500"
              }`}
            >
              {amount}
            </p>
            <p className="text-sm text-sky-300">
              {type === "income" ? "Ingreso" : "Gasto"}: {description}
            </p>
          </div>
        </div>
  
        <div>
          <Dropdown className="bg-purple-800 text-white">
            <DropdownTrigger>
              <button className="p-2 rounded text-white bg-purple-700 hover:bg-purple-900">
                Opciones
              </button>
            </DropdownTrigger>
            <DropdownMenu variant="bordered" color="primary">
              <DropdownItem key="edit" onPress={handleEdit}>
                Editar
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={onDeleteExpense}
              >
                Eliminar
        </div>
      </article>
    );
  };
  
  export default ExpenseBlock;