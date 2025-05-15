import { Demandeur } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { DemandeurModel } from "../../../prisma/zod/demandeur";
import prisma from "../../../src/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const post: NextApiHandler = async (req, res) => {
  try {
    // Parse the request body if present, otherwise use empty object
    let data = {};
    if (req.body) {
      if (typeof req.body === "string") {
        const parsed = JSON.parse(req.body);
        if (parsed) {
          data = parsed;
        }
      } else {
        data = req.body;
      }
    }
    
    // Create the demandeur
    const demandeur = await prisma.demandeur.create({ data });
    res.status(200).json(demandeur);
  } catch (e: unknown) {
    console.error("Error creating demandeur:", e);
    res.status(500).json({ error: "Failed to create demandeur" });
  }
};

const update: NextApiHandler = async (req, res) => {
  console.log("Update demandeur - Request body type:", typeof req.body);
  
  let parsed: Demandeur;
  
  try {
    // Handle both string and object formats
    if (typeof req.body === "string") {
      parsed = JSON.parse(req.body);
    } else if (typeof req.body === "object") {
      parsed = req.body;
    } else {
      console.error("Update demandeur - Invalid body format:", req.body);
      res.status(400).json({ error: "Request body must be a JSON string or object" });
      return;
    }
    console.log('Parsed demandeur data:', parsed);
    
    if (!parsed) {
      console.error("Update demandeur - Empty parsed data");
      res.status(400).json({ error: "Empty request body" });
      return;
    }
    
    // Check if ID exists before attempting update
    if (!parsed.id) {
      console.error("Update demandeur - Missing ID");
      res.status(400).json({ error: "Missing demandeur ID for update" });
      return;
    }
    
    // Get only valid fields from the demandeur model
    const demandeurData = DemandeurModel.omit({ id: true });
    let dataToUpdate;
    try {
      dataToUpdate = demandeurData.parse(parsed);
      console.log("Valid demandeur data for update:", dataToUpdate);
    } catch (zodError) {
      console.error("Update demandeur - Zod validation error:", zodError);
      res.status(400).json({ error: "Invalid demandeur data format", details: zodError });
      return;
    }
    
    // Check if dataToUpdate is empty
    if (Object.keys(dataToUpdate).length === 0) {
      console.error("Update demandeur - Empty data object after parsing");
      res.status(400).json({ error: "No valid fields to update" });
      return;
    }
    
    // Only proceed with update if we have data to update
    try {
      let demandeurUpdated = await prisma.demandeur.update({
        data: dataToUpdate,
        where: { id: parsed.id },
      });
      
      console.log("Demandeur updated successfully:", demandeurUpdated);
      res.status(200).json(demandeurUpdated);
    } catch (error) {
      console.error("Error updating demandeur in database:", error);
      res.status(500).json({ error: "Failed to update demandeur in database", details: error });
    }
  } catch (parseError) {
    console.error("Update demandeur - JSON parse error:", parseError);
    res.status(400).json({ error: "Invalid JSON in request body", details: parseError });
  }
};

export default withSentry(handler);
