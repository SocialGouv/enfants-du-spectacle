import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { EnumStatutDossierFieldUpdateOperationsInputObjectSchema } from './EnumStatutDossierFieldUpdateOperationsInput.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { NullableEnumCategorieDossierFieldUpdateOperationsInputObjectSchema } from './NullableEnumCategorieDossierFieldUpdateOperationsInput.schema';
import { DossierUpdatecollaboratorIdsInputObjectSchema } from './DossierUpdatecollaboratorIdsInput.schema';
import { DossierUpdatejustificatifsInputObjectSchema } from './DossierUpdatejustificatifsInput.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { DossierUpdatescenesSensiblesInputObjectSchema } from './DossierUpdatescenesSensiblesInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { EnfantUncheckedUpdateManyWithoutDossierNestedInputObjectSchema } from './EnfantUncheckedUpdateManyWithoutDossierNestedInput.schema';
import { CommentsUncheckedUpdateManyWithoutDossierNestedInputObjectSchema } from './CommentsUncheckedUpdateManyWithoutDossierNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUncheckedUpdateWithoutPiecesDossierInput> =
  z
    .object({
      id: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      nom: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
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
            () =>
              NullableEnumCategorieDossierFieldUpdateOperationsInputObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      collaboratorIds: z
        .union([
          z.lazy(() => DossierUpdatecollaboratorIdsInputObjectSchema),
          z.number().array(),
        ])
        .optional(),
      userId: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
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
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      dateDebut: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      dateFin: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
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
      dateCreation: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
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
      scenario: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      securite: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      complementaire: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
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
      demandeurId: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      commissionDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      commissionString: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      enfants: z
        .lazy(
          () => EnfantUncheckedUpdateManyWithoutDossierNestedInputObjectSchema,
        )
        .optional(),
      Comments: z
        .lazy(
          () =>
            CommentsUncheckedUpdateManyWithoutDossierNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const DossierUncheckedUpdateWithoutPiecesDossierInputObjectSchema =
  Schema;
