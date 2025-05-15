import { Demandeur } from "@prisma/client";

const getDemandeur = async (id: string) => {
  const url = `/api/demandeur/${id}`;
  const fetching = await fetch(url.split(",").join(""), {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Demandeur;
};

const createDemandeur = async (demandeur: Omit<Demandeur, "id">) => {
  const url = "/api/demandeur";
  const fetching = await fetch(url, {
    body: JSON.stringify(demandeur),
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Demandeur;
};

const deleteDemandeur = async (id: number) => {
  const fetching = fetch(`/api/demandeur/${id}`, {
    body: JSON.stringify(id),
    method: "DELETE",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching;
};

const updateDemandeur = async (demandeur: Demandeur) => {
  console.log("Updating demandeur, data being sent:", demandeur);
  
  // Ensure we have a valid demandeur object with at least an ID
  if (!demandeur || !demandeur.id) {
    console.error("Cannot update demandeur: missing ID");
    throw new Error("Cannot update demandeur: missing ID");
  }
  
  try {
    // With consolidated database, we can directly pass the object to the API
    // The API now accepts both string and object formats
    const response = await fetch(`/api/demandeur`, {
      body: JSON.stringify(demandeur),
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      // Try to get more detailed error information
      let errorDetails;
      try {
        errorDetails = await response.json();
      } catch (e) {
        errorDetails = await response.text();
      }
      
      console.error(`Error updating demandeur (${response.status}):`, errorDetails);
      throw new Error(`Update failed: ${response.status} - ${JSON.stringify(errorDetails)}`);
    }
    
    const result = await response.json();
    console.log("Demandeur update successful:", result);
    return result as Demandeur;
  } catch (error) {
    console.error("Exception during demandeur update:", error);
    throw error;
  }
};

export { getDemandeur, createDemandeur, updateDemandeur, deleteDemandeur };
