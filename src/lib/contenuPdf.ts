// Type pour les sections PDF
type SectionPdf = "TEXTES_LEGAUX" | "CONSIDERANTS" | "ARTICLE_2" | "ARTICLE_3" | "ARTICLE_4" | "SIGNATURE" | "RECOURS";

export interface ContenuPdfData {
  titre: string;
  contenu: string;
}

// Contenus par défaut pour chaque section
const CONTENUS_DEFAUT: Record<SectionPdf, ContenuPdfData> = {
  TEXTES_LEGAUX: {
    titre: "Textes légaux",
    contenu: `Vu les articles L7124-1 à L7124-35 et R7124-1 à R7124-35 du code du travail ;
Vu la loi n° 82-213 du 2 mars 1982 relative aux droits et libertés des communes, des départements et des régions, modifiée ;
Vu la loi d'orientation n° 92-125 du 6 février 1992 modifiée relative à l'administration territoriale de la République, notamment ses articles 4 et 6 ;
Vu le décret n° 97-34 du 15 janvier 1997 relatif à la déconcentration des décisions administratives individuelles ;
Vu  le décret n° 2004-374 du 29 avril 2004 modifié relatif aux pouvoirs des préfets, à l'organisation et à l'action des services de l'État dans les régions et départements ;
Vu le décret n° 2009-360 du 31 mars 2009 relatif aux emplois de direction de l'administration territoriale de l'État ;
Vu le décret n°2010-146 du 16 février 2010 modifiant le décret n° 2004-374 du 29 avril 2004 relatif aux pouvoirs des préfets, à l'organisation et à l'action des services de l'État dans les régions et départements ;
Vu le décret n° 2020-1545 du 9 décembre 2020 relatif à l'organisation et aux missions des directions régionales de l'économie, de l'emploi, du travail et des solidarités, des directions départementales de l'emploi, du travail et des solidarités et des directions départementales de l'emploi, du travail, des solidarités et de la protection des populations ;`
  },
  CONSIDERANTS: {
    titre: "Considérants",
    contenu: `Considérant que la commission des enfants du spectacle, pour autoriser un mineur de moins de 16 ans à travailler dans une entreprise de spectacle, vérifie:
- L'absence de risque pour la santé, la sécurité et la moralité du mineur;
- Les conditions d'emploi et de rémunération du mineur;

Considérant qu'après analyse, le projet présenté respecte les conditions de travail et de rémunération;`
  },
  ARTICLE_2: {
    titre: "Article 2",
    contenu: `La rémunération totale comprend un ou plusieurs cachets de base et des rémunérations additionnelles éventuelles. Ces dernières seront déduites du montant total dans le cas où les prestations correspondantes n'auront pas été réalisées.`
  },
  ARTICLE_3: {
    titre: "Article 3", 
    contenu: `Le versement à la Caisse des dépôts et consignations est accompagné d'une déclaration de l'employeur rappelant l'état civil de l'enfant, son domicile et le nom de ses représentants légaux.`
  },
  ARTICLE_4: {
    titre: "Article 4",
    contenu: `La durée quotidienne de travail ne peut excéder :

Pour les enfants de moins de 3 ans: 1h/jour avec pause obligatoire après 30 minutes de temps de travail.

Pour les enfants de 3 à 5 ans: 2h/jour avec pause obligatoire après 1h00 de temps de travail.

Pour les enfants de 6 à 11 ans :
En période scolaire : 3h/jour avec pause obligatoire après 1h30 de temps de travail ;
En période de vacances scolaires : 4h/jour avec pause obligatoire après 2h00 de temps de travail;

Pour les enfants de 12 à 16 ans:
En période scolaire: 4h/jour avec pause obligatoire après 2h00 de temps de travail
En période de vacances scolaires: 6h/jour avec pause obligatoire après 3h00 de temps de travail.`
  },
  SIGNATURE: {
    titre: "Signature",
    contenu: `Fait à Aubervilliers, le : {DATE_COMMISSION}

Pour le préfet et par délégation
Sophie Bidon

Responsable du département protection et insertion des jeunes`
  },
  RECOURS: {
    titre: "Voies et délais de recours",
    contenu: `Voies et délais de recours :
Cette décision peut faire l'objet  dans un délai de deux mois à compter de sa notification:
-  d'un recours hiérarchique auprès du ministre du travail, de l'emploi et de l'insertion, Direction générale du travail, 39-43 quai André-Citroën 75902 Paris cedex 15;
-  d'un recours contentieux auprès du tribunal administratif de Paris, 7 rue de Jouy -75181 Paris Cedex 04.`
  }
};

// Cette fonction n'est plus utilisée, remplacée par getAllContenusPdf via API

/**
 * Récupère tous les contenus PDF pour un département donné via API
 */
export async function getAllContenusPdf(departement: string): Promise<Record<SectionPdf, ContenuPdfData>> {
  console.log('DEBUG getAllContenusPdf - Département:', departement);
  
  try {
    console.log('DEBUG - Appel API pour récupérer les contenus...');
    const response = await fetch(`/api/contenus-pdf/${departement}`);
    
    if (response.ok) {
      const contenus = await response.json();
      console.log('DEBUG - Contenus récupérés depuis l\'API:', Object.keys(contenus));
      return contenus;
    } else {
      console.error('DEBUG - Erreur API:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('DEBUG - Erreur lors de l\'appel API:', error);
  }
  
  // Fallback vers les contenus par défaut
  console.log('DEBUG - Utilisation des contenus par défaut');
  return CONTENUS_DEFAUT;
}

/**
 * Remplace les variables dans le contenu (ex: {DATE_COMMISSION})
 */
export function replaceVariables(contenu: string, variables: Record<string, string>): string {
  let result = contenu;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), value);
  }
  return result;
}
