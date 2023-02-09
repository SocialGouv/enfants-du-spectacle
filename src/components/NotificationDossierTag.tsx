import type { Dossier } from "@prisma/client";
import React from "react";
import { RiAlertFill, RiInformationFill } from "react-icons/ri";

import styles from "./Tag.module.scss";

interface Props {
  dossier: Dossier;
}

const NotificationDossierTag: React.FC<Props> = ({ dossier }) => {
  return (
    <div
      className={`${styles.tag} ${
        dossier.statusNotification === "MIS_A_JOUR"
          ? `${styles.tagRed}`
          : dossier.statusNotification === "NOUVEAU"
          ? `${styles.tagBlue}`
          : ""
      }`}
    >
      {dossier.statusNotification === "MIS_A_JOUR" ? (
        <div>
          <RiAlertFill /> MAJ
        </div>
      ) : dossier.statusNotification === "NOUVEAU" ? (
        <div>
          <RiInformationFill /> NOUVEAU
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NotificationDossierTag;
