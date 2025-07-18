import type { Enfant, TypeEmploi } from "@prisma/client";
import { jsPDF } from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import logoPrefet from "src/images/logo_prefet.png";
import { 
  frenchDateText, 
  getRemsByDossier, 
  birthDateToFrenchAge,
  REMUNERATIONS,
  typeEmploiLabel,
  TYPES_EMPLOI,
  frenchDepartementName
} from "src/lib/helpers";
import _ from "lodash";
import type { DossierData } from "src/lib/types";
import { getAllContenusPdf, replaceVariables } from "src/lib/contenuPdf";
import commissions from "src/pages/api/commissions";

const generateDA = async (dossiers: DossierData[], binary = false, enfantId?: number) => {
  // Si enfantId est fourni, filtrer les enfants pour ne garder que celui-ci
  if (enfantId) {
    dossiers = dossiers.map(dossier => ({
      ...dossier,
      enfants: dossier.enfants.filter(enfant => enfant.id === enfantId)
    } as DossierData));
  }
  
  // Récupérer les contenus personnalisés pour le département
  const departement = dossiers[0].commission.departement || '75';
  const contenus = await getAllContenusPdf(departement);
  
  // Variables pour remplacer dans les contenus
  const variables = {
    DATE_COMMISSION: frenchDateText(dossiers[0].commission.date)
  };
  
  let rems = await getRemsByDossier(dossiers[0])
  const doc = new jsPDF();
  const blocs: RowInput[] = [];

  const getObjectDecret = (departement: string) => {
    switch (departement) {
      case "75":
        return {
          date: "22 juillet 2020",
          nom: "Monsieur Marc GUILLAUME",
          prefet: "Préfet de Paris",
        };
      case "77":
        return {
          date: "30 juin 2021",
          nom: "M. Lionel BEFFRE",
          prefet: "préfet de Seine-et-Marne",
        };
      case "78":
        return {
          date: "4 avril 2018",
          nom: "Monsieur Jean-Jacques BROT",
          prefet: "Préfet des Yvelines",
        };
      case "91":
        return {
          date: "20 juillet 2022",
          nom: "Monsieur Bertrand GAUME",
          prefet: "Préfet de l’Essonne",
        };
      case "92":
        return {
          date: "29 juillet 2020",
          nom: "Monsieur Laurent HOTTIAUX",
          prefet: "Préfet des Hauts-de-Seine",
        };
      case "93":
        return {
          date: "30 juin 2021",
          nom: "Monsieur Jacques WITKOWSKI ",
          prefet: "Préfet de la Seine-Saint-Denis",
        };
      case "94":
        return {
          date: "10 février 2021",
          nom: "Madame Sophie THIBAUT ",
          prefet: "Préfète du Val de Marne",
        };
      case "95":
        return {
          date: "9 mars 2022",
          nom: "M. Philippe COURT ",
          prefet: "préfet du Val-d'Oise",
        };
      default:
        break;
    }
  };

  dossiers.map((dossier: DossierData) => {
    // Utiliser la société de production liée au demandeur en priorité, puis celle liée au dossier
    // Après la migration, la société de production doit être récupérée via le demandeur
    const societeProduction = dossier.demandeur?.societeProduction || dossier.societeProduction;
    
    // Valeurs par défaut qui seront utilisées si les données sont absentes
    const nomSociete = societeProduction?.nom || societeProduction?.raisonSociale || 'la société de production';
    
    // Formater l'adresse seulement si elle existe
    let adresseSociete = '';
    if (societeProduction?.adresse) {
      adresseSociete = `sise ${societeProduction.adresse} ${societeProduction.adresseCodePostal || ''} ${societeProduction.adresseCodeCommune || ''}`;
    }
    
    blocs.push([
      {
        content: `Vu la demande n° ${dossier.id} présentée sur la plateforme pour la commission du ${frenchDateText(dossier.commission.date)} - ${frenchDepartementName(dossier.commission.departement)} par la société ${nomSociete}, immatriculée ${societeProduction?.siret || 'non renseigné'}, pour l'emploi d'enfants dans le cadre du projet intitulé "${dossier.nom}" `,
        styles: {
          fontSize: 11,
          halign: "left",
        },
      },
    ]);
    blocs.push([
      {
        content: `Vu l'avis des membres de la commission départementale des enfants du spectacle réunis le ${frenchDateText(
          dossier.commission.date
        )}`,
        styles: {
          fontSize: 11,
          halign: "left",
        },
      },
    ]);
    blocs.push([
      {
        content: replaceVariables(contenus.CONSIDERANTS.contenu, variables),
        styles: {
          fontSize: 11,
          halign: "left",
        },
      },
    ]);
    blocs.push([
      {
        content: `DECIDE`,
        styles: {
          fontSize: 13,
          fontStyle: "bold",
          halign: "center",
        },
      },
    ]);
    blocs.push([
      {
        content: `ARTICLE 1`,
        styles: {
          fontSize: 13,
          fontStyle: "bold",
          halign: "left",
        },
      },
    ]);
    blocs.push([
      {
        content: `${nomSociete} est autorisée à engager dans le cadre du projet "${dossier.nom}", et selon les conditions définies dans la demande, les enfants suivants : `,
        styles: {
          fontSize: 11,
          halign: "left",
        },
      },
    ]);
    
    // Organiser les enfants par type de rôle comme dans generateFE
    const roles = _.uniq(
      dossier.enfants.map((e: Enfant) => {
        return e.typeEmploi;
      })
    );
    
    TYPES_EMPLOI.map((role) => {
      if (roles.indexOf(role.value) !== -1) {
        blocs.push([
          {
            content: typeEmploiLabel(role.value as TypeEmploi),
            styles: {
              fontSize: 13,
              fontStyle: "bold",
              halign: "left",
            },
          },
        ]);
        _.filter(dossier.enfants, { typeEmploi: role.value })
          .sort(function (a, b) {
            if ((a as Enfant).nom && (b as Enfant).nom && (a as Enfant).nom! < (b as Enfant).nom!) {
              return -1;
            }
            if ((a as Enfant).nom && (b as Enfant).nom && (a as Enfant).nom! > (b as Enfant).nom!) {
              return 1;
            }
            if ((a as Enfant).prenom && (b as Enfant).prenom && (a as Enfant).prenom! < (b as Enfant).prenom!) {
              return -1;
            }
            if ((a as Enfant).prenom && (b as Enfant).prenom && (a as Enfant).prenom! > (b as Enfant).prenom!) {
              return 1;
            }
            return 0;
          })
          .map((enfant) => {
            // Ensure enfant is treated as Enfant type
            const typedEnfant = enfant as Enfant;
            // Accès aux rémunérations de l'enfant de manière sécurisée
            // @ts-ignore - La propriété remuneration existe dans la DB mais n'est pas dans le type
            const remEnfant = typedEnfant.remuneration || [];
            
            // Calculer le total des rémunérations
            const totalRemuneration = dossier.source === 'FORM_EDS' 
              ? remEnfant.reduce((acc: any, cur: any) => cur.montant && cur.nombre ? acc + (cur.montant * cur.nombre) + (cur.totalDadr ? cur.totalDadr : 0) : acc, 0)
              : typedEnfant.remunerationTotale || 0;

            // Bloc séparé pour le nom de l'enfant en gras
            blocs.push([
              {
                content: `\n${typedEnfant.nom?.toUpperCase()} ${typedEnfant.prenom?.toUpperCase()}, ${birthDateToFrenchAge(
                  typedEnfant.dateNaissance || new Date()
                )}${
                  typedEnfant.nomPersonnage ? `, incarne ${typedEnfant.nomPersonnage}` : ""
                }`,
                styles: {
                  fontSize: 11,
                  halign: "left",
                  fontStyle: "bold",
                },
              },
            ]);
            
            // Bloc séparé pour les informations détaillées
            blocs.push([
              {
                content: `
• INFORMATIONS PERSONNELLES
${typedEnfant.adresseEnfant ? `  Domicile : ${typedEnfant.adresseEnfant}` : ""}
${typedEnfant.nomRepresentant1 ? `  Représentant légal 1 : ${typedEnfant.nomRepresentant1} ${typedEnfant.prenomRepresentant1}` : ""}
${typedEnfant.adresseRepresentant1 ? `    ${typedEnfant.adresseRepresentant1}` : ""}
${typedEnfant.nomRepresentant2 ? `  Représentant légal 2 : ${typedEnfant.nomRepresentant2} ${typedEnfant.prenomRepresentant2}` : ""}
${typedEnfant.adresseRepresentant2 ? `    ${typedEnfant.adresseRepresentant2}` : ""}

• CONDITIONS DE TRAVAIL
  Nombre de jours : ${typedEnfant.nombreJours || 'Non spécifié'}
${typedEnfant.periodeTravail ? `  Période : ${typedEnfant.periodeTravail}` : ""}
${typedEnfant.contexteTravail ? `  Contexte : ${typedEnfant.contexteTravail}` : ""}

• RÉMUNÉRATIONS
${dossier.source === 'FORM_EDS' ? 
  `  Rémunérations garanties :
${REMUNERATIONS[0]["Rémunérations garanties"]?.map((cat: any) => {
  let remFound = remEnfant.find((rem: any) => rem.natureCachet === cat.value)
  return remFound ? `    ${remFound.nombre} ${cat.label} : ${remFound.montant}€` : null
}).filter(Boolean).join('\n') || '    Aucune'}
  
  Rémunérations additionnelles :
${REMUNERATIONS[1]["Rémunérations additionnelles"]?.map((cat: any) => {
  let remFound = remEnfant.find((rem: any) => rem.natureCachet === cat.value)
  return remFound ? `    ${remFound.nombre} ${cat.label === 'Autre' ? remFound.autreNatureCachet : cat.label} : ${remFound.montant}€` : null
}).filter(Boolean).join('\n') || '    Aucune'}`
:
`  ${typedEnfant.nombreCachets} cachets de ${typedEnfant.montantCachet}€
${typedEnfant.remunerationsAdditionnelles ? `  Additionnelles : ${typedEnfant.remunerationsAdditionnelles}` : ""}`
}

  TOTAL : ${totalRemuneration}€
  Part CDC : ${typedEnfant.cdc || 0}%`,
                styles: {
                  fontSize: 10,
                  halign: "left",
                },
              },
            ]);
          });
      }
    });
  });

  autoTable(doc, {
    body: [
      [
        {
          content: `Paris, le ${frenchDateText(
            dossiers[0].commission.date
          )}`,
          styles: {
            fontSize: 11,
            halign: "right",
          },
        },
      ],
    ],
    margin: { top: 70 },
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content:
            "Service enfants du spectacle et agences de mannequins (ESAM) \nDépartement protection et insertion des jeunes (DPIJ) \nDRIEETS Ile de France \n21-23 rue Miollis - 75015 Paris",
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
    ],
    margin: { top: 70 },
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "\nDécision administrative \n\nEmploi des enfants du spectacle",
          styles: {
            fontSize: 18,
            halign: "center",
          },
        },
      ],
    ],
    margin: { top: 70 },
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: `\n${replaceVariables(contenus.TEXTES_LEGAUX.contenu, {
            ...variables,
            DECRET_DATE: getObjectDecret(dossiers[0].commission.departement || '')?.date || '',
            DECRET_NOM: getObjectDecret(dossiers[0].commission.departement || '')?.nom || '',
            DECRET_PREFET: getObjectDecret(dossiers[0].commission.departement || '')?.prefet || '',
            ARRETE_DALVAI: dossiers[0].commission.departement === "75" 
              ? "Vu l'arrêté interministériel du 13 décembre 2022 nommant Monsieur Jean-François DALVAI, directeur régional et interdépartemental adjoint de l'économie, de l'emploi, du travail et des solidarités d'Île-de-France, chargé des fonctions de directeur de l'unité départementale de Paris à compter du 16 janvier 2023;" 
              : ""
          })}`,
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [...blocs],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: contenus.ARTICLE_2.titre,
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "left",
          },
        },
      ],
      [
        {
          content: replaceVariables(contenus.ARTICLE_2.contenu, variables),
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
      [
        {
          content: `\n${contenus.ARTICLE_3.titre}`,
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "left",
          },
        },
      ],
      [
        {
          content: replaceVariables(contenus.ARTICLE_3.contenu, variables),
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
      [
        {
          content: `\n${contenus.ARTICLE_4.titre}`,
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "left",
          },
        },
      ],
      [
        {
          content: replaceVariables(contenus.ARTICLE_4.contenu, variables),
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: replaceVariables(contenus.SIGNATURE.contenu, variables),
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
    ],
    margin: { left: 120, top: 70 },
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: replaceVariables(contenus.RECOURS.contenu, {
            ...variables,
            RECOURS_TYPE: dossiers[0].commission.departement === "92"
              ? "gracieux auprès du préfet des Hauts-de-Seine"
              : "hiérarchique auprès du ministre du travail, de l'emploi et de l'insertion, Direction générale du travail, 39-43 quai André-Citroën 75902 Paris cedex 15",
            TRIBUNAL_ADMINISTRATIF: dossiers[0].commission.departement === "92"
              ? "Cergy 2-4, boulevard de l'Hautil"
              : "de Paris, 7 rue de Jouy -75181 Paris Cedex 04.",
            TELERECOURS_INFO: dossiers[0].commission.departement === "92"
              ? "Le tribunal administratif peut-être saisi par l'application informatique « Telerecours citoyens » accessible par le site internet www.telerecours.fr"
              : ""
          }),
          styles: {
            fontSize: 9,
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  // @ts-ignore - La méthode getNumberOfPages existe dans jsPDF mais TypeScript ne la reconnaît pas
  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    if (i === 1) {
      doc.setFontSize(15).setFont(undefined, "bold");
      doc.text("Direction Régionale et Interdépartementale", 85, 18);
      doc.text("de l'Economie, de l'Emploi, du Travail", 98, 25);
      doc.text("et des Solidarités d'Ile-de-France", 110, 32);
      const imgData = new Image();
      imgData.src = logoPrefet.src;
      doc.setFontSize(40);
      // @ts-ignore - La méthode addImage existe dans jsPDF mais TypeScript ne reconnaît pas tous les paramètres
      doc.addImage(imgData, "png", 15, 15, 50, 45);
    }
    doc.setFontSize(10);
    // @ts-ignore - La méthode text existe dans jsPDF mais TypeScript ne reconnaît pas tous les paramètres
    doc.text(
      "Page " + String(i) + " sur " + String(pageCount),
      220 - 20,
      317 - 30,
      null,
      null,
      "right"
    );
    doc.setFontSize(6);
    // @ts-ignore - La méthode text existe dans jsPDF mais TypeScript ne reconnaît pas tous les paramètres
    doc.text(
      "Direction Régionale et interdépartementale de l'Economie, de l'Emploi, du Travail et des solidarités (Drieets) d'Ile-de-France",
      60 - 20,
      317 - 30,
      null,
      null,
      "left"
    );
    // @ts-ignore - La méthode text existe dans jsPDF mais TypeScript ne reconnaît pas tous les paramètres
    doc.text(
      "Service enfants du spectacle et agences de mannequins (ESAM) ",
      90 - 20,
      320 - 30,
      null,
      null,
      "left"
    );
    // @ts-ignore - La méthode text existe dans jsPDF mais TypeScript ne reconnaît pas tous les paramètres
    doc.text(
      "21-23 rue Miollis - 75015 Paris ",
      110 - 20,
      323 - 30,
      null,
      null,
      "left"
    );
    // @ts-ignore - La méthode text existe dans jsPDF mais TypeScript ne reconnaît pas tous les paramètres
    doc.text(
      "https://idf.drieets.gouv.fr",
      115 - 20,
      326 - 30,
      null,
      null,
      "left"
    );
  }

  // Générer un nom de fichier adapté selon qu'il s'agit d'une décision individuelle ou complète
  const fileName = enfantId && dossiers[0].enfants.length > 0
    ? `DECISION_AUTORISATION_${dossiers[0].enfants[0]?.nom || 'ENFANT'}_${dossiers[0].enfants[0]?.prenom || 'PRENOM'}_${dossiers[0].nom.replaceAll(".", "_")}`
    : `DECISION_AUTORISATION_${dossiers[0].nom.replaceAll(".", "_")}`;
  
  return binary
    ? "data:application/pdf;base64," + btoa(doc.output())
    : doc.save(fileName);
};

export { generateDA };
