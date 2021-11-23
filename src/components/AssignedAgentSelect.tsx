import { Select } from "@dataesr/react-dsfr";
import type { User } from "@prisma/client";
import React from "react";
import IconLoader from "src/components/IconLoader";
import { shortUserName } from "src/lib/helpers";

import styles from "./AssignedAgentSelect.module.scss";

interface Props {
  disabled: boolean;
  assignedUserId: number | null;
  allUsers: User[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AssignedAgentSelect: React.FC<Props> = ({
  assignedUserId,
  disabled,
  allUsers,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <Select
        selected={assignedUserId ? String(assignedUserId) : ""}
        disabled={disabled}
        options={[{ label: "", value: "" }].concat(
          allUsers.map((u) => ({
            label: shortUserName(u),
            value: String(u.id),
          }))
        )}
        onChange={onChange}
        className={styles.select}
      />
      {disabled && <IconLoader className={styles.iconLoader} />}
    </div>
  );
};
export default AssignedAgentSelect;
