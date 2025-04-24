import { z } from 'zod';

export const EnfantOrderByRelevanceFieldEnumSchema = z.enum([
  'prenom',
  'nom',
  'nomPersonnage',
  'periodeTravail',
  'contexteTravail',
  'remunerationsAdditionnelles',
  'adresseEnfant',
  'nomRepresentant1',
  'prenomRepresentant1',
  'adresseRepresentant1',
  'telRepresentant1',
  'mailRepresentant1',
  'adresseRepresentant2',
  'nomRepresentant2',
  'prenomRepresentant2',
  'telRepresentant2',
  'mailRepresentant2',
  'externalId',
  'textTravailNuit',
]);
