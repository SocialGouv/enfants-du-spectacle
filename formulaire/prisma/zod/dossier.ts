import * as z from "zod"
import { StatutDossier, CategorieDossier, JustificatifDossier } from "@prisma/client"
import { CompleteEnfant, RelatedEnfantModel, CompletePieceDossier, RelatedPieceDossierModel, CompleteUser, RelatedUserModel, CompleteDemandeur, RelatedDemandeurModel, CompleteSocieteProduction, RelatedSocieteProductionModel } from "./index"

export const DossierModel = z.object({
  id: z.number().int(),
  nom: z.string(),
  statut: z.nativeEnum(StatutDossier),
  categorie: z.nativeEnum(CategorieDossier),
  commissionId: z.number().int(),
  societeProductionId: z.number().int(),
  userId: z.number().int().nullish(),
  medecinId: z.number().int().nullish(),
  demandeurId: z.number().int(),
  justificatifs: z.nativeEnum(JustificatifDossier).array(),
  scenesSensibles: z.string().array(),
  presentation: z.string(),
  conventionCollectiveCode: z.string().nullish(),
  otherConventionCollective: z.string().nullish(),
  dateDebut: z.date(),
  dateFin: z.date(),
  externalId: z.string().nullish(),
  number: z.number().int().nullish(),
  dateDerniereModification: z.date().nullish(),
  cdc: z.number().int().nullish(),
  dateDepot: z.date().nullish(),
  statusNotification: z.string().nullish(),
  source: z.string().nullish(),
  numeroDS: z.number().int().nullish()
})

export interface CompleteDossier extends z.infer<typeof DossierModel> {
  enfants: CompleteEnfant[]
  piecesDossier: CompletePieceDossier[]
  user?: CompleteUser | null
  medecin?: CompleteUser | null
  demandeur: CompleteDemandeur
  societeProduction: CompleteSocieteProduction
}

/**
 * RelatedDossierModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDossierModel: z.ZodSchema<CompleteDossier> = z.lazy(() => DossierModel.extend({
  enfants: RelatedEnfantModel.array(),
  piecesDossier: RelatedPieceDossierModel.array(),
  user: RelatedUserModel.nullish(),
  medecin: RelatedUserModel.nullish(),
  demandeur: RelatedDemandeurModel,
  societeProduction: RelatedSocieteProductionModel
}))
