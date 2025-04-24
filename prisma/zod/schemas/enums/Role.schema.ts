import { z } from 'zod';

export const RoleSchema = z.enum(['ADMIN', 'INSTRUCTEUR', 'MEMBRE', 'MEDECIN']);
