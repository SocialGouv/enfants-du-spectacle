import { Select, Title } from "@dataesr/react-dsfr";
import type { User } from "@prisma/client";
import React from "react";
import ChangeStatutDossierButton from "src/components/ChangeStatutDossierButton";
import styles from "src/components/Dossier.module.scss";
import Enfant from "src/components/Enfant";
import Info from "src/components/Info";
import { JustificatifsDossier } from "src/components/Justificatifs";
import {
  categorieToGrandeCategorieLabel,
  categorieToLabel,
} from "src/lib/categories";
import {
  frenchDateText,
  frenchDepartementName,
  shortUserName,
} from "src/lib/helpers";
import type { DossierData } from "src/lib/types";

interface Props {
  dossier: DossierData;
  assignedUserId: number | null;
  onAssignUserId: (userId: number | null) => void;
  onChangeStatut: (statut: string) => void;
  allUsers: User[];
}

const Dossier: React.FC<Props> = ({
  dossier,
  assignedUserId,
  onChangeStatut,
  onAssignUserId,
  allUsers,
}) => {
  return (
    <>
      <div className={styles.title}>
        <Title as="h1">Le Dossier</Title>
        <ChangeStatutDossierButton
          dossier={dossier}
          onChange={onChangeStatut}
        />
      </div>

      <div className={styles.summaryBloc}>
        <div>
          <Info title="Suivi par" className={styles.infoSelect}>
            <Select
              selected={assignedUserId ? String(assignedUserId) : ""}
              options={[{ label: "", value: "" }].concat(
                allUsers.map((u) => ({
                  label: shortUserName(u),
                  value: String(u.id),
                }))
              )}
              onChange={(event) => {
                const userId = event.target.value;
                onAssignUserId(userId ? Number(userId) : null);
              }}
              className={styles.agentSelect}
            />
          </Info>
          <Info title="Commission" className={styles.infoSuccessive}>
            {frenchDateText(dossier.commission.date)} -{" "}
            {frenchDepartementName(dossier.commission.departement)}
          </Info>
          <Info title="Type de dossier" className={styles.infoSuccessive}>
            {categorieToLabel(dossier.categorie)} (
            {categorieToGrandeCategorieLabel(dossier.categorie)})
          </Info>
        </div>
        <div>
          <Info title="Société">
            <div>{dossier.societeProduction.nom}</div>
            <div>{dossier.societeProduction.departement}</div>
            <div>{dossier.societeProduction.siret}</div>
          </Info>
          <Info title="Demandeur" className={styles.infoSuccessive}>
            <div>
              {dossier.demandeur.prenom} {dossier.demandeur.nom}
            </div>
            <div>
              <a href={`mailto:${dossier.demandeur.email}`}>
                ✉️ {dossier.demandeur.email}
              </a>
            </div>
            <div>
              <a href={`tel:${dossier.demandeur.phone}`}>
                📞 {dossier.demandeur.phone}
              </a>
            </div>
          </Info>
        </div>
        <Info title="Pièces justificatives">
          <JustificatifsDossier dossier={dossier} />
        </Info>
      </div>

      {/* <div className={styles.bloc}> */}
      <Title as="h3">Enfants</Title>
      {dossier.enfants.length == 0 && <span>Aucun enfant</span>}
      {dossier.enfants.map((enfant) => (
        <div key={enfant.id} className={styles.bloc}>
          <Enfant enfant={enfant} />
        </div>
      ))}
    </>
  );
};

export default Dossier;
