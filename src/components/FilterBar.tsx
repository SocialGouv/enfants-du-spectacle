import { Select } from "@dataesr/react-dsfr";
import React from "react";
import type { DossiersFilters } from "src";
import styles from "src/components/FilterBar.module.scss";

import type { SocieteProduction, User } from ".prisma/client";

interface Props {
  text: React.ReactNode;
  allUsers: User[];
  allSocieteProductions: SocieteProduction[];
  filters: DossiersFilters;
  onChangeFilter: (name: string, value: number | string) => void;
}
interface Option {
  label: string | null;
  value: string;
}

const FilterBar: React.FC<Props> = ({
  text,
  allUsers,
  filters,
  allSocieteProductions,
  onChangeFilter,
}) => {
  const onChangeUserId: React.ChangeEventHandler<HTMLOptionElement> = (
    event
  ) => {
    onChangeFilter("userId", Number(event.target.value));
  };

  const onChangeSocieteProductionId: React.ChangeEventHandler<HTMLOptionElement> =
    (event) => {
      onChangeFilter("societeProductionId", Number(event.target.value));
    };

  const defaultUserOption: Option = {
    label: "Instructeur responsable",
    value: "",
  };
  const defaultSocieteProductionOption: Option = {
    label: "Société de production",
    value: "",
  };

  return (
    <div>
      {text}{" "}
      <span className={styles.filterContainer || ""}>
        <Select
          id="userId"
          selected={String(filters.userId)}
          options={[defaultUserOption].concat(
            allUsers.map((u) => ({ label: u.email, value: String(u.id) }))
          )}
          onChange={onChangeUserId}
        />
      </span>
      <span className={styles.filterContainer}>
        <Select
          id="userId"
          selected={String(filters.societeProductionId) || ""}
          options={[defaultSocieteProductionOption].concat(
            allSocieteProductions.map((s) => ({
              label: s.nom,
              value: String(s.id),
            }))
          )}
          onChange={onChangeSocieteProductionId}
        />
      </span>
    </div>
  );
};

export default FilterBar;
