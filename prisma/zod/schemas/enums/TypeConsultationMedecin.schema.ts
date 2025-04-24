import { z } from 'zod';

export const TypeConsultationMedecinSchema = z.enum([
  'PHYSIQUE',
  'PIECE',
  'PRISE_EN_CHARGE',
  'MEDECIN_TRAITANT',
]);
