import { Form } from "../schemas/form.schema";

export async function updateItem(item: Form, id: string) {

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
    if (!apiKey) {
      console.error("API Key is not available");
      return;
    }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/products?id=eq.${id}`,
    {
      method: "PUT",
      headers: {
        'apikey': apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }
  );
  // Si la respuesta es exitosa, obtengo los datos, si no, se manda un mensaje de error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar item");
  }

  const data = await response.json();

  return data;
}