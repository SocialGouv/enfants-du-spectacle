import { z } from 'zod';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { DossierCreatejustificatifsInputObjectSchema } from './DossierCreatejustificatifsInput.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { DossierCreatescenesSensiblesInputObjectSchema } from './DossierCreatescenesSensiblesInput.schema';
import { StatusNotifSchema } from '../enums/StatusNotif.schema';
import { SourceSchema } from '../enums/Source.schema';
import { EnfantUncheckedCreateNestedManyWithoutDossierInputObjectSchema } from './EnfantUncheckedCreateNestedManyWithoutDossierInput.schema';
import { PieceDossierUncheckedCreateNestedManyWithoutDossierInputObjectSchema } from './PieceDossierUncheckedCreateNestedManyWithoutDossierInput.schema';
import { CommentaireUncheckedCreateNestedManyWithoutDossierInputObjectSchema } from './CommentaireUncheckedCreateNestedManyWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.number().optional(),
    nom: z.string(),
    statut: z.lazy(() => StatutDossierSchema).optional(),
    categorie: z.lazy(() => CategorieDossierSchema),
    commissionId: z.number(),
    societeProductionId: z.number(),
    numeroDS: z.number().optional().nullable(),
    medecinId: z.number().optional().nullable(),
    demandeurId: z.number(),
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
    presentation: z.string(),
    conventionCollectiveCode: z.string().optional().nullable(),
    otherConventionCollective: z.string().optional().nullable(),
    dateDebut: z.coerce.date(),
    dateFin: z.coerce.date(),
    externalId: z.string().optional().nullable(),
    number: z.number().optional().nullable(),
    dateDerniereModification: z.coerce.date().optional().nullable(),
    cdc: z.number().optional().nullable(),
    dateDepot: z.coerce.date().optional().nullable(),
    statusNotification: z
      .lazy(() => StatusNotifSchema)
      .optional()
      .nullable(),
    source: z
      .lazy(() => SourceSchema)
      .optional()
      .nullable(),
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
    commentaires: z
      .lazy(
        () =>
          CommentaireUncheckedCreateNestedManyWithoutDossierInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const DossierUncheckedCreateWithoutUserInputObjectSchema = Schema;
