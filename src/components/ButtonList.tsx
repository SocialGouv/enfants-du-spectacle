// import { useRouter } from "next/router";
import React from "react";
import { BsCalendar4Event } from "react-icons/bs";
import { TbBadge } from "react-icons/tb";
import type { statusGroup } from "src/lib/types";

import { ButtonLink } from "../uiComponents/button";
import styles from "./ButtonList.module.scss";

interface Props {
  action: (status: statusGroup) => void;
}

const ButtonList: React.FC<Props> = ({ action }) => {
  const [status, setStatus] = React.useState<statusGroup>("futur");

  return (
    <div className={styles.containerButtonList}>
      <div className={styles.tabs}>
        <ButtonLink
          light={!(status === "futur")}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, @typescript-eslint/no-unused-expressions
            setStatus("futur"), action("futur");
          }}
        >
          <BsCalendar4Event style={{ marginRight: "6px" }} />
          <div
            className={`${styles.buttonStatus} ${
              status !== "futur" ? `${styles.inactiveStatus}` : ""
            }`}
          >
            Commissions à venir
          </div>
        </ButtonLink>
        <ButtonLink
          light={!(status === "passed")}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-confusing-void-expression
            setStatus("passed"), action("passed");
          }}
        >
          <TbBadge style={{ marginRight: "6px" }} />
          <div
            className={`${styles.buttonStatus} ${
              status !== "passed" ? `${styles.inactiveStatus}` : ""
            }`}
          >
            Commissions passées...
          </div>
        </ButtonLink>
      </div>
    </div>
  );
};

export default ButtonList;