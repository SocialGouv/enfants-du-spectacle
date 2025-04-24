import { z } from 'zod';

export const SocieteProductionScalarFieldEnumSchema = z.enum([
  'id',
  'nom',
  'siret',
  'siren',
  'departement',
  'naf',
  'raisonSociale',
  'adresse',
  'adresseCodePostal',
  'adresseCodeCommune',
  'formeJuridique',
]);
