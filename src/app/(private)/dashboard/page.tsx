'use client'

// Importaciones
import { ItemBlockProps } from "@/shared/types/Items";
import { useEffect, useState } from "react";
import { getItems } from "@/shared/services/getItems.service";
import { updateItem } from "@/shared/services/updateItem.service";
import ItemBlock from "@/app/components/item-block";

// Definición del componente Dashboard (página principal)
export default function Dashboard() {
  // Declaración de constantes usando UseState para manejar sus estados
  const [items, setItems] = useState<ItemBlockProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ItemBlockProps | null>(null);

  // Hook de efecto para obtener los elementos
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const resultData = await getItems();
        setItems(resultData);
      } catch (error) {
        console.error("Error al obtener elementos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Función para actualizar un elemento
  const handleUpdateItem = async (updatedItem: ItemBlockProps) => {
    try {
      // Convertimos el id a string, si es necesario
      await updateItem(updatedItem, String(updatedItem.id)); // Convierte el id a string
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      setEditingItem(null);
    } catch (error) {
      console.error("Error al actualizar el elemento:", error);
    }
  };

  // Función para manejar la edición de un elemento
  const handleEditClick = (item: ItemBlockProps) => {
    setEditingItem(item);
  };

  // Devuelvo elementos y estadísticas
  return (
    <div className="bg-white w-full max-w-md mx-auto rounded-lg p-5 px-6">
      {loading ? (
        <p className="text-center text-sky-700 mt-6">Cargando...</p>
      ) : (
        <>
          {editingItem ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateItem(editingItem);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-black">
                  Precio
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={String(editingItem.price)}  
                    onChange={(e) =>
                        setEditingItem({
                        ...editingItem,
                        price: Number(e.target.value),  
                        })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-black">
                  Descripción
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4 py-8">
              {items.length > 0 ? (
                items.map((item) => (
                  <ItemBlock key={item.id} {...item} onEdit={handleEditClick} />
                ))
              ) : (
                <p className="text-center text-sky-700">No hay elementos.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
