import React from "react";

import styles from "./TableCard.module.scss";

interface Props {
  title?: string;
  children: React.ReactNode
}

const TableCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.tableCard}>
        <h5>{title}</h5>
        {children}
    </div>
  );
};
export default TableCard;