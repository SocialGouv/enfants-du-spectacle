import type { Enfant } from "@prisma/client";
import { jsPDF } from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import logoPrefet from "src/images/logo_prefet.png";
import { frenchDateText, getRemsByDossier } from "src/lib/helpers";
import type { DossierData } from "src/lib/types";
import { getAllContenusPdf, replaceVariables } from "src/lib/contenuPdf";
import commissions from "src/pages/api/commissions";

const generateDA = async (dossiers: DossierData[], binary = false) => {
  // Récupérer les contenus personnalisés pour le département
  const departement = dossiers[0].commission.departement || '75';
  console.log('🔍 DEBUG PDF - Département:', departement);
  const contenus = await getAllContenusPdf(departement);
  console.log('🔍 DEBUG PDF - Contenus récupérés:', {
    TEXTES_LEGAUX: contenus.TEXTES_LEGAUX.titre,
    CONSIDERANTS: contenus.CONSIDERANTS.titre,
    ARTICLE_2: contenus.ARTICLE_2.titre,
    ARTICLE_3: contenus.ARTICLE_3.titre,
    ARTICLE_4: contenus.ARTICLE_4.titre,
    SIGNATURE: contenus.SIGNATURE.titre,
    RECOURS: contenus.RECOURS.titre
  });
  
  // Variables pour remplacer dans les contenus
  const variables = {
    DATE_COMMISSION: frenchDateText(dossiers[0].commission.date)
  };
  // Debug data availability
  console.log("DEBUG DA: First dossier:", dossiers[0].id);
  console.log("DEBUG DA: Demandeur exists:", !!dossiers[0].demandeur);
  console.log("DEBUG DA: Demandeur societeProduction exists:", !!dossiers[0].demandeur?.societeProduction);
  console.log("DEBUG DA: Direct societeProduction exists:", !!dossiers[0].societeProduction);
  
  if (dossiers[0].demandeur?.societeProduction) {
    console.log("DEBUG DA: Demandeur societeProduction nom:", dossiers[0].demandeur.societeProduction.nom);
  } else {
    console.log("DEBUG DA: Demandeur societeProduction is not populated");
  }
  
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
    
    console.log(`Dossier ${dossier.id}: societeProduction:`, societeProduction);
    
    blocs.push([
      {
        content: `Vu la demande présentée le ${frenchDateText(
          dossier.dateDepot ??
            dossier.dateDerniereModification ??
            dossier.commission.date
        )} par ${nomSociete}, ${adresseSociete} pour l'emploi d'enfants dans le cadre du projet intitulé "${
          dossier.nom
        }" `,
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
        content: `${nomSociete} est autorisée à engager dans le cadre du projet "${dossier.nom}", et selon les conditions définies dans la demande, l'enfant : `,
        styles: {
          fontSize: 11,
          halign: "left",
        },
      },
    ]);
    dossier.enfants.map((enfant) => {
      // Ensure enfant is treated as Enfant type
      const typedEnfant = enfant as Enfant;
      // Accès aux rémunérations de l'enfant de manière sécurisée
      // @ts-ignore - La propriété remuneration existe dans la DB mais n'est pas dans le type
      const remEnfant = typedEnfant.remuneration || [];
      console.log(`Rémunérations pour l'enfant ${typedEnfant.id} dans DA:`, remEnfant);
      blocs.push([
        {
          content: `${typedEnfant.prenom || ''} ${typedEnfant.nom || ''}, né le ${frenchDateText(
            typedEnfant.dateNaissance || new Date()
          )}, pour une rémunération totale de ${dossier.source === 'FORM_EDS' ? remEnfant.reduce((acc: number, cur: any) => cur.montant && cur.nombre ? acc + (cur.montant * cur.nombre) + (cur.totalDadr ? cur.totalDadr : 0) : acc, 0) : typedEnfant.remunerationTotale || 0} €, ${
            typedEnfant.cdc ? typedEnfant.cdc : 0
          }% de cette somme devant être versés à la Caisse des dépôts et consignations;`,
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ]);
    });
  });

  autoTable(doc, {
    body: [
      [
        {
          content: `Aubervilliers, le ${frenchDateText(
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
            "Service des enfants du spectacle \nDépartement protection et insertion des jeunes \nDirection de l'emploi, des entreprises et des solidarités \nUnité départementale de Paris de la DRIEETS",
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
          content: "\nDécision de la commission des enfants du spectacle",
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
          content: `\nLe Préfet ${
            dossiers[0].commission.departement === "92"
              ? "des Hauts-de-Seine"
              : "de Paris"
          }, Préfet de la région d'Ile-de-France`,
          styles: {
            fontSize: 13,
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
      "19-21, rue Madeleine Vionnet  - 93300  Aubervilliers ",
      100 - 20,
      320 - 30,
      null,
      null,
      "left"
    );
    // @ts-ignore - La méthode text existe dans jsPDF mais TypeScript ne reconnaît pas tous les paramètres
    doc.text(
      "www.travail-emploi.gouv.fr – www.economie.gouv.fr - www.idf.direccte.gouv.fr",
      90 - 20,
      323 - 30,
      null,
      null,
      "left"
    );
  }

  return binary
    ? "data:application/pdf;base64," + btoa(doc.output())
    : doc.save("Décision_autorisation_" + dossiers[0].nom.replaceAll(".", "_"));
};

export { generateDA };
