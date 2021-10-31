import { Select } from "@dataesr/react-dsfr";
import React from "react";
import styles from "src/components/FilterBar.module.scss";

import type { User } from ".prisma/client";

interface Props {
  text: React.ReactNode;
  allUsers: User[];
  filteredUserId?: number;
  onChangeFilter: (name: string, value: number | string) => void;
}
interface Option {
  label: string | null;
  value?: number | string;
}

const FilterBar: React.FC<Props> = ({
  text,
  allUsers,
  filteredUserId,
  onChangeFilter,
}) => {
  const onChangeUserId: React.ChangeEventHandler<HTMLOptionElement> = (
    event
  ) => {
    onChangeFilter("userId", Number(event.target.value));
  };

  const defaultUserOption: Option = { label: "Instructeur responsable" };

  return (
    <div>
      {text}{" "}
      <span className={styles.filterContainer}>
        <Select
          selected={filteredUserId}
          options={[defaultUserOption].concat(
            allUsers.map((u) => ({ label: u.email, value: u.id }))
          )}
          onChange={onChangeUserId}
        />
      </span>
    </div>
  );
};

export default FilterBar;
