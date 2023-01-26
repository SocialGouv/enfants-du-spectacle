import * as z from "zod"
import * as imports from "../null"
import { CompleteDemandeur, RelatedDemandeurModel } from "./index"

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
})

export interface CompleteSocieteProduction extends z.infer<typeof SocieteProductionModel> {
  Demandeur: CompleteDemandeur[]
}

/**
 * RelatedSocieteProductionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSocieteProductionModel: z.ZodSchema<CompleteSocieteProduction> = z.lazy(() => SocieteProductionModel.extend({
  Demandeur: RelatedDemandeurModel.array(),
}))
