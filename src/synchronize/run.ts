import { parseDemandeur, upsertDemandeur } from "src/synchronize/demandeur";
import { parseDossier, upsertDossier } from "src/synchronize/dossier";
import { parseEnfants } from "src/synchronize/enfant";
import { graphqlClient } from "src/synchronize/graphqlClient";
import {
  parseSocieteProduction,
  upsertSocieteProduction,
} from "src/synchronize/societeProduction";

import type { Demarche, Dossier as DossierDS } from "./demarchesSimplifiees";
import { DEMARCHE_QUERY } from "./graphqlQueries";

const DS_DEMARCHE_NUMBER = 49723;
const LAST_SYNC_RUN = new Date(Date.now() - 864e5); // TODO

export async function synchronizeDossier(dossierDS: DossierDS): Promise<void> {
  const societeProduction = await upsertSocieteProduction(
    parseSocieteProduction(dossierDS)
  );
  const demandeur = await upsertDemandeur(
    parseDemandeur(dossierDS),
    societeProduction
  );
  const enfants = parseEnfants(dossierDS);
  await upsertDossier(parseDossier(dossierDS), {
    demandeur,
    enfants,
    societeProduction,
  });
}

async function synchronizeDossiers(result: { data?: { demarche?: Demarche } }) {
  if (
    !result.data ||
    !result.data.demarche ||
    !result.data.demarche.dossiers.nodes
  )
    return;
  for (const rawDossier of result.data.demarche.dossiers.nodes) {
    if (!rawDossier) continue;
    await synchronizeDossier(rawDossier);
  }
}

function handleError(e: Error): void {
  throw e;
}

["en_construction"].forEach((state) => {
  graphqlClient
    .query(DEMARCHE_QUERY, {
      createdAfter: LAST_SYNC_RUN,
      demarcheNumber: DS_DEMARCHE_NUMBER,
      state,
    })
    .toPromise()
    .then(synchronizeDossiers)
    .catch(handleError);
});
