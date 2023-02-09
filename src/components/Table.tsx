import * as React from "react";
import styles from "src/components/Table.module.scss";

interface Props {
  headers: string[];
  children: React.ReactNode;
}

const Accordion: React.FC<Props> = ({ headers, children }) => {
  return (
    <table cellSpacing={0} className={styles.tableHeader}>
      <thead>
        <tr>
          {headers.map((h, index) => (
            <th key={index}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Accordion;
