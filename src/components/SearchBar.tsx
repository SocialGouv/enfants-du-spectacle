import { Title } from "@dataesr/react-dsfr";
import React from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import styles from "src/components/SearchBar.module.scss";

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <>
      <GiMagnifyingGlass className={styles.icon} />
      <Title as="h1">|</Title>
      <input
        value={value}
        type="text"
        placeholder="Rechercher un numéro de dossier, un dossier, une société, un enfant…"
        className={styles.search}
        onChange={onChange}
      />
    </>
  );
};

export default SearchBar;
