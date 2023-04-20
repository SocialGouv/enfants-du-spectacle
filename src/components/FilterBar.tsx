import { Icon, Select } from "@dataesr/react-dsfr";
import type { SocieteProduction } from "@prisma/client";
import React from "react";
import styles from "src/components/FilterBar.module.scss";
import IconLoader from "src/components/IconLoader";
import { useAllUsers } from "src/lib/api";
import { grandesCategoriesOptions } from "src/lib/categories";
import {
  ALL_DEPARTEMENTS,
  frenchDepartementName,
  shortUserName,
  stringToNumberOrNull,
} from "src/lib/helpers";
import { useSession } from "next-auth/react";
import type { DossiersFilters } from "src/lib/queries";

interface Props {
  text: React.ReactNode;
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
  filters,
  allSocieteProductions,
  onChangeFilters,
}) => {
  const session = useSession();
  const { allUsers, isLoading, isError } = useAllUsers(
    session.data?.dbUser.role !== "MEDECIN" ? "INSTRUCTEUR" : "MEDECIN"
  );

  React.useEffect(() => {
    if (session.data?.dbUser.role === "INSTRUCTEUR")
      onChangeFilters({
        userId: stringToNumberOrNull(session.data?.dbUser.id),
      });
  }, []);

  if (isLoading) return <IconLoader />;
  if (isError || !allUsers) return <Icon name="ri-error" />;

  const onChangeUserId: React.ChangeEventHandler<HTMLOptionElement> = (
    event
  ) => {
    onChangeFilters({ userId: stringToNumberOrNull(event.target.value) });
  };

  const onChangeSocieteProductionId: React.ChangeEventHandler<
    HTMLOptionElement
  > = (event) => {
    onChangeFilters({
      societeProductionId: stringToNumberOrNull(event.target.value),
    });
  };

  const onChangeGrandeCategorie: React.ChangeEventHandler<HTMLOptionElement> = (
    event
  ) => {
    onChangeFilters({ grandeCategorie: event.target.value });
  };

  const onChangeDepartement: React.ChangeEventHandler<HTMLOptionElement> = (
    event
  ) => {
    onChangeFilters({ departement: event.target.value });
  };

  const defaultDepartement: Option = {
    label: "Département",
    value: "",
  };
  const defaultUserOption: Option = {
    label: "Instructeur",
    value: "",
  };
  const defaultSocieteProductionOption: Option = {
    label: "Société",
    value: "",
  };

  return (
    <>
      <div className={styles.filterContainerTop || ""}>
        {text}{" "}
        <span className={styles.filterContainer || ""}>
          <Select
            id="departement"
            selected={String(filters.departement)}
            options={[defaultDepartement].concat(
              ALL_DEPARTEMENTS.map((u) => ({
                key: u,
                label: frenchDepartementName(u),
                value: u,
              }))
            )}
            onChange={onChangeDepartement}
          />
        </span>
        {session.data?.dbUser.role !== "MEDECIN" && (
          <span className={styles.filterContainer || ""}>
            <Select
              id="userId"
              selected={String(filters.userId)}
              options={[defaultUserOption].concat(
                allUsers.map((u) => ({
                  label: shortUserName(u),
                  value: String(u.id),
                }))
              )}
              onChange={onChangeUserId}
            />
          </span>
        )}
        <span className={styles.filterContainer}>
          <Select
            id="societeId"
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
                  departement: "",
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
