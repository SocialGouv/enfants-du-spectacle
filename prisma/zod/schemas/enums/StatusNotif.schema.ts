import { z } from 'zod';

export const StatusNotifSchema = z.enum(['NOUVEAU', 'MIS_A_JOUR']);
