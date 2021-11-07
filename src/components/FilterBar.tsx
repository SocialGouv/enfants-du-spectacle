import { Select } from "@dataesr/react-dsfr";
import React from "react";
import styles from "src/components/FilterBar.module.scss";
import { grandesCategoriesOptions } from "src/lib/categories";
import type { DossiersFilters } from "src/lib/queries";

import type { SocieteProduction, User } from ".prisma/client";

interface Props {
  text: React.ReactNode;
  allUsers: User[];
  allSocieteProductions: SocieteProduction[];
  filters: DossiersFilters;
  onChangeFilters: (updates: Record<string, number | string>) => void;
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
  onChangeFilters,
}) => {
  const onChangeUserId: React.ChangeEventHandler<HTMLOptionElement> = (
    event
  ) => {
    onChangeFilters({ userId: Number(event.target.value) });
  };

  const onChangeSocieteProductionId: React.ChangeEventHandler<HTMLOptionElement> =
    (event) => {
      onChangeFilters({ societeProductionId: Number(event.target.value) });
    };

  const onChangeGrandeCategorie: React.ChangeEventHandler<HTMLOptionElement> = (
    event
  ) => {
    onChangeFilters({ grandeCategorie: event.target.value });
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
    <>
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
        <span className={styles.filterContainer}>
          <Select
            id="grandeCategorie"
            selected={filters.grandeCategorie ?? ""}
            options={[{ label: "Catégorie", value: "" }].concat(
              grandesCategoriesOptions
            )}
            onChange={onChangeGrandeCategorie}
          />
        </span>
        {Object.values(filters).some((f) => f) && (
          <span className={styles.filterContainer}>
            <button
              onClick={() => {
                onChangeFilters({
                  grandeCategorie: "",
                  societeProductionId: "",
                  userId: "",
                });
              }}
            >
              effacer
            </button>
          </span>
        )}
      </div>
    </>
  );
};

export default FilterBar;
