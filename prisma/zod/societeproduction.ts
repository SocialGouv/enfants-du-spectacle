import * as z from "zod"
import * as imports from "../null"
import { CompleteDemandeur, RelatedDemandeurModel, CompleteDossier, RelatedDossierModel } from "./index"

export const SocieteProductionModel = z.object({
  id: z.number().int(),
  nom: z.string(),
  siret: z.string(),
  siren: z.string(),
  departement: z.string(),
  naf: z.string(),
  raisonSociale: z.string(),
  adresse: z.string(),
  adresseCodePostal: z.string(),
  adresseCodeCommune: z.string(),
  formeJuridique: z.string(),
  conventionCollectiveCode: z.string(),
})

export interface CompleteSocieteProduction extends z.infer<typeof SocieteProductionModel> {
  demandeurs: CompleteDemandeur[]
  dossiers: CompleteDossier[]
}

/**
 * RelatedSocieteProductionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSocieteProductionModel: z.ZodSchema<CompleteSocieteProduction> = z.lazy(() => SocieteProductionModel.extend({
  demandeurs: RelatedDemandeurModel.array(),
  dossiers: RelatedDossierModel.array(),
}))
