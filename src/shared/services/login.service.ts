import { AuthSchema } from "../schemas/auth.schema";

export async function loginService(credentials: AuthSchema) {

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
    if (!apiKey) {
      console.error("API Key is not available");
      return;
    }
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/signup`,
    {
      method: "POST",
      headers: {
        'apikey': apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  // Si la respuesta es exitosa, obtengo los datos, si no, se manda un mensaje de error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar usuario");
  }

  const data = await response.json();

  if (!data.token) {
    throw new Error("No se recibió un token");
  }
  return data;
}