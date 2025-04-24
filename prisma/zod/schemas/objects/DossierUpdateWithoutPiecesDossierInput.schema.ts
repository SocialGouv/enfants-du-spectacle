import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { EnumStatutDossierFieldUpdateOperationsInputObjectSchema } from './EnumStatutDossierFieldUpdateOperationsInput.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { EnumCategorieDossierFieldUpdateOperationsInputObjectSchema } from './EnumCategorieDossierFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { DossierUpdatejustificatifsInputObjectSchema } from './DossierUpdatejustificatifsInput.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { DossierUpdatescenesSensiblesInputObjectSchema } from './DossierUpdatescenesSensiblesInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { StatusNotifSchema } from '../enums/StatusNotif.schema';
import { NullableEnumStatusNotifFieldUpdateOperationsInputObjectSchema } from './NullableEnumStatusNotifFieldUpdateOperationsInput.schema';
import { SourceSchema } from '../enums/Source.schema';
import { NullableEnumSourceFieldUpdateOperationsInputObjectSchema } from './NullableEnumSourceFieldUpdateOperationsInput.schema';
import { CommissionUpdateOneRequiredWithoutDossiersNestedInputObjectSchema } from './CommissionUpdateOneRequiredWithoutDossiersNestedInput.schema';
import { SocieteProductionUpdateOneRequiredWithoutDossiersNestedInputObjectSchema } from './SocieteProductionUpdateOneRequiredWithoutDossiersNestedInput.schema';
import { EnfantUpdateManyWithoutDossierNestedInputObjectSchema } from './EnfantUpdateManyWithoutDossierNestedInput.schema';
import { CommentaireUpdateManyWithoutDossierNestedInputObjectSchema } from './CommentaireUpdateManyWithoutDossierNestedInput.schema';
import { UserUpdateOneWithoutDossiersNestedInputObjectSchema } from './UserUpdateOneWithoutDossiersNestedInput.schema';
import { UserUpdateOneWithoutDossiersMedecinNestedInputObjectSchema } from './UserUpdateOneWithoutDossiersMedecinNestedInput.schema';
import { DemandeurUpdateOneRequiredWithoutDossiersNestedInputObjectSchema } from './DemandeurUpdateOneRequiredWithoutDossiersNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateWithoutPiecesDossierInput> = z
  .object({
    nom: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    statut: z
      .union([
        z.lazy(() => StatutDossierSchema),
        z.lazy(() => EnumStatutDossierFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    categorie: z
      .union([
        z.lazy(() => CategorieDossierSchema),
        z.lazy(
          () => EnumCategorieDossierFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional(),
    numeroDS: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    justificatifs: z
      .union([
        z.lazy(() => DossierUpdatejustificatifsInputObjectSchema),
        z.lazy(() => JustificatifDossierSchema).array(),
      ])
      .optional(),
    scenesSensibles: z
      .union([
        z.lazy(() => DossierUpdatescenesSensiblesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    presentation: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    conventionCollectiveCode: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    otherConventionCollective: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    dateDebut: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    dateFin: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    externalId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    number: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    dateDerniereModification: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    cdc: z
      .union([
        z.number(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    dateDepot: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    statusNotification: z
      .union([
        z.lazy(() => StatusNotifSchema),
        z.lazy(
          () => NullableEnumStatusNotifFieldUpdateOperationsInputObjectSchema,
        ),
      ])
      .optional()
      .nullable(),
    source: z
      .union([
        z.lazy(() => SourceSchema),
        z.lazy(() => NullableEnumSourceFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    commission: z
      .lazy(
        () => CommissionUpdateOneRequiredWithoutDossiersNestedInputObjectSchema,
      )
      .optional(),
    societeProduction: z
      .lazy(
        () =>
          SocieteProductionUpdateOneRequiredWithoutDossiersNestedInputObjectSchema,
      )
      .optional(),
    enfants: z
      .lazy(() => EnfantUpdateManyWithoutDossierNestedInputObjectSchema)
      .optional(),
    commentaires: z
      .lazy(() => CommentaireUpdateManyWithoutDossierNestedInputObjectSchema)
      .optional(),
    user: z
      .lazy(() => UserUpdateOneWithoutDossiersNestedInputObjectSchema)
      .optional(),
    medecin: z
      .lazy(() => UserUpdateOneWithoutDossiersMedecinNestedInputObjectSchema)
      .optional(),
    demandeur: z
      .lazy(
        () => DemandeurUpdateOneRequiredWithoutDossiersNestedInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const DossierUpdateWithoutPiecesDossierInputObjectSchema = Schema;
