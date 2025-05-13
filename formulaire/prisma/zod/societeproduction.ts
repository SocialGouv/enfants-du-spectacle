import * as z from "zod"
import { CompleteDemandeur, RelatedDemandeurModel, CompleteDossier, RelatedDossierModel } from "./index"

export const SocieteProductionModel = z.object({
  id: z.number().int(),
  nom: z.string().nullish(),
  siret: z.string().nullish(),
  siren: z.string().nullish(),
  departement: z.string().nullish(),
  naf: z.string().nullish(),
  raisonSociale: z.string().nullish(),
  adresse: z.string().nullish(),
  adresseCodePostal: z.string().nullish(),
  adresseCodeCommune: z.string().nullish(),
  formeJuridique: z.string().nullish(),
  conventionCollectiveCode: z.string().nullish(),
  otherConventionCollective: z.string().nullish().nullish(),
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
