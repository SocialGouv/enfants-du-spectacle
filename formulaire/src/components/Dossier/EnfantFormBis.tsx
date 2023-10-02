import React, { useEffect, useState } from "react";
import { EnfantData } from "src/fetching/dossiers";
import styles from "./DossierForm.module.scss";
import InputAutocomplete from "../uiComponents/InputAutocomplete";
import { createPieceEnfant } from "src/fetching/pieceEnfant";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import moment from "moment";
import { EnfantWithDosier } from "src/fetching/enfant";
import { set } from "date-fns";

interface Props {
  enfant: EnfantData;
  allowChanges: Boolean;
}

const EnfantFormBis: React.FC<Props> = ({ enfant, allowChanges }) => {
  const [enfantTmp, setEnfant] = useState<EnfantData>(enfant);
  const [dataPassed, setDataPassed] =
    React.useState<Record<"nom" | "prenom", string>>();

  const handleSelect = (enfant: EnfantWithDosier) => {
    setEnfant({
      ...enfantTmp,
      nom: enfant.nom,
      prenom: enfant.prenom,
      dateNaissance: enfant.dateNaissance,
      nomRepresentant1: enfant.nomRepresentant1,
      nomRepresentant2: enfant.nomRepresentant2,
      prenomRepresentant1: enfant.prenomRepresentant1,
      prenomRepresentant2: enfant.prenomRepresentant2,
      adresseRepresentant1: enfant.adresseRepresentant1,
      adresseRepresentant2: enfant.adresseRepresentant2,
      mailRepresentant1: enfant.mailRepresentant1,
      mailRepresentant2: enfant.mailRepresentant2,
      telRepresentant1: enfant.telRepresentant1,
      telRepresentant2: enfant.telRepresentant2,
      piecesDossier: enfant.piecesDossier.filter((piece) => {
        return (
          piece.type === "LIVRET_FAMILLE" ||
          piece.type === "CERTIFICAT_SCOLARITE"
        );
      }),
    });
    enfant.piecesDossier.map(async (pieceDossier) => {
      console.log();
      if (
        pieceDossier.type === "LIVRET_FAMILLE" ||
        pieceDossier.type === "CERTIFICAT_SCOLARITE"
      ) {
        pieceDossier.enfantId = enfantTmp.id;
        delete pieceDossier.id;
        await createPieceEnfant(pieceDossier);
      }
    });
  };

  const handleAutocomplete = (str: string, field: "nom" | "prenom"): void => {
    setDataPassed({ [field]: str } as Record<"nom" | "prenom", string>);
  };

  const handleDateEnfant = (wichDate: string, date: Date): void => {
    setEnfant({
      ...enfantTmp,
      [wichDate]: date,
    });
  };

  React.useEffect(() => {
    setEnfant(enfant);
  }, [enfant])


  return (
    <div className={styles.enfantForm}>
      <div className={styles.byThreeForm}>
        <div className={styles.blocForm}>
          <InputAutocomplete
            label={"Prénom(s) *"}
            field={"prenom"}
            enfant={enfantTmp}
            passData={handleAutocomplete}
            passEnfant={handleSelect}
          ></InputAutocomplete>
        </div>

        <div className={styles.blocForm}>
          <InputAutocomplete
            label={"Nom *"}
            field={"nom"}
            enfant={enfantTmp}
            passData={handleAutocomplete}
            passEnfant={handleSelect}
          ></InputAutocomplete>
        </div>

        <div className={styles.blocForm}>
          <label htmlFor="date" className="mb-2 italic">
            Né(e) le *
          </label>
          <div className={styles.datePickerWrapper}>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={
                enfantTmp?.dateNaissance
                  ? moment(enfantTmp?.dateNaissance).toDate()
                  : enfantTmp?.dateNaissance
              }
              className="inputText"
              showMonthDropdown
              showYearDropdown
              disabled={!allowChanges}
              dropdownMode="select"
              onChange={(date: Date) => {
                handleDateEnfant("dateNaissance", date);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default EnfantFormBis;
