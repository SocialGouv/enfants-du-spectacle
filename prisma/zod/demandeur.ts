import * as z from "zod"
import { CompleteSocieteProduction, RelatedSocieteProductionModel, CompleteDossier, RelatedDossierModel } from "./index"

export const DemandeurModel = z.object({
  id: z.number().int(),
  email: z.string(),
  nom: z.string(),
  prenom: z.string(),
  phone: z.string().nullish(),
  fonction: z.string(),
  societeProductionId: z.number().int(),
  conventionCollectiveCode: z.string().nullish(),
  otherConventionCollective: z.string().nullish(),
})

export interface CompleteDemandeur extends z.infer<typeof DemandeurModel> {
  societeProduction: CompleteSocieteProduction
  dossiers: CompleteDossier[]
}

/**
 * RelatedDemandeurModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDemandeurModel: z.ZodSchema<CompleteDemandeur> = z.lazy(() => DemandeurModel.extend({
  societeProduction: RelatedSocieteProductionModel,
  dossiers: RelatedDossierModel.array(),
}))
