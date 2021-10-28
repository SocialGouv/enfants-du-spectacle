import { Title } from "@dataesr/react-dsfr";
import React from "react";
import styles from "src/components/SearchBar.module.scss";

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <>
      <Title as="h1">Demandes |</Title>
      <input
        value={value}
        type="text"
        placeholder="🔍 Rechercher un numéro de dossier, un projet, une société, un enfant"
        className={styles.search}
        onChange={onChange}
      />
    </>
  );
};

export default SearchBar;
