import _ from "lodash";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";
import AssignedAgent from "src/components/AssignedAgent";
import CategorieDossierTag from "src/components/CategorieDossierTag";
import IconLoader from "src/components/IconLoader";
import SendLinks from "src/components/SendLinks";
import StatutDossierTag from "src/components/StatutDossierTag";
import {
  frenchDateText,
  frenchDepartementName,
  STATUS_ODJ,
} from "src/lib/helpers";
import { generateOdj } from "src/lib/pdf/pdfGenerateOdj";
import { generatePV } from "src/lib/pdf/pdfGeneratePV";
import type { CommissionData, DossierDataLight } from "src/lib/queries";
import { uploadZip } from "src/lib/queries";

import styles from "./Commission.module.scss";

interface DossierProps {
  dossier: DossierDataLight;
}

const Dossier: React.FC<DossierProps> = ({ dossier }) => {
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
    </div>
  );
};

interface Props {
  commission: CommissionData;
}

const Commission: React.FC<Props> = ({ commission }) => {
  const dossiersCount = commission.dossiers.length;
  const enfantsCount = commission.dossiers
    .map((p) => {
      return p._count?.enfants ?? 0;
    })
    .reduce((i, b) => i + b, 0);
  const [submitting, setSubmitting] = React.useState(false);
  const { data: session } = useSession();
  const docName = `commission_${frenchDepartementName(
    commission.departement
  )}_${frenchDateText(commission.date)}`;
  const urlDoc = `/api/docs?zipname=${docName.replace(/[\W]+/g, "_")}`;
  return (
    <div className="card">
      <div className={styles.commissionHeader}>
        <div className={styles.dossierTitle}>
          Commission du <b>{frenchDateText(commission.date)}</b> -{" "}
          {frenchDepartementName(commission.departement)}
        </div>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <b>{dossiersCount}</b> dossiers - <b>{enfantsCount}</b> enfants
      </div>

      <div className={`${styles.dossierGrid} itemGrid headGrid`}>
        <div />
        <div>Dossier</div>
        <div>Soci??t??</div>
        <div>Enfants</div>
        <div>Suivi par</div>
        <div>Cat??gorie</div>
      </div>
      <div>
        {commission.dossiers.map((dossier) => (
          <Dossier key={dossier.id} dossier={dossier} />
        ))}
      </div>
      <div className={styles.actionGrid}>
        <div className={styles.dlButton}>
          {
            <div className={styles.downloadLink}>
              <a
                href={urlDoc}
                className="postButton"
                download={docName + ".zip"}
              >
                T??l??charger dossiers
              </a>
            </div>
          }
          {session && session.dbUser.nom === "Le Bars" && (
            <button
              className="postButton"
              onClick={() => {
                setSubmitting(true);
                uploadZip(commission)
                  .then(() => {
                    setSubmitting(false);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              {submitting && <IconLoader className={styles.iconLoader} />}{" "}
              Mettre a jour l&apos;archive
            </button>
          )}
        </div>
        <div className={styles.sendButton}>
          <SendLinks commission={commission} />
        </div>
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
              T??l??charger ordre du jour
            </button>
          )}
        </div>
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
              T??l??charger Proc??s Verbal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Commission;
