# Database Consolidation Migration

This migration makes all the necessary changes to align the database schema with the consolidated Prisma model that merges the main application and formulaire application schemas.

## Changes Applied

### Default Value Changes
- Changed default value for `Dossier.statut` from CONSTRUCTION to BROUILLON

### Made Required Fields Optional
Made the following fields optional to match the unified schema:

**SocieteProduction model:**
- nom, siret, siren, departement, naf, raisonSociale, adresse, adresseCodePostal, adresseCodeCommune, formeJuridique, conventionCollectiveCode

**Demandeur model:**
- email, nom, prenom, fonction, societeProductionId

**Dossier model:**
- nom, categorie, commissionId, societeProductionId, demandeurId, presentation, dateDebut, dateFin

**Enfant model:**
- prenom, nom, dateNaissance, typeEmploi, nombreJours, montantCachet, nombreCachets, remunerationTotale

**File-related models:**
- PieceDossier.link
- PieceDossierEnfant.link

### Field Additions and Remapping
- Added the following columns from formulaire app to Dossier:
  - `Dossier.creatorId` field with foreign key constraint to User
  - `Dossier.commissionString` text field 
  - `Dossier.commissionDate` timestamp field
  - `Dossier.collaboratorIds` integer array field
- Added document link fields to Enfant:
  - `Enfant.livret`
  - `Enfant.autorisation`
  - `Enfant.situation`
  - `Enfant.contrat`
  - `Enfant.certificat`
  - `Enfant.avis`
- Mapped `Dossier.userId` to `Dossier.instructeurId`
- Mapped `Enfant.userId` to `Enfant.populatedByUserId`
- Removed the original `userId` columns after data migration

## Purpose

This migration allows for the consolidation of two previously separate databases into a unified database. It makes all necessary schema adjustments to ensure compatibility between the main application's data model and the formulaire application's data model.
