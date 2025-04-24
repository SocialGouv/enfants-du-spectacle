import { z } from 'zod';

export const STATUT_PIECESchema = z.enum(['VALIDE', 'REFUSE', 'EN_ATTENTE']);
