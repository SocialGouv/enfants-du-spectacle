import _ from "lodash";
import Link from "next/link";
import React from "react";
import AssignedAgent from "src/components/AssignedAgent";
import CategorieDossierTag from "src/components/CategorieDossierTag";
import StatutDossierTag from "src/components/StatutDossierTag";
import {
  frenchDateText,
  frenchDepartementName,
  STATUS_ODJ,
} from "src/lib/helpers";
import { generateOdj } from "src/lib/pdf/pdfGenerateOdj";
import { generatePV } from "src/lib/pdf/pdfGeneratePV";
import type { CommissionData, DossierDataLight } from "src/lib/queries";
import { downloadDocs, sendEmail } from "src/lib/queries";

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
        <div>Société</div>
        <div>Enfants</div>
        <div>Suivi par</div>
        <div>Catégorie</div>
      </div>
      <div>
        {commission.dossiers.map((dossier) => (
          <Dossier key={dossier.id} dossier={dossier} />
        ))}
      </div>
      <div className={styles.actionGrid}>
        <div className={styles.dlButton}>
          <button
            className="postButton"
            onClick={() => {
              console.log("commission : ", commission);
              downloadDocs(commission);
            }}
          >
            Télécharger dossiers
          </button>
        </div>
        <div className={styles.sendButton}>
          <button
            className="whiteButton"
            onClick={() => {
              sendEmail("dl_commission");
            }}
          >
            Envoyer dossiers
          </button>
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
              Télécharger ordre du jour
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
              Télécharger Procès Verbal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Commission;
