import type { Remuneration } from "../types";

const getRemunerationsByEnfantsIds = async (externalIds: (string | null)[]) => {
  // Filter out null or undefined values
  const validExternalIds = externalIds.filter(id => id !== null && id !== undefined) as string[];
  
  if (validExternalIds.length === 0) {
    return [];
  }
  
  try {
    const queryParams = validExternalIds.map((id, index) => 
      `${index !== 0 ? "&" : ""}externalId=${id}`
    ).join("");
    
    const url = `/api/sync/out/remunerations${validExternalIds.length > 0 ? "?" : ""}${queryParams}`;
    
    const response = await fetch(url, {
      method: "GET",
    });
    
    if (!response.ok) {
      console.error(`Error fetching remunerations: ${response.status}`);
      throw Error(`got status ${response.status}`);
    }
    
    const data = await response.json();
    return data as Remuneration[];
  } catch (error) {
    console.error("Failed to fetch remunerations:", error);
    // Return empty array instead of throwing
    return [];
  }
};

export { getRemunerationsByEnfantsIds };
