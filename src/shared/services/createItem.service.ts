import { Form } from "../schemas/form.schema";

export async function createItemService(item: Form) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }
  );
  // Si la respuesta es exitosa, obtengo los datos, si no, se manda un mensaje de error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear item");
  }

  const data = await response.json();

  return data;
}