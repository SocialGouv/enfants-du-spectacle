
import React from "react";
import styles from "./InputAutocomplete.module.scss";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Enfant } from "@prisma/client";
import { EnfantWithDosier, searchEnfants } from "src/fetching/enfant";
import { frenchDateText } from "src/lib/helpers";

interface Props {
    label: string,
    field: 'nom' | 'prenom',
    enfant: Enfant,
    passData: (str: string, field: 'nom' | 'prenom') => void
    passEnfant: (enfant: EnfantWithDosier) => void
}

const InputAutocomplete: React.FC<Props> = ({ label, field, enfant, passData, passEnfant }) => {
    const [enfantsList, setEnfantsList] = React.useState<EnfantWithDosier[]>([])

    const handleOnSearch = async (string: string, results: Object) => {
      passData(string, field)
      let infosEnfant = {nom: '', prenom: ''}
      infosEnfant[field] = string
      let enfantsFound = await searchEnfants(infosEnfant)
      let seen = Object.create(null)
      let result = enfantsFound.filter(o => {
          var key = ['nom', 'prenom', 'dataNaissance'].map(k => o[k as keyof Enfant]).join('|');
          if (!seen[key]) {
              seen[key] = true;
              return true;
          }
      });
      setEnfantsList(result)
    }

    const handleOnSelect = (item: EnfantWithDosier) => {
      passEnfant(item)
    }
  
    const formatResult = (item: EnfantWithDosier) => {
      return (
        <div className={styles.rowResult}>
          <span style={{ display: 'block', textAlign: 'left' }}>{item.prenom} {item.nom}</span>
          <span className={styles.infos}>Date de naissance : {item.dateNaissance ? frenchDateText(item.dateNaissance) : 'non communiquée'}</span>
          <span className={styles.infos}>Dernier projet : {item.dossier.nom}</span>
        </div>
      )
    }

    return (
        <div className={styles.InputAutocomplete}>

            <label className="mb-2 italic">
                {label}
            </label>
            <div className={styles.autoComplete}>
                <ReactSearchAutocomplete
                    items={enfantsList}
                    fuseOptions={{keys: ['nom', 'prenom']}}
                    resultStringKeyName={field}
                    showIcon={false}
                    showClear={false}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    inputSearchString={enfant[field] || ''}
                    autoFocus
                    formatResult={formatResult}
                    inputDebounce={400}
                    showNoResults={false}
                    styling={{
                        backgroundColor: "#eeeeee",
                        borderRadius: "0.25rem 0.25rem 0 0",
                        fontSize: "1rem",
                        border: "0",
                        lineColor: "white",
                    }}
                />
            </div>
        </div>
    );
};

export default InputAutocomplete;