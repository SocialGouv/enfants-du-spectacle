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

interface DossierProps {
  projet: ProjetData;
  assignedUserId: number | null;
  onAssignUserId: (userId: number | null) => void;
  onChangeStatut: (statut: string) => void;
  allUsers: User[];
}

const Dossier: React.FC<DossierProps> = ({
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
          <div>
            <b>Suivi par</b>
          </div>
          <div>
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
          </div>

          <div>
            <b>Date de commission</b>
          </div>
          <div>{frenchDateText(projet.commission.date)}</div>
        </div>
        <div>
          <div>
            <b>Type de dossier</b>
          </div>
          <div>
            {categorieToGrandeCategorieLabel(projet.categorie)}
            <br />
            {categorieToLabel(projet.categorie)}
          </div>
        </div>
        <div>
          <b>Société</b>
          <div>{projet.societeProduction.nom}</div>
          <div>{projet.societeProduction.departement}</div>
          <div>{projet.societeProduction.siret}</div>
        </div>
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
