import * as z from "zod"
import * as imports from "../null"
import { StatutDossier, CategorieDossier, JustificatifDossier, StatusNotif, Source } from "@prisma/client"
import { CompleteCommission, RelatedCommissionModel, CompleteSocieteProduction, RelatedSocieteProductionModel, CompleteEnfant, RelatedEnfantModel, CompletePieceDossier, RelatedPieceDossierModel, CompleteCommentaire, RelatedCommentaireModel, CompleteUser, RelatedUserModel, CompleteDemandeur, RelatedDemandeurModel } from "./index"

export const DossierModel = z.object({
  id: z.number().int(),
  nom: z.string(),
  statut: z.nativeEnum(StatutDossier),
  categorie: z.nativeEnum(CategorieDossier),
  commissionId: z.number().int(),
  societeProductionId: z.number().int(),
  numeroDS: z.number().int().nullish(),
  userId: z.number().int().nullish(),
  demandeurId: z.number().int(),
  justificatifs: z.nativeEnum(JustificatifDossier).array(),
  scenesSensibles: z.string().array(),
  presentation: z.string(),
  conventionCollectiveCode: z.string().nullish(),
  dateDebut: z.string(),
  dateFin: z.string(),
  externalId: z.string().nullish(),
  number: z.number().int().nullish(),
  dateDerniereModification: z.string().nullish(),
  cdc: z.number().int().nullish(),
  dateDepot: z.date().nullish(),
  statusNotification: z.nativeEnum(StatusNotif).nullish(),
  source: z.nativeEnum(Source).nullish(),
})

export interface CompleteDossier extends z.infer<typeof DossierModel> {
  commission: CompleteCommission
  societeProduction: CompleteSocieteProduction
  enfants: CompleteEnfant[]
  piecesDossier: CompletePieceDossier[]
  commentaires: CompleteCommentaire[]
  user?: CompleteUser | null
  demandeur: CompleteDemandeur
}

/**
 * RelatedDossierModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDossierModel: z.ZodSchema<CompleteDossier> = z.lazy(() => DossierModel.extend({
  commission: RelatedCommissionModel,
  societeProduction: RelatedSocieteProductionModel,
  enfants: RelatedEnfantModel.array(),
  piecesDossier: RelatedPieceDossierModel.array(),
  commentaires: RelatedCommentaireModel.array(),
  user: RelatedUserModel.nullish(),
  demandeur: RelatedDemandeurModel,
}))
