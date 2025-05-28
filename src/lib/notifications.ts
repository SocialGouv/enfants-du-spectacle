import prismaClient from "src/lib/prismaClient";

export interface CommissionNotifications {
  dossierId: number;
  notificationsProject: number;
  notificationsChildren: number;
  newPiecesEnfant: number;
  newPiecesDossier: number;
}

/**
 * Calcule les notifications pour un dossier spécifique
 */
export async function getDossierNotifications(dossierId: number): Promise<CommissionNotifications> {
  const [projectComments, childrenComments, newPiecesDossier, newPiecesEnfant] = await Promise.all([
    // Comments non lus sur le projet (enfantId = null) - incluant seen: false ET seen: null
    prismaClient.comments.count({
      where: { 
        dossierId, 
        enfantId: null, 
        OR: [
          { seen: false },
          { seen: null }
        ]
      }
    }),
    
    // Comments non lus sur les enfants (enfantId != null) - incluant seen: false ET seen: null
    prismaClient.comments.count({
      where: { 
        dossierId, 
        enfantId: { not: null }, 
        OR: [
          { seen: false },
          { seen: null }
        ]
      }
    }),
    
    // Nouvelles pièces dossier en attente - incluant statut: 'EN_ATTENTE' ET statut: null
    prismaClient.pieceDossier.count({
      where: { 
        dossierId, 
        OR: [
          { statut: 'EN_ATTENTE' },
          { statut: null }
        ]
      }
    }),
    
    // Nouvelles pièces enfants en attente - incluant statut: 'EN_ATTENTE' ET statut: null
    prismaClient.pieceDossierEnfant.count({
      where: { 
        enfant: { dossierId },
        OR: [
          { statut: 'EN_ATTENTE' },
          { statut: null }
        ]
      }
    })
  ]);

  return {
    dossierId,
    notificationsProject: projectComments,
    notificationsChildren: childrenComments,
    newPiecesDossier,
    newPiecesEnfant
  };
}

/**
 * Calcule les notifications pour tous les dossiers d'une commission
 */
export async function getCommissionNotifications(commissionId: number): Promise<CommissionNotifications[]> {
  // Récupérer tous les dossiers de la commission
  const dossiers = await prismaClient.dossier.findMany({
    where: { commissionId },
    select: { id: true }
  });

  // Calculer les notifications pour chaque dossier
  const notifications = await Promise.all(
    dossiers.map((dossier: { id: number }) => getDossierNotifications(dossier.id))
  );

  return notifications;
}

/**
 * Calcule les notifications pour plusieurs dossiers en une seule requête optimisée
 */
export async function getBulkDossierNotifications(dossierIds: number[]): Promise<CommissionNotifications[]> {
  if (dossierIds.length === 0) return [];

  const [projectComments, childrenComments, piecesDossier, piecesEnfant] = await Promise.all([
    // Comments non lus sur les projets - incluant seen: false ET seen: null
    prismaClient.comments.groupBy({
      by: ['dossierId'],
      where: { 
        dossierId: { in: dossierIds },
        enfantId: null, 
        OR: [
          { seen: false },
          { seen: null }
        ]
      },
      _count: { id: true }
    }),
    
    // Comments non lus sur les enfants - incluant seen: false ET seen: null
    prismaClient.comments.groupBy({
      by: ['dossierId'],
      where: { 
        dossierId: { in: dossierIds },
        enfantId: { not: null }, 
        OR: [
          { seen: false },
          { seen: null }
        ]
      },
      _count: { id: true }
    }),
    
    // Nouvelles pièces dossier - incluant statut: 'EN_ATTENTE' ET statut: null
    prismaClient.pieceDossier.groupBy({
      by: ['dossierId'],
      where: { 
        dossierId: { in: dossierIds },
        OR: [
          { statut: 'EN_ATTENTE' },
          { statut: null }
        ]
      },
      _count: { id: true }
    }),
    
    // Nouvelles pièces enfants - incluant statut: 'EN_ATTENTE' ET statut: null
    prismaClient.pieceDossierEnfant.findMany({
      where: { 
        enfant: { dossierId: { in: dossierIds } },
        OR: [
          { statut: 'EN_ATTENTE' },
          { statut: null }
        ]
      },
      include: {
        enfant: {
          select: { dossierId: true }
        }
      }
    })
  ]);

  // Créer une map pour faciliter l'accès aux données
  const projectCommentsMap = new Map(projectComments.map((item: any) => [item.dossierId, item._count.id]));
  const childrenCommentsMap = new Map(childrenComments.map((item: any) => [item.dossierId, item._count.id]));
  const piecesDossierMap = new Map(piecesDossier.map((item: any) => [item.dossierId, item._count.id]));
  
  // Pour les pièces enfants, nous devons regrouper par dossierId
  const piecesEnfantMap = new Map<number, number>();
  for (const item of piecesEnfant as any[]) {
    if (item.enfant?.dossierId) {
      const dossierId = item.enfant.dossierId;
      piecesEnfantMap.set(dossierId, (piecesEnfantMap.get(dossierId) || 0) + 1);
    }
  }

  // Créer le résultat pour chaque dossier
  return dossierIds.map(dossierId => ({
    dossierId,
    notificationsProject: projectCommentsMap.get(dossierId) || 0,
    notificationsChildren: childrenCommentsMap.get(dossierId) || 0,
    newPiecesDossier: piecesDossierMap.get(dossierId) || 0,
    newPiecesEnfant: piecesEnfantMap.get(dossierId) || 0
  }));
}
