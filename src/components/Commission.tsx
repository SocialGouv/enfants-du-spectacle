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
import type { DossierData } from "src/lib/types";
import type { CommissionNotifications } from "src/lib/notifications";

import styles from "./Commission.module.scss";
import IconLoader from "./IconLoader";

interface DossierProps {
  dossier: DossierData;
  commentsInfo: CommissionNotifications;
}
const Dossier: React.FC<DossierProps> = ({ dossier, commentsInfo }) => {
  const { data: session } = useSession();
  
  return (
    <div className={`${session?.dbUser.role !== "MEDECIN" ? styles.dossierGrid : styles.dossierGridMedecin} itemGrid`}>
      {session?.dbUser.role !== "MEDECIN" &&
        <div>
          <StatutDossierTag dossier={dossier} />
        </div>
      }
      <div className={styles.nomDossier} title={dossier.nom || ""}>
        <Link href={`/dossiers/${dossier.id}`}>{dossier.nom || "Sans nom"}</Link>
      </div>
      <div data-testid="societe-production">
        {/* Try to get societeProduction name from direct relation first */}
        {dossier.societeProduction && dossier.societeProduction.nom ? 
          dossier.societeProduction.nom : 
          /* If societeProduction is missing, show demandeur company name if available */
          /* TypeScript doesn't know demandeur.societeProduction exists, so we use a type assertion */
          dossier.demandeur && 
          (dossier.demandeur as any).societeProduction && 
          (dossier.demandeur as any).societeProduction.nom ?
          (dossier.demandeur as any).societeProduction.nom :
          /* Fallback to showing the societeProduction ID if available */
          dossier.societeProductionId ? 
          `Société ID: ${dossier.societeProductionId}` : 
          "N/A"}
      </div>
      <div>
        <b>{dossier.enfants ? dossier.enfants.length : dossier._count?.enfants ? dossier._count.enfants : 0}</b>&nbsp;enfants
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
}

const Commission: React.FC<Props> = ({ commission }) => {
  const [loadingPdf, setLoadingPdf] = React.useState<string>('')
  const [notificationsData, setNotificationsData] = React.useState<CommissionNotifications[]>([])
  const [loadingNotifications, setLoadingNotifications] = React.useState<boolean>(true)

  const dossiersCount = commission.dossiers.length;
  const enfantsCount = commission.dossiers
    .map((p) => {
      return p.enfants ? p.enfants.length : p._count?.enfants ? p._count.enfants : 0;
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
        className={`${session?.dbUser.role !== "MEDECIN" ? styles.dossierGrid : styles.dossierGridMedecin} itemGrid headGrid`}
        style={{ borderBottom: "1px solid #DDDDDD", paddingBottom: "12px" }}
      >
        {session?.dbUser.role !== "MEDECIN" &&
          <div>Etats</div>
        }
        <div>Dossier</div>
        <div>Société</div>
        <div>Enfants</div>
        <div>{`${session?.dbUser.role !== "MEDECIN" ? "Suivi par" : "MÉDECIN"}`}</div>
        <div>Catégorie</div>
        <div>Notifications</div>
      </div>
      <div>
        {commission.dossiers.map((dossier) => {
          return (
            <div
              style={{ borderBottom: "1px solid #DDDDDD", padding: "23px 0" }}
              key={dossier.id}
            >
              <Dossier
                dossier={dossier}
                commentsInfo={{
                  dossierId: dossier.id,
                  notificationsProject: dossier.comments.filter((com) => (com.source === "SOCIETE_PROD" && com.seen !== true && com.enfantId === null)).length,
                  notificationsChildren: dossier.comments.filter((com) => (com.source === "SOCIETE_PROD" && com.seen !== true) && com.enfantId !== null).length,
                  newPiecesEnfant: dossier.enfants.flatMap((enf) => enf.piecesDossier.filter((piece) => piece.statut === null)).length,
                  newPiecesDossier: dossier.piecesDossier.filter((p) => (p.statut === null)).length
                }}
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
                onClick={async () => {
                  setLoadingPdf('ODJ_' + commission.id);
                  await generateOdj(commission);
                  setLoadingPdf('');
                }}
              >
                <span style={{ marginRight: "10px" }}>⬇️</span>
                {loadingPdf === 'ODJ_' + commission.id ? 
                  (<IconLoader></IconLoader>)
                  :
                  (<span>Télécharger Ordre du jour</span>)
                }
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
                onClick={async () => {
                  setLoadingPdf('PV_' + commission.id);
                  await generatePV(commission);
                  setLoadingPdf('');
                }}
              >
                <span style={{ marginRight: "10px" }}>⬇️</span>
                {loadingPdf === 'PV_' + commission.id ? 
                  (<IconLoader></IconLoader>)
                  :
                  (<span>Télécharger Procès Verbal</span>)
                }
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Commission;
