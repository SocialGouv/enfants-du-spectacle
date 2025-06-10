import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "GET") {
    await getRemunerationsByEnfantsIds(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getRemunerationsByEnfantsIds: NextApiHandler = async (req, res) => {
  const enfantIds = req.query.externalId as string[];

  // Check if we have valid environment variables
  if (!process.env.API_URL_SDP || !process.env.API_KEY_SDP) {
    console.error("Missing required environment variables: API_URL_SDP or API_KEY_SDP");
    return res.status(500).json({ 
      error: "Server configuration error - missing environment variables",
      message: "Contact administrator - API configuration is incomplete" 
    });
  }

  // Filter out invalid IDs
  const validEnfantIds = Array.isArray(enfantIds) 
    ? enfantIds.filter(id => id !== null && id !== undefined && id !== '') 
    : enfantIds;

  if (!validEnfantIds || (Array.isArray(validEnfantIds) && validEnfantIds.length === 0)) {
    return res.status(200).json([]); // Return empty array instead of error
  }

  const queryParams = Array.isArray(validEnfantIds)
    ? validEnfantIds
        .map((id, index) => `${index !== 0 ? "&" : ""}externalId=${id}`)
        .join("")
    : `externalId=${validEnfantIds}`;

  const url = `${process.env.API_URL_SDP}/inc/remunerations${
    queryParams ? "?" : ""
  }${queryParams}&token=${process.env.API_KEY_SDP}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      // Add a reasonable timeout
      signal: AbortSignal.timeout(10000) // 10 seconds timeout
    });
    
    if (!response.ok) {
      const responseText = await response.text();
      console.error("Error response from remunerations API:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
      
      // For 404 errors, just return empty array
      if (response.status === 404) {
        return res.status(200).json([]);
      }
      
      return res.status(500).json({ 
        error: `External API error: ${response.status}`,
        message: "Failed to retrieve remuneration data from external service" 
      });
    }
    
    try {
      const data = await response.json();
      return res.status(200).json(data);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return res.status(500).json({ 
        error: "Invalid response format",
        message: "The external API returned invalid data" 
      });
    }
  } catch (error) {
    console.error("Fetch error:", error);
    
    // Return empty array instead of error for network issues
    // This helps the frontend continue to work even if the remuneration service is down
    return res.status(200).json([]);
  }
};

export default withSentry(handler);
