import { z } from 'zod';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { DossierCreatecollaboratorIdsInputObjectSchema } from './DossierCreatecollaboratorIdsInput.schema';
import { DossierCreatejustificatifsInputObjectSchema } from './DossierCreatejustificatifsInput.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { DossierCreatescenesSensiblesInputObjectSchema } from './DossierCreatescenesSensiblesInput.schema';
import { EnfantUncheckedCreateNestedManyWithoutDossierInputObjectSchema } from './EnfantUncheckedCreateNestedManyWithoutDossierInput.schema';
import { PieceDossierUncheckedCreateNestedManyWithoutDossierInputObjectSchema } from './PieceDossierUncheckedCreateNestedManyWithoutDossierInput.schema';
import { CommentsUncheckedCreateNestedManyWithoutDossierInputObjectSchema } from './CommentsUncheckedCreateNestedManyWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.number().optional(),
    nom: z.string().optional().nullable(),
    statut: z.lazy(() => StatutDossierSchema).optional(),
    categorie: z
      .lazy(() => CategorieDossierSchema)
      .optional()
      .nullable(),
    collaboratorIds: z
      .union([
        z.lazy(() => DossierCreatecollaboratorIdsInputObjectSchema),
        z.number().array(),
      ])
      .optional(),
    justificatifs: z
      .union([
        z.lazy(() => DossierCreatejustificatifsInputObjectSchema),
        z.lazy(() => JustificatifDossierSchema).array(),
      ])
      .optional(),
    scenesSensibles: z
      .union([
        z.lazy(() => DossierCreatescenesSensiblesInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    presentation: z.string().optional().nullable(),
    dateDebut: z.coerce.date().optional().nullable(),
    dateFin: z.coerce.date().optional().nullable(),
    number: z.number().optional().nullable(),
    dateCreation: z.coerce.date().optional().nullable(),
    dateDerniereModification: z.coerce.date().optional().nullable(),
    cdc: z.number().optional().nullable(),
    scenario: z.string().optional().nullable(),
    securite: z.string().optional().nullable(),
    complementaire: z.string().optional().nullable(),
    dateDepot: z.coerce.date().optional().nullable(),
    demandeurId: z.number().optional().nullable(),
    commissionDate: z.coerce.date().optional().nullable(),
    commissionString: z.string().optional().nullable(),
    enfants: z
      .lazy(
        () => EnfantUncheckedCreateNestedManyWithoutDossierInputObjectSchema,
      )
      .optional(),
    piecesDossier: z
      .lazy(
        () =>
          PieceDossierUncheckedCreateNestedManyWithoutDossierInputObjectSchema,
      )
      .optional(),
    Comments: z
      .lazy(
        () => CommentsUncheckedCreateNestedManyWithoutDossierInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const DossierUncheckedCreateWithoutUserInputObjectSchema = Schema;
