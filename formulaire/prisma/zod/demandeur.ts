import * as z from "zod"
import { CompleteSocieteProduction, RelatedSocieteProductionModel, CompleteDossier, RelatedDossierModel } from "./index"

export const DemandeurModel = z.object({
  id: z.number().int(),
  email: z.string().nullish(),
  nom: z.string().nullish(),
  prenom: z.string().nullish(),
  phone: z.string().nullish(),
  fonction: z.string().nullish(),
  conventionCollectiveCode: z.string().nullish(),
  otherConventionCollective: z.string().nullish(),
  societeProductionId: z.number().int().nullish(),
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
