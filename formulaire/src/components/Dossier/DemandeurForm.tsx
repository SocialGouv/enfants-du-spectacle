import React from "react";
import styles from "./DossierForm.module.scss";
import { Card, CardDescription, CardTitle, Select } from "@dataesr/react-dsfr";
import { CONVENTIONS } from "src/lib/helpers";
import SocieteProd from "./SocieteProd";
import useStateContext from "src/context/StateContext";
import TableCard from "../TableCard";

interface Props {
  allowChanges: Boolean;
}

const DemandeurForm: React.FC<Props> = ({ allowChanges }) => {
  const contextDossier = { ...useStateContext() };
  const [showInputs, setShowInputs] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (contextDossier.demandeur.conventionCollectiveCode === "0000") {
      setShowInputs(true);
    }
  }, [contextDossier.demandeur.conventionCollectiveCode]);

  return (
    <div className={styles.demandeurForm}>
      <TableCard title={"Informations liées au demandeur"}>
        <div className={styles.byThreeForm}>
          <div className={styles.blocForm}>
            <label htmlFor="prenom" className="mb-2 italic">
              Prénom *
            </label>
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                contextDossier.processInput(
                  "demandeur",
                  "prenom",
                  (e.target as HTMLInputElement).value
                );
              }}
              value={contextDossier.demandeur.prenom || ""}
              disabled={!allowChanges}
              type="text"
              id="prenom"
              name="prenom"
              className="inputText"
            />
          </div>

          <div className={styles.blocForm}>
            <label htmlFor="nom" className="mb-2 italic">
              Nom *
            </label>
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                contextDossier.processInput(
                  "demandeur",
                  "nom",
                  (e.target as HTMLInputElement).value
                );
              }}
              value={contextDossier.demandeur.nom || ""}
              disabled={!allowChanges}
              type="text"
              id="nom"
              name="nom"
              className="inputText"
            />
          </div>

          <div className={styles.blocForm}>
            <label htmlFor="fonction" className="mb-2 italic">
              Fonction *
            </label>
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                contextDossier.processInput(
                  "demandeur",
                  "fonction",
                  (e.target as HTMLInputElement).value
                );
              }}
              value={contextDossier.demandeur.fonction || ""}
              disabled={!allowChanges}
              type="text"
              id="fonction"
              name="fonction"
              className="inputText"
            />
          </div>

          <div className={styles.blocForm}>
            <label htmlFor="email" className="mb-2 italic">
              Mail *
            </label>
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                contextDossier.processInput(
                  "demandeur",
                  "email",
                  (e.target as HTMLInputElement).value
                );
              }}
              value={contextDossier.demandeur.email || ""}
              disabled={!allowChanges}
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              id="email"
              name="email"
              className="inputText"
            />
          </div>

          <div className={styles.blocForm}>
            <label htmlFor="phone" className="mb-2 italic">
              Téléphone
            </label>
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                contextDossier.processInput(
                  "demandeur",
                  "phone",
                  (e.target as HTMLInputElement).value
                );
              }}
              value={contextDossier.demandeur.phone || ""}
              disabled={!allowChanges}
              type="text"
              id="phone"
              name="phone"
              className="inputText"
            />
          </div>
        </div>

        <div className={styles.blocForm}>
          <label htmlFor="conventionCollectiveCode" className="mb-2 italic">
            Convention collective applicable *
          </label>
          <div className="selectDpt">
            <Select
              id="conventionCollectiveCode"
              selected={
                contextDossier.demandeur.conventionCollectiveCode
                  ? contextDossier.demandeur.conventionCollectiveCode
                  : ""
              }
              options={[
                {
                  label: contextDossier.demandeur.conventionCollectiveCode
                    ? ""
                    : "Choisir",
                  value: "",
                },
              ].concat(
                CONVENTIONS.map((u) => ({
                  label: `${u.label} - ${u.code}`,
                  value: u.code,
                })).concat({ label: "Autre", value: "0000" })
              )}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                contextDossier.processInput(
                  "demandeur",
                  "conventionCollectiveCode",
                  (e.target as HTMLInputElement).value
                );

                if ((e.target as HTMLInputElement).value === "0000")
                  setShowInputs(true);
                else setShowInputs(false);
              }}
            />
          </div>
          {showInputs && (
            <div style={{ marginTop: "20px" }}>
              <label
                htmlFor="otherConventionCollective"
                className="mb-2 italic"
              >
                Nom de la convention
              </label>
              <input
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  contextDossier.processInput(
                    "demandeur",
                    "otherConventionCollective",
                    (e.target as HTMLInputElement).value
                  );
                }}
                value={contextDossier.demandeur.otherConventionCollective || ""}
                disabled={!allowChanges}
                type="text"
                id="otherConventionCollective"
                name="otherConventionCollective"
                className="inputText"
              />
            </div>
          )}
        </div>

        <SocieteProd></SocieteProd>
      </TableCard>
    </div>
  );
};

export default DemandeurForm;
