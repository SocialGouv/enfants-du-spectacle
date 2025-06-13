-- AlterTable
ALTER TABLE "Enfant" ADD COLUMN     "nameId" TEXT;

-- CreateIndex
CREATE INDEX "idx_comments_dossierId" ON "Comments"("dossierId");

-- CreateIndex
CREATE INDEX "idx_comments_userId" ON "Comments"("userId");

-- CreateIndex
CREATE INDEX "idx_comments_enfantId" ON "Comments"("enfantId");

-- CreateIndex
CREATE INDEX "idx_dossier_commissionId" ON "Dossier"("commissionId");

-- CreateIndex
CREATE INDEX "idx_dossier_societeProductionId" ON "Dossier"("societeProductionId");

-- CreateIndex
CREATE INDEX "idx_dossier_demandeurId" ON "Dossier"("demandeurId");

-- CreateIndex
CREATE INDEX "idx_dossier_creatorId" ON "Dossier"("creatorId");

-- CreateIndex
CREATE INDEX "idx_dossier_instructeurId" ON "Dossier"("instructeurId");

-- CreateIndex
CREATE INDEX "idx_dossier_medecinId" ON "Dossier"("medecinId");

-- CreateIndex
CREATE INDEX "idx_dossier_nom" ON "Dossier"("nom");

-- CreateIndex
CREATE INDEX "idx_enfant_dossierId" ON "Enfant"("dossierId");

-- CreateIndex
CREATE INDEX "idx_enfant_populatedById" ON "Enfant"("populatedByUserId");

-- CreateIndex
CREATE INDEX "idx_enfant_nom" ON "Enfant"("nom");

-- CreateIndex
CREATE INDEX "idx_enfant_prenom" ON "Enfant"("prenom");

-- CreateIndex
CREATE INDEX "idx_pieceDossier_dossierId" ON "PieceDossier"("dossierId");

-- CreateIndex
CREATE INDEX "idx_pieceDossierEnfant_dossierId" ON "PieceDossierEnfant"("dossierId");

-- CreateIndex
CREATE INDEX "idx_pieceDossierEnfant_enfantId" ON "PieceDossierEnfant"("enfantId");
