import { z } from 'zod';

export const TypeConsultationSchema = z.enum([
  'THALIE',
  'GENERALISTE',
  'UNNEEDED',
]);
