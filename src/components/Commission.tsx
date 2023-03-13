import _ from "lodash";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";
import { RiDownloadLine } from "react-icons/ri";
import AssignedAgent from "src/components/AssignedAgent";
import CategorieDossierTag from "src/components/CategorieDossierTag";
import NotificationDossierTag from "src/components/NotificationDossierTag";
import StatutDossierTag from "src/components/StatutDossierTag";
import {
  frenchDateText,
  frenchDepartementName,
  STATUS_ODJ,
} from "src/lib/helpers";
import { generateOdj } from "src/lib/pdf/pdfGenerateOdj";
import { generatePV } from "src/lib/pdf/pdfGeneratePV";
import type { CommissionData, DossierDataLight } from "src/lib/queries";
import type { CommentaireNotifications } from "src/lib/types";

import styles from "./Commission.module.scss";

interface DossierProps {
  dossier: DossierDataLight;
  commentsInfo: CommentaireNotifications;
}
const Dossier: React.FC<DossierProps> = ({ dossier, commentsInfo }) => {
  return (
    <div className={`${styles.dossierGrid} itemGrid`}>
      <div>
        <StatutDossierTag dossier={dossier} />
      </div>
      <div className={styles.nomDossier} title={dossier.nom}>
        <Link href={`/dossiers/${dossier.id}`}>{dossier.nom}</Link>
      </div>
      <div>{dossier.societeProduction.nom}</div>
      <div>
        <b>{dossier._count?.enfants}</b>&nbsp;enfants
      </div>
      <div>
        <AssignedAgent dossier={dossier} />
      </div>
      <div>
        <CategorieDossierTag dossier={dossier} onlyGrandeCategorie={true} />
      </div>
      <div>
        <NotificationDossierTag dossier={dossier} commentsInfo={commentsInfo} />
      </div>
    </div>
  );
};

interface Props {
  commission: CommissionData;
  commentsCountInfo: {
    dossierId: number;
    notificationsProject: number;
    notificationsChildren: number;
  }[];
}

const Commission: React.FC<Props> = ({ commission, commentsCountInfo }) => {
  const dossiersCount = commission.dossiers.length;
  const enfantsCount = commission.dossiers
    .map((p) => {
      return p._count?.enfants ?? 0;
    })
    .reduce((i, b) => i + b, 0);
  const { data: session } = useSession();
  return (
    <div
      id={commission.id.toString()}
      className="card"
      style={{ position: "relative" }}
    >
      <div className={styles.commissionHeader}>
        <div className={styles.dossierTitle}>
          Commission du <b>{frenchDateText(commission.date)}</b> -{" "}
          {frenchDepartementName(commission.departement)}
        </div>
      </div>
      <div style={{ fontWeight: 600, marginBottom: "2rem" }}>
        <b>{dossiersCount}</b> dossiers - <b>{enfantsCount}</b> enfants
      </div>

      <div
        className={`${styles.dossierGrid} itemGrid headGrid`}
        style={{ borderBottom: "1px solid #DDDDDD", paddingBottom: "12px" }}
      >
        <div>Etats</div>
        <div>Dossier</div>
        <div>Société</div>
        <div>Enfants</div>
        <div>Suivi par</div>
        <div>Catégorie</div>
        <div>Notifications</div>
      </div>
      <div>
        {commission.dossiers.map((dossier) => {
          const commentsInfo = commentsCountInfo.find(
            (comment) =>
              JSON.stringify(comment.dossierId) === dossier.externalId
          );
          return (
            <div
              style={{ borderBottom: "1px solid #DDDDDD", padding: "23px 0" }}
              key={dossier.id}
            >
              <Dossier
                dossier={dossier}
                commentsInfo={commentsInfo as CommentaireNotifications}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.actionGrid}>
        {session && session.dbUser.role !== "MEMBRE" && (
          <div className={styles.odjButton}>
            {_.find(commission.dossiers, (dossier: DossierDataLight) => {
              return STATUS_ODJ.includes(dossier.statut);
            }) && (
              <button
                className="postButton"
                onClick={() => {
                  generateOdj(commission);
                }}
              >
                <RiDownloadLine style={{ marginRight: "10px" }} />
                Télécharger ordre du jour
              </button>
            )}
          </div>
        )}
        {session && session.dbUser.role !== "MEMBRE" && (
          <div className={styles.pvButton}>
            {_.find(commission.dossiers, (dossier: DossierDataLight) => {
              return STATUS_ODJ.includes(dossier.statut);
            }) && (
              <button
                className="postButton"
                onClick={() => {
                  generatePV(commission);
                }}
              >
                <RiDownloadLine style={{ marginRight: "10px" }} />
                Télécharger Procès Verbal
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Commission;
