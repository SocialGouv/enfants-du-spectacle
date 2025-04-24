import { z } from 'zod';

export const TypeEmploiSchema = z.enum([
  'ROLE_1',
  'ROLE_2',
  'FIGURATION',
  'SILHOUETTE',
  'SILHOUETTE_PARLANTE',
  'DOUBLURE',
  'DOUBLAGE',
  'CHANT',
  'CHORISTE',
  'CIRCASSIEN',
  'MUSICIEN',
  'DANSE',
  'JEU_VIDEO',
  'AUTRE',
]);
