import { Icon } from "@dataesr/react-dsfr";
import type { Demandeur, Dossier } from "@prisma/client";
import React, { useState } from "react";
import StatutDossierTag from "src/components/StatutDossierTag";
import {
  generateAndUploadDA,
  generateAndUploadDAForEnfant,
} from "src/lib/pdf/pdfGenerateAndUploadDA";
import type { DossierData } from "src/lib/queries";
import { sendEmail, updateDossier } from "src/lib/queries";
import { getParentEmailsForEnfant } from "src/lib/helpers";
import {
  factory as statutDossierFSMFactory,
  statutDossierEventToFrench,
  statutDossierEventToFrenchDescription,
  statutDossierEventToIcon,
} from "src/lib/statutDossierStateMachine";
import { useSWRConfig } from "swr";

import styles from "./ChangeStatutDossierButton.module.scss";

interface Props {
  dossier: Dossier;
  demandeur: Demandeur;
}

const ChangeStatutDossierButton: React.FC<Props> = ({ dossier, demandeur }) => {
  const { mutate } = useSWRConfig();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const statutDossierFSM = statutDossierFSMFactory(dossier.statut as string);
  const className = statutDossierFSM.stateClassName();

  if (statutDossierFSM.transitionObjects().length == 0) {
    return <StatutDossierTag dossier={dossier} size="lg" />;
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.currentStatut} ${className} ${
          statutDossierFSM.stateLabel() === "Prêt"
            ? styles.btnReadyBackground
            : styles.btnPendingBackground
        }`}
        onClick={() => {
          setDropdownVisible(!dropdownVisible);
        }}
      >
        {statutDossierFSM.stateLabel()}{" "}
        <Icon className={`${styles.chevron} ri-arrow-down-s-fill`} />
      </button>
      <div
        className={styles.dropdown}
        style={{ visibility: dropdownVisible ? "visible" : "hidden" }}
      >
        {statutDossierFSM.transitionObjects().map((transition) => (
          <button
            key={transition.name}
            className={styles.row}
            onClick={async () => {
              setDropdownVisible(false);
              const transitionEvent = transition.name;
              mutate(
                `/api/dossiers/${dossier.id}`,
                { ...dossier, statut: transition.to },
                false
              ).catch((e) => {
                throw e;
              });
              updateDossier(dossier, { transitionEvent }, () => {
                mutate(`/api/dossiers/${dossier.id}`).catch((e) => {
                  throw e;
                });
              });
              if (transition.name === "passerAccepte") {
                // Email au demandeur avec décision complète
                const result = await generateAndUploadDA(
                  [dossier as DossierData],
                  true
                );
                
                sendEmail(
                  "auth_access",
                  result.pdfBase64 as string,
                  dossier,
                  demandeur.email || undefined
                );

                // Générer les décisions individuelles et envoyer aux parents
                const dossierData = dossier as DossierData;

                if (dossierData.enfants && dossierData.enfants.length > 0) {
                  for (const enfant of dossierData.enfants) {
                    try {
                      // Générer et sauvegarder la décision individuelle (toujours)
                      const individualResult =
                        await generateAndUploadDAForEnfant(
                          dossierData,
                          enfant.id
                        );

                      // Envoyer aux parents seulement s'ils ont des emails valides
                      const parentEmails = getParentEmailsForEnfant(enfant);

                      if (parentEmails.length > 0) {
                        parentEmails.forEach((parentEmail) => {
                          sendEmail(
                            "parent_notification",
                            individualResult.pdfBase64,
                            dossier,
                            parentEmail,
                            "",
                            { enfantName: `${enfant.prenom} ${enfant.nom}` }
                          );
                        });
                      }
                    } catch (error) {
                      console.error(`Erreur lors de la génération de la décision pour l'enfant ${enfant.id}:`, error);
                    }
                  }
                }
              } else {
                sendEmail(
                  "status_changed",
                  "",
                  dossier,
                  demandeur.email || undefined,
                  transition.to
                );
              }
            }}
          >
            <span role="img" className={styles.icon} aria-label="test">
              <Icon
                className={statutDossierEventToIcon(transition.name)}
                size="2x"
              />
            </span>
            <div>
              <p className={styles.event}>
                {statutDossierEventToFrench(transition.name)}
              </p>
              <p className={styles.description}>
                {statutDossierEventToFrenchDescription(transition.name)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChangeStatutDossierButton;
