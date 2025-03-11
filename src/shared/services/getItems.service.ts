export async function getItems() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
    if (!apiKey) {
      console.error("API Key is not available");
      return;
    }
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/products?user_id=eq.12bbc7a2-b737-4e62-8101-2004537d505c&select=*,categories(name)`,
      {
        method: "GET",
        headers: {
          'apikey': apiKey,
          "Content-Type": "application/json",
        },
      }
    );
  
    // Si la respuesta es exitosa, obtengo los datos, si no, se manda un mensaje de error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener items");
    }
  
    const data = await response.json();
  
    return data;
  }
