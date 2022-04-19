import { jsPDF } from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import logoPrefet from "src/images/logo_prefet.png";
import { birthDateToFrenchAge, frenchDateText } from "src/lib/helpers";
import type { DossierData } from "src/lib/types";

const generateDA = (dossiers: DossierData[]) => {
  const doc = new jsPDF();
  const blocs: RowInput[] = [];

  dossiers.map((dossier: DossierData) => {
    blocs.push([
      {
        content: `Vu la demande présentée le ${frenchDateText(
          dossier.commission.date
        )} par la société ${dossier.societeProduction.nom}, sise ${
          dossier.societeProduction.siren
        }, pour l'emploi d'enfants dans le cadre du projet intitulé ${
          dossier.nom
        } `,
        styles: {
          fontSize: 11,
          halign: "left",
        },
      },
    ]);
    blocs.push([
      {
        content: `Vu l’avis des membres de la commission départementale des enfants du spectacle réunis le ${frenchDateText(
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
        content: `La société ${dossier.societeProduction.nom} est autorisée à engager dans le cadre du projet ${dossier.nom}, et selon les conditions définies dans la demande, l’enfant : `,
        styles: {
          fontSize: 11,
          halign: "left",
        },
      },
    ]);
    dossier.enfants.map((enfant) => {
      blocs.push([
        {
          content: `${enfant.prenom} ${
            enfant.nom
          }, né le ${birthDateToFrenchAge(
            enfant.dateNaissance
          )}, pour une rémunération totale de ${enfant.remunerationTotale} €, ${
            enfant.cdc ? enfant.cdc : 0
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
          content:
            "Service des enfants du spectacle \nDépartement protection et insertion des jeunes \nDirection de l’emploi, des entreprises et des solidarités \nUnité départementale de Paris de la DRIEETS",
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
          content: "\nLe Préfet de Paris, Préfet de la région d’Ile-de-France",
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
          content: `\nVu les articles L7124-1 à L7124-35 et R7124-1 à R7124-35 du code du travail ;\n
Vu la loi n° 82-213 du 2 mars 1982 relative aux droits et libertés des communes, des départements et des régions, modifiée ; 
Vu la loi d'orientation n° 92-125 du 6 février 1992 modifiée relative à l'administration territoriale de la République, notamment ses articles 4 et 6 ; 
Vu le décret n° 97-34 du 15 janvier 1997 relatif à la déconcentration des décisions administratives individuelles ;
Vu  le décret n° 2004-374 du 29 avril 2004 modifié relatif aux pouvoirs des préfets, à l'organisation et à l'action des services de l'État dans les régions et départements ;
Vu le décret n° 2009-360 du 31 mars 2009 relatif aux emplois de direction de l'administration territoriale de l'État ;
Vu le décret n°2010-146 du 16 février 2010 modifiant le décret n° 2004-374 du 29 avril 2004 relatif aux pouvoirs des préfets, à l’organisation et à l’action des services de l’État dans les régions et départements ; 
Vu le décret n° 2020-1545 du 9 décembre 2020 relatif à l'organisation et aux missions des directions régionales de l'économie, de l'emploi, du travail et des solidarités, des directions départementales de l'emploi, du travail et des solidarités et des directions départementales de l'emploi, du travail, des solidarités et de la protection des populations ; 
Vu le décret du 22 juillet 2020 portant nomination de Monsieur Marc GUILLAUME en qualité de Préfet de Paris ;
Vu l’arrêté interministériel du 25 mars 2021 nommant Monsieur Gaëtan RUDANT, directeur régional et interdépartemental de l’économie, de l’emploi, du travail et des solidarités d’Ile-de-France à compter du 1er avril 2021 ;
Vu l’arrêté préfectoral n° 75-2021-03-31-00003 du 31 mars 2021 par lequel le Préfet de Paris délègue sa signature à Monsieur Gaëtan RUDANT, directeur régional et interdépartemental de l’économie, de l’emploi, du travail et des solidarités d’Île-de-France; `,
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
    body: [...blocs],
    margin: { top: 70 },
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "ARTICLE 2",
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "left",
          },
        },
      ],
      [
        {
          content:
            "Le versement à la Caisse des dépôts et consignations est accompagné d'une déclaration de l'employeur rappelant l'état civil de l'enfant, son domicile et le nom de ses représentants légaux.",
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
      [
        {
          content: "ARTICLE 3",
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "left",
          },
        },
      ],
      [
        {
          content: `La durée quotidienne de travail ne peut excéder :

Pour les enfants de moins de 3 ans: 1h/jour avec pause obligatoire après 30 minutes de temps de travail.

Pour les enfants de 3 à 5 ans: 2h/jour avec pause obligatoire après 1h00 de temps de travail.

Pour les enfants de 6 à 11 ans :
En période scolaire : 3h/jour avec pause obligatoire après 1h30 de temps de travail ;
En période de vacances scolaires : 4h/jour avec pause obligatoire après 2h00 de temps de travail;

Pour les enfants de 12 à 16 ans:
En période scolaire: 4h/jour avec pause obligatoire après 2h00 de temps de travail
En période de vacances scolaires: 6h/jour avec pause obligatoire après 3h00 de temps de travail.`,
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
          content: `Fait à Aubervilliers, le : ${frenchDateText(new Date())}

Pour le préfet et par la délégation

Patricia RENUCCI 
Responsable du département protection et insertion des jeunes`,
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

  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 0; i < pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(15).setFont(undefined, "bold");
    doc.text("Direction Régionale et Interdépartementale", 85, 18);
    doc.text("de l’Economie, de l'Emploi, du Travail", 98, 25);
    doc.text("et des Solidarités d’Ile-de-France", 110, 32);
    const imgData = new Image();
    imgData.src = logoPrefet.src;
    doc.setFontSize(40);
    doc.addImage(imgData, "png", 15, 15, 50, 45);
  }

  return doc.save("Décision autorisation " + dossiers[0].nom);
};

export { generateDA };
