import { Comments, Demandeur, Enfant, SocieteProduction } from "@prisma/client";
import React, { useContext } from "react";
import { DossierData, EnfantData, ResDocs, updateDossier } from "../../fetching/dossiers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./DossierForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import DemandeurForm from "./DemandeurForm";
import ProjectForm from "./ProjectForm";
import EnfantList from "./EnfantList";
import { updateDemandeur } from "src/fetching/demandeur";
import { CHECKS, useDebouncedCallback } from "src/lib/helpers";
import Image from "next/image";
import { sendDossier } from "src/fetching/sync";
import IconLoader from "../IconLoader";
import useStateContext from "src/context/StateContext";
import { updateCommentairesNotifications } from "src/fetching/commentaires";
import { sendEmail } from "src/fetching/email";
import EnfantListBis from "./EnfantListBis";
import { getEnfantsByDossierId } from "src/fetching/enfant";

interface Props {
  dossier: DossierData;
  docs: ResDocs;
  comments: Comments[];
}

const DossierForm: React.FC<Props> = ({ dossier, docs, comments }) => {
  const router = useRouter();

  const [toDisplay, setTodisplay] = React.useState<
    "Demandeur" | "Projet" | "Enfants" 
  >("Demandeur");
  const [messageError, setMessageError] = React.useState<string>("");
  const [messageSuccess, setMessageSuccess] = React.useState<string>("");
  const contextDossier = { ...useStateContext() };

  const saveDossier = useDebouncedCallback(() => {
    console.log("saving dossier ... : ", contextDossier.dossier);
    updateDossier(contextDossier.dossier);
  }, 1000);

  const saveDemandeur = useDebouncedCallback(() => {
    console.log("saving demandeur ... : ", contextDossier.demandeur);
    updateDemandeur(contextDossier.demandeur);
  }, 1000);

  React.useEffect(() => {
    saveDossier();
  }, [contextDossier.dossier]);

  React.useEffect(() => {
    saveDemandeur();
  }, [contextDossier.demandeur]);

  const processChecks: () => Promise<boolean> = async () => {
    let verif = true;
    setMessageError("");

    await Promise.all(CHECKS.map(async (entity) => {
      console.log('entity : ', entity.entity)
      switch (entity.entity) {
        case "Demandeur":
          entity.mandatory_fields.map((field) => {
            if (
              !contextDossier.demandeur[field.code as keyof Demandeur] ||
              contextDossier.demandeur[field.code as keyof Demandeur] === ""
            ) {
              setTodisplay(entity.entity as "Demandeur" | "Projet" | "Enfants");
              setMessageError(
                `Le champ '${field.label}' est necessaire sur l'onglet Demandeur`
              );
              verif = false;
            }
          });
          if (!contextDossier.societeProduction.id) {
            setTodisplay(entity.entity as "Demandeur" | "Projet" | "Enfants");
            setMessageError(
              `Le champ 'Société Production (SIRET)' est necessaire sur l'onglet Demandeur`
            );
            verif = false;
          }
          if (
            contextDossier.demandeur.conventionCollectiveCode === "0000" &&
            !contextDossier.demandeur.otherConventionCollective
          ) {
            setTodisplay(entity.entity as "Demandeur" | "Projet" | "Enfants");
            setMessageError(
              `Le champ 'Nom de la convention' est necessaire sur l'onglet Demandeur`
            );
            verif = false;
          }
          if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              contextDossier.demandeur.email ?? ""
            )
          ) {
            setTodisplay(entity.entity as "Demandeur" | "Projet" | "Enfants");
            setMessageError(
              `Le champ 'Email' est incorrect sur l'onglet Demandeur`
            );
            verif = false;
          }
          break;
        case "Projet":
          entity.mandatory_fields.map((field) => {
            if (
              !contextDossier.dossier[field.code as keyof DossierData] ||
              contextDossier.dossier[field.code as keyof DossierData] === ""
            ) {
              setTodisplay(entity.entity as "Demandeur" | "Projet" | "Enfants");
              setMessageError(
                `Le champ '${field.label}' est necessaire sur l'onglet Projet`
              );
              verif = false;
            }
          });
          break;
        case "Enfants":
          console.log('in enfant')
          const enfantsFetched = await getEnfantsByDossierId(contextDossier.dossier.id, 0, 250, 'nom', 'asc')
          console.log('fetch : ', enfantsFetched.enfants)
          enfantsFetched.enfants.map((enfant) => {
            console.log('for enfant : ', enfant.nom + ' ' + enfant.prenom)
            entity.mandatory_fields.map((field) => {
              console.log('checking field : ', field.code)
              if (
                !enfant[field.code as keyof Enfant] ||
                enfant[field.code as keyof Enfant] === ""
              ) {
                setTodisplay(
                  entity.entity as "Demandeur" | "Projet" | "Enfants"
                );
                setMessageError(
                  `Le champ '${field.label}' est necessaire pour l'enfant ${enfant.nom} ${enfant.prenom}`
                );
                verif = false;
              }
            });
          });
          break;
        default:
          return false;
      }
    }));

    console.log("verif: ", verif);
    setMessageSuccess("");
    return verif;
  };

  const handleDepotDossier = async () => {
    console.log("trying depot : ", contextDossier);
    setMessageSuccess(
      "Vérification du dossier en cours ..."
    );
    if (await processChecks()) {
      setMessageSuccess(
        "Votre dossier est en cours d'envoi aux services d'instructions"
      );

      const dossierSent = await sendDossier(
        contextDossier.dossier,
        contextDossier.demandeur,
        contextDossier.societeProduction,
        (await getEnfantsByDossierId(contextDossier.dossier.id, 0, 250, 'nom', 'asc')).enfants
      );
      if (!dossierSent.error) {
        if (contextDossier.dossier.statut === "BROUILLON") {
          contextDossier.processInput("dossier", "statut", "CONSTRUCTION");
        }
        setMessageSuccess(
          `Votre dossier a bien été ${
            contextDossier.dossier.statut === "BROUILLON"
              ? "envoyé"
              : "mis à jour"
          }`
        );

        contextDossier.processInput(
          "dossier",
          "commissionString",
          dossierSent.message.message
        );

        sendEmail(
          contextDossier.dossier.statut === "BROUILLON"
            ? "depot_dossier"
            : "update_dossier",
          "",
          contextDossier.dossier,
          contextDossier.demandeur.email?.toString()
        );

        setTimeout(() => {
          router.push(`/`);
        }, 1000);
      } else {
        setMessageSuccess("");
        setMessageError("Erreur lors de l'envoi du dossier...");
      }
    }
  };

  React.useEffect(() => {
    contextDossier.processEntity("dossier", dossier);
    contextDossier.processEntity("demandeur", dossier.Demandeur);
    contextDossier.processEntity(
      "societeProduction",
      dossier.Demandeur.societeProduction ?? {}
    );
    contextDossier.processEntity("enfants", dossier.enfants);
    contextDossier.processEntity("docs", docs);
    contextDossier.processEntity("comments", comments);
  }, []);

  React.useEffect(() => {
    console.log("comments : ", contextDossier.comments);
  }, [contextDossier.comments]);

  return (
    <div className={styles.dossierForm}>
      <div className={styles.menuDossier} id="menu-dossier">
        <ButtonLink
          light={toDisplay !== "Demandeur"}
          onClick={() => setTodisplay("Demandeur")}
        >
          Demandeur
        </ButtonLink>
        <ButtonLink
          light={toDisplay !== "Projet"}
          onClick={() => {
            if (comments.length) {
              const commentsProjectIds = comments
                .filter(
                  (comment) =>
                    comment.source === "INSTRUCTEUR" &&
                    comment.enfantId === null
                )
                .map((c) => JSON.stringify(c.id));
              if (commentsProjectIds.length)
                updateCommentairesNotifications(commentsProjectIds);
            }
            setTodisplay("Projet");
          }}
        >
          Projet
        </ButtonLink>
        <ButtonLink
          light={toDisplay !== "Enfants"}
          onClick={() => setTodisplay("Enfants")}
        >
          Enfants
        </ButtonLink>
      </div>

      <div className={styles.infosRow}>
        <div className={styles.infoImage}>
          <Image
            src={`/images/info.svg`}
            alt="Supprimer"
            width={20}
            height={20}
          />
        </div>
        <div className={styles.infoText}>
          <p>
            Les champs suivis d’un astérisque ( * ) sont obligatoires. Votre
            dossier est enregistré automatiquement après chaque modification.
            Vous pouvez à tout moment fermer la fenêtre et reprendre plus tard
            là où vous en étiez.
          </p>
        </div>
      </div>

      {messageError !== "" && (
        <div className={styles.messageError}>{messageError}</div>
      )}

      {messageSuccess !== "" && (
        <div className={styles.messageSuccess}>
          <IconLoader></IconLoader>
          {messageSuccess}
        </div>
      )}

      <div className={styles.divForm}>
        {toDisplay === "Demandeur" && (
          <DemandeurForm
            allowChanges={
              dossier.statut === "BROUILLON" ||
              dossier.statut === "CONSTRUCTION"
            }
          ></DemandeurForm>
        )}

        {toDisplay === "Projet" && (
          <ProjectForm
            allowChanges={
              dossier.statut === "BROUILLON" ||
              dossier.statut === "CONSTRUCTION"
            }
          ></ProjectForm>
        )}

        {toDisplay === "Enfants" && (
          <>
            <EnfantListBis
              allowChanges={
                dossier.statut === "BROUILLON" ||
                dossier.statut === "CONSTRUCTION"
              }
            ></EnfantListBis>
          </>
        )}

        {(dossier.statut === "BROUILLON" ||
          dossier.statut === "CONSTRUCTION") && (
          <div className={styles.saveBar}>
            <div className={styles.textSaveBar}>
              <p>
                Votre dossier est automatiquement enregistré sur votre interface. <br />
                Le bouton “Déposer” vous permet de transmettre votre dossier aux services d’instruction de la DRIEETS avant la date limite de dépôt et de transmettre toutes les mises à jour que vous seriez amené à faire par la suite. <br />
                Merci de cliquer sur “Déposer” dès lors que vous souhaitez transmettre des mises à jour de votre dossier aux services d’instruction.
              </p>
            </div>
            <div className={styles.buttonSaveBar}>
              <ButtonLink
                href={`#menu-dossier`}
                onClick={async () => {
                  handleDepotDossier();
                }}
              >
                Déposer
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DossierForm;
