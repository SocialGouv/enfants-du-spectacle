import { Select, Table, Title } from "@dataesr/react-dsfr";
import React from "react";
import ChangeStatutDossierButton from "src/components/ChangeStatutDossierButton";
import styles from "src/components/Dossier.module.scss";
import {
  categorieToGrandeCategorieLabel,
  categorieToLabel,
} from "src/lib/categories";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import type { DossierData } from "src/lib/types";

import type { User } from ".prisma/client";

interface InfoProps {
  title: string;
}

const Info: React.FC<InfoProps> = ({ title, children }) => {
  return (
    <div className={styles.info}>
      <div className={styles.infoTitle}>{title}</div>
      <div className={styles.infoContent}>{children}</div>
    </div>
  );
};

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
          <Info title="Suivi par">
            <Select
              selected={assignedUserId ? String(assignedUserId) : ""}
              options={[{ label: "", value: "" }].concat(
                allUsers.map((u) => ({
                  label: u.email ?? "",
                  value: String(u.id),
                }))
              )}
              onChange={(event) => {
                const userId = event.target.value;
                onAssignUserId(userId ? Number(userId) : null);
              }}
            />
          </Info>
          <Info title="Commission">
            {frenchDateText(dossier.commission.date)} -{" "}
            {frenchDepartementName(dossier.commission.departement)}
          </Info>
        </div>
        <Info title="Type de dossier">
          {categorieToGrandeCategorieLabel(dossier.categorie)}
          <br />
          {categorieToLabel(dossier.categorie)}
        </Info>
        <Info title="Société">
          <div>{dossier.societeProduction.nom}</div>
          <div>{dossier.societeProduction.departement}</div>
          <div>{dossier.societeProduction.siret}</div>
        </Info>
      </div>

      <div className={styles.bloc}>
        <Title as="h3">Enfants</Title>
        {dossier.enfants.length == 0 && <span>Aucun enfant</span>}
        {dossier.enfants.length > 0 && (
          <Table
            columns={[
              { label: "Prénom", name: "prenom" },
              { label: "Nom", name: "nom" },
              { label: "Rôle", name: "role" },
            ]}
            data={dossier.enfants}
            rowKey="id"
          />
        )}
      </div>
    </>
  );
};

export default Dossier;
