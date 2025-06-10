import type { CategorieDossier, Enfant, TypeEmploi } from "@prisma/client";
import { jsPDF } from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import _ from "lodash";
import logoPrefet from "src/images/logo_prefet.png";
import {
  categorieToGrandeCategorieLabel,
  categorieToLabel,
} from "src/lib/categories";
import {
  birthDateToFrenchAge,
  frenchDateText,
  frenchDepartementName,
  getRemunerations,
  REMUNERATIONS,
  STATUS_ODJ,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import type { CommissionData, DossierData } from "src/lib/types";

const generateOdj = async (commission: CommissionData) => {
  let rems = await getRemunerations(commission)
  const doc = new jsPDF();
  const categories = _.uniq(
    _.filter(commission.dossiers, (dossier: DossierData) => {
      return STATUS_ODJ.includes(dossier.statut);
    }).map((d: DossierData) => {
      return categorieToGrandeCategorieLabel(d.categorie);
    })
  );

  const blocs: RowInput[] = [];

  if (categories.length > 0) {
    categories.map((categorie: CategorieDossier) => {
      blocs.push([
        {
          content: ` \n CATÉGORIE : ${categorie}`,
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "center",
          },
        },
      ]);
      _.filter(commission.dossiers, (dossier: DossierData) => {
        return (
          categorieToGrandeCategorieLabel(dossier.categorie) === categorie &&
          STATUS_ODJ.includes(dossier.statut)
        );
      }).map((dossier: DossierData) => {
        blocs.push([
          {
            content: `\n\nSOCIETE : ${dossier.demandeur?.societeProduction?.nom || dossier.societeProduction?.nom || "N/A"}  - ${
              dossier.demandeur?.societeProduction?.adresse || dossier.societeProduction?.adresse || ""
            } ${dossier.demandeur?.societeProduction?.adresseCodePostal || dossier.societeProduction?.adresseCodePostal || ""} ${
              dossier.demandeur?.societeProduction?.adresseCodeCommune || dossier.societeProduction?.adresseCodeCommune || ""
            } \nPROJET : ${dossier.nom || "Sans nom"} - du ${frenchDateText(
              dossier.dateDebut || new Date()
            )} au ${frenchDateText(
              dossier.dateFin || new Date()
            )} \nTYPE DE PROJET : ${categorieToLabel(dossier.categorie || "AUTRE")} 
              `,
            styles: {
              fontSize: 13,
              fontStyle: "bold",
              halign: "left",
            },
          },
        ]);
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
            const enfantsWithRole = dossier.enfants.filter(
              (e) => e.typeEmploi === role.value
            );
            
            enfantsWithRole
              .sort((a, b) => {
                const aNom = (a.nom || '');
                const bNom = (b.nom || '');
                const aPrenom = (a.prenom || '');
                const bPrenom = (b.prenom || '');
                
                if (aNom < bNom) return -1;
                if (aNom > bNom) return 1;
                if (aPrenom < bPrenom) return -1;
                if (aPrenom > bPrenom) return 1;
                return 0;
              })
              .forEach((enfant) => {
                // Accès aux rémunérations de l'enfant de manière sécurisée
                // @ts-ignore - La propriété remuneration existe dans la DB mais n'est pas dans le type
                const remEnfant = enfant.remuneration || [];
                blocs.push([
                  {
                    content: `${enfant.nom.toUpperCase()} ${enfant.prenom.toUpperCase()}, ${birthDateToFrenchAge(
                      enfant.dateNaissance
                    )} ${
                      enfant.nomPersonnage
                        ? ", incarne " + enfant.nomPersonnage
                        : ""
                    }
  ${enfant.nombreJours} jours travaillés
  ${enfant.periodeTravail ? `Période: ${enfant.periodeTravail}` : ""}
  ${dossier.source === 'FORM_EDS' ? 
    `Rémunérations garanties : ${REMUNERATIONS[0]["Rémunérations garanties"]?.map((cat) => {
      let remFound = remEnfant.find(rem => rem.natureCachet === cat.value)
      return remFound ? `${remFound.nombre} '${cat.label}' de ${remFound.montant} Euros, ${remFound.totalDadr ? `Montant total DADR : ${remFound.totalDadr} Euros, ` : ''}` : ''
    }).join(' ')}
  Rémunérations additionnelles : ${REMUNERATIONS[1]["Rémunérations additionnelles"]?.map((cat) => {
      let remFound = remEnfant.find(rem => rem.natureCachet === cat.value)
      return remFound ? `${remFound.nombre} '${cat.label === 'Autre' ? remFound.autreNatureCachet : cat.label}' de ${remFound.montant} Euros` : ''
    }).join(' ')}
  TOTAL : ${remEnfant.reduce((acc, cur) => cur.montant && cur.nombre ? acc + (cur.montant * cur.nombre) + (cur.totalDadr ? cur.totalDadr : 0) : acc, 0)} Euros`
    :
    `${enfant.nombreCachets} cachets de ${enfant.montantCachet} Euros ${
      enfant.remunerationsAdditionnelles
        ? `\n  Rémunérations additionnelles : ${enfant.remunerationsAdditionnelles}`
        : ""
    }
    TOTAL : ${enfant.remunerationTotale} Euros`
  }
  Part CDC : ${enfant.cdc ? enfant.cdc : "0"}%`,
                    styles: {
                      fontSize: 11,
                      halign: "left",
                    },
                  },
                ]);
              });
          }
        });
      });
    });
  }

  autoTable(doc, {
    body: [
      [
        {
          content:
            "Ordre du jour de la commission des enfants du spectacle" +
            "\n" +
            frenchDateText(commission.date) +
            " - " +
            frenchDepartementName(commission.departement),
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
    body: [...blocs],
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
      210 - 20,
      317 - 30,
      null,
      null,
      "right"
    );
  }

  return doc.save(
    "Ordre du jour commission " +
      frenchDateText(commission.date) +
      " - " +
      frenchDepartementName(commission.departement)
  );
};

export { generateOdj };
