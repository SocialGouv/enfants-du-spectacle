import { jsPDF } from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import logoPrefet from "src/images/logo_prefet.png";
import { frenchDateText } from "src/lib/helpers";
import type { DossierData } from "src/lib/types";
import commissions from "src/pages/api/commissions";

const generateDA = (dossiers: DossierData[], binary = false) => {
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
    blocs.push([
      {
        content: `Vu la demande présentée le ${frenchDateText(
          dossier.dateDepot ??
            dossier.dateDerniereModification ??
            dossier.commission.date
        )} par la société ${dossier.societeProduction.raisonSociale}, sise ${
          dossier.societeProduction.adresse
        }  ${dossier.societeProduction.adresseCodePostal} ${
          dossier.societeProduction.adresseCodeCommune
        }, pour l'emploi d'enfants dans le cadre du projet intitulé "${
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
        content: `Considérant que la commission des enfants du spectacle, pour autoriser un mineur de moins de 16 ans à travailler dans une entreprise de spectacle, vérifie:
- L’absence de risque pour la santé, la sécurité et la moralité du mineur;
- Les conditions d’emploi et de rémunération du mineur; \n
Considérant qu’après analyse, le projet présenté respecte les conditions de travail et de rémunération;`,
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
        content: `La société ${dossier.societeProduction.raisonSociale} est autorisée à engager dans le cadre du projet "${dossier.nom}", et selon les conditions définies dans la demande, l’enfant : `,
        styles: {
          fontSize: 11,
          halign: "left",
        },
      },
    ]);
    dossier.enfants.map((enfant) => {
      blocs.push([
        {
          content: `${enfant.prenom} ${enfant.nom}, né le ${frenchDateText(
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
          }, Préfet de la région d’Ile-de-France`,
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
Vu la loi n° 82-213 du 2 mars 1982 relative aux droits et libertés des communes, des départements et des régions, modifiée ; \n
Vu la loi d'orientation n° 92-125 du 6 février 1992 modifiée relative à l'administration territoriale de la République, notamment ses articles 4 et 6 ; \n
Vu le décret n° 97-34 du 15 janvier 1997 relatif à la déconcentration des décisions administratives individuelles ; \n
Vu  le décret n° 2004-374 du 29 avril 2004 modifié relatif aux pouvoirs des préfets, à l'organisation et à l'action des services de l'État dans les régions et départements ; \n
Vu le décret n° 2009-360 du 31 mars 2009 relatif aux emplois de direction de l'administration territoriale de l'État ; \n
Vu le décret n°2010-146 du 16 février 2010 modifiant le décret n° 2004-374 du 29 avril 2004 relatif aux pouvoirs des préfets, à l’organisation et à l’action des services de l’État dans les régions et départements ; \n
Vu le décret n° 2020-1545 du 9 décembre 2020 relatif à l'organisation et aux missions des directions régionales de l'économie, de l'emploi, du travail et des solidarités, des directions départementales de l'emploi, du travail et des solidarités et des directions départementales de l'emploi, du travail, des solidarités et de la protection des populations ; \n
Vu le décret du ${
            getObjectDecret(dossiers[0].commission.departement)?.date
          } portant nomination de ${
            getObjectDecret(dossiers[0].commission.departement)?.nom
          } en qualité de ${
            getObjectDecret(dossiers[0].commission.departement)?.prefet
          } ; \n
Vu l’arrêté interministériel du 25 mars 2021 nommant Monsieur Gaëtan RUDANT, directeur régional et interdépartemental de l’économie, de l’emploi, du travail et des solidarités d’Ile-de-France à compter du 1er avril 2021 ; \n
${
  dossiers[0].commission.departement === "75"
    ? "Vu l’arrêté interministériel du 13 décembre 2022 nommant Monsieur Jean-François DALVAI, directeur régional et interdépartemental adjoint de l’économie, de l’emploi, du travail et des solidarités d’Île-de-France, chargé des fonctions de directeur de l’unité départementale de Paris à compter du 16 janvier 2023;"
    : ""
}`,
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
            "La rémunération totale comprend un ou plusieurs cachets de base et des rémunérations additionnelles éventuelles. Ces dernières seront déduites du montant total dans le cas où les prestations correspondantes n’auront pas été réalisées.",
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
      [
        {
          content: "\nARTICLE 3",
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
          content: "\nARTICLE 4",
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
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: `Fait à Aubervilliers, le : ${frenchDateText(
            dossiers[0].commission.date
          )}

Pour le préfet et par délégation
Sophie Bidon

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

  autoTable(doc, {
    body: [
      [
        {
          content: `Voies et délais de recours :
          Cette décision peut faire l’objet  dans un délai de deux mois à compter de sa notification:
          -  d’un recours ${
            dossiers[0].commission.departement === "92"
              ? "gracieux auprès du préfet des Hauts-de-Seine"
              : "hiérarchique auprès du ministre du travail, de l’emploi et de l’insertion, Direction générale du travail, 39-43 quai André-Citroën 75902 Paris cedex 15"
          };
          -  d’un recours contentieux auprès du tribunal administratif ${
            dossiers[0].commission.departement === "92"
              ? "Cergy 2-4, boulevard de l'Hautil"
              : "de Paris, 7 rue de Jouy -75181 Paris Cedex 04."
          }
          ${
            dossiers[0].commission.departement === "92"
              ? "Le tribunal administratif peut-être saisi par l’application informatique « Telerecours citoyens » accessible par le site internet www.telerecours.fr"
              : ""
          }`,
          styles: {
            fontSize: 9,
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    if (i === 1) {
      doc.setFontSize(15).setFont(undefined, "bold");
      doc.text("Direction Régionale et Interdépartementale", 85, 18);
      doc.text("de l’Economie, de l'Emploi, du Travail", 98, 25);
      doc.text("et des Solidarités d’Ile-de-France", 110, 32);
      const imgData = new Image();
      imgData.src = logoPrefet.src;
      doc.setFontSize(40);
      doc.addImage(imgData, "png", 15, 15, 50, 45);
    }
    doc.setFontSize(10);
    doc.text(
      "Page " + String(i) + " sur " + String(pageCount),
      220 - 20,
      317 - 30,
      null,
      null,
      "right"
    );
    doc.setFontSize(6);
    doc.text(
      "Direction Régionale et interdépartementale de l’Economie, de l'Emploi, du Travail et des solidarités (Drieets) d’Ile-de-France",
      60 - 20,
      317 - 30,
      null,
      null,
      "left"
    );
    doc.text(
      "19-21, rue Madeleine Vionnet  - 93300  Aubervilliers ",
      100 - 20,
      320 - 30,
      null,
      null,
      "left"
    );
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
