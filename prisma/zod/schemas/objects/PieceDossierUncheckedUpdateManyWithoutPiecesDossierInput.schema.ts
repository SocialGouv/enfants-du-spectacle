import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { EnumJustificatifDossierFieldUpdateOperationsInputObjectSchema } from './EnumJustificatifDossierFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';
import { NullableEnumSTATUT_PIECEFieldUpdateOperationsInputObjectSchema } from './NullableEnumSTATUT_PIECEFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierUncheckedUpdateManyWithoutPiecesDossierInput> =
  z
    .object({
      id: z
        .union([
          z.number(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      type: z
        .union([
          z.lazy(() => JustificatifDossierSchema),
          z.lazy(
            () => EnumJustificatifDossierFieldUpdateOperationsInputObjectSchema,
          ),
        ])
        .optional(),
      link: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      statut: z
        .union([
          z.lazy(() => STATUT_PIECESchema),
          z.lazy(
            () =>
              NullableEnumSTATUT_PIECEFieldUpdateOperationsInputObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PieceDossierUncheckedUpdateManyWithoutPiecesDossierInputObjectSchema =
  Schema;
