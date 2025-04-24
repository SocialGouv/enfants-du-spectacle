import { z } from 'zod';
import { StatutDossierSchema } from '../enums/StatutDossier.schema';
import { CategorieDossierSchema } from '../enums/CategorieDossier.schema';
import { DossierCreatejustificatifsInputObjectSchema } from './DossierCreatejustificatifsInput.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { DossierCreatescenesSensiblesInputObjectSchema } from './DossierCreatescenesSensiblesInput.schema';
import { StatusNotifSchema } from '../enums/StatusNotif.schema';
import { SourceSchema } from '../enums/Source.schema';
import { CommissionCreateNestedOneWithoutDossiersInputObjectSchema } from './CommissionCreateNestedOneWithoutDossiersInput.schema';
import { SocieteProductionCreateNestedOneWithoutDossiersInputObjectSchema } from './SocieteProductionCreateNestedOneWithoutDossiersInput.schema';
import { PieceDossierCreateNestedManyWithoutDossierInputObjectSchema } from './PieceDossierCreateNestedManyWithoutDossierInput.schema';
import { CommentaireCreateNestedManyWithoutDossierInputObjectSchema } from './CommentaireCreateNestedManyWithoutDossierInput.schema';
import { UserCreateNestedOneWithoutDossiersInputObjectSchema } from './UserCreateNestedOneWithoutDossiersInput.schema';
import { UserCreateNestedOneWithoutDossiersMedecinInputObjectSchema } from './UserCreateNestedOneWithoutDossiersMedecinInput.schema';
import { DemandeurCreateNestedOneWithoutDossiersInputObjectSchema } from './DemandeurCreateNestedOneWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateWithoutEnfantsInput> = z
  .object({
    nom: z.string(),
    statut: z.lazy(() => StatutDossierSchema).optional(),
    categorie: z.lazy(() => CategorieDossierSchema),
    numeroDS: z.number().optional().nullable(),
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
    commission: z.lazy(
      () => CommissionCreateNestedOneWithoutDossiersInputObjectSchema,
    ),
    societeProduction: z.lazy(
      () => SocieteProductionCreateNestedOneWithoutDossiersInputObjectSchema,
    ),
    piecesDossier: z
      .lazy(() => PieceDossierCreateNestedManyWithoutDossierInputObjectSchema)
      .optional(),
    commentaires: z
      .lazy(() => CommentaireCreateNestedManyWithoutDossierInputObjectSchema)
      .optional(),
    user: z
      .lazy(() => UserCreateNestedOneWithoutDossiersInputObjectSchema)
      .optional(),
    medecin: z
      .lazy(() => UserCreateNestedOneWithoutDossiersMedecinInputObjectSchema)
      .optional(),
    demandeur: z.lazy(
      () => DemandeurCreateNestedOneWithoutDossiersInputObjectSchema,
    ),
  })
  .strict();

export const DossierCreateWithoutEnfantsInputObjectSchema = Schema;
