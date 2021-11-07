import { Select, Table, Title } from "@dataesr/react-dsfr";
import React from "react";
import ChangeStatutProjetButton from "src/components/ChangeStatutProjetButton";
import styles from "src/components/Dossier.module.scss";
import {
  categorieToGrandeCategorieLabel,
  categorieToLabel,
} from "src/lib/categories";
import { frenchDateText } from "src/lib/helpers";
import type { ProjetData } from "src/lib/types";

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
  projet: ProjetData;
  assignedUserId: number | null;
  onAssignUserId: (userId: number | null) => void;
  onChangeStatut: (statut: string) => void;
  allUsers: User[];
}

const Dossier: React.FC<Props> = ({
  projet,
  assignedUserId,
  onChangeStatut,
  onAssignUserId,
  allUsers,
}) => {
  return (
    <>
      <div className={styles.title}>
        <Title as="h1">Le Dossier</Title>
        <ChangeStatutProjetButton projet={projet} onChange={onChangeStatut} />
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
          <Info title="Date de commission">
            {frenchDateText(projet.commission.date)}
          </Info>
        </div>
        <Info title="Type de dossier">
          {categorieToGrandeCategorieLabel(projet.categorie)}
          <br />
          {categorieToLabel(projet.categorie)}
        </Info>
        <Info title="Société">
          <div>{projet.societeProduction.nom}</div>
          <div>{projet.societeProduction.departement}</div>
          <div>{projet.societeProduction.siret}</div>
        </Info>
      </div>

      <div className={styles.bloc}>
        <Title as="h3">Enfants</Title>
        {projet.enfants.length == 0 && <span>Aucun enfant</span>}
        {projet.enfants.length > 0 && (
          <Table
            columns={[
              { label: "Prénom", name: "prenom" },
              { label: "Nom", name: "nom" },
              { label: "Rôle", name: "role" },
            ]}
            data={projet.enfants}
            rowKey="id"
          />
        )}
      </div>
    </>
  );
};

export default Dossier;
