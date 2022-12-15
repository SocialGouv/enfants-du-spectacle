import { Container } from "@dataesr/react-dsfr";
import { Dossier } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { ButtonLink } from "src/uiComponents/button";
import styles from "./SearchBar.module.scss";

interface Props {
    action: (term: string) => void
}

const SearchBar: React.FC<Props> = ({ action }) => {
    const [search, setSearch] = React.useState<string>('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLInputElement>): void => {
        setSearch(e.target.value)
    };



    return (
        <div className={styles.searchBar}>
            <Container>
                <div className={styles.blocSearch}>
                    <input
                        onChange={handleSearch}
                        value={search}
                        placeholder={`Rechercher un dossier`}
                        type="text"
                        id="nom"
                        name="nom"
                        className="inputText"
                    />
                    <ButtonLink onClick={() => {action(search)}}>Rechercher</ButtonLink>
                </div>
            </Container>
        </div>
    );
};

export default SearchBar;