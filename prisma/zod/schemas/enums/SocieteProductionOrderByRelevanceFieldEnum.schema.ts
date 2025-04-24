import { z } from 'zod';

export const SocieteProductionOrderByRelevanceFieldEnumSchema = z.enum([
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
  'conventionCollectiveCode',
  'otherConventionCollective',
]);
