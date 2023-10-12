import React, { useRef } from "react";
import { Comments, Enfant } from "@prisma/client";
import { birthDateToFrenchAge, frenchDateText } from "../../lib/helpers";
import styles from "./EnfantList.module.scss";
import { createEnfant, getEnfantsByDossierId, importEnfants } from "src/fetching/enfant";
import useStateContext from "src/context/StateContext";
import { set } from "date-fns";
import TableCard from "../TableCard";
import OrderableItem from "../home/OrderableItem";
import { ButtonLink } from "src/uiComponents/button";
import { EnfantData } from "src/fetching/dossiers";
import moment from "moment";
import CountPieces from "../CountPieces";
import { CommentaireNotifications } from "src/lib/types";
import IconLoader from "../IconLoader";
import Image from "next/image";
import EnfantForm from "./EnfantForm";
import EnfantFormBis from "./EnfantFormBis";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/router";
import ProgressBar from "../ProgressBar";
import readXlsxFile from "read-excel-file";
import { SCHEMA_ENFANTS as schema } from "src/lib/helpers";
import { FaFileDownload, FaUserPlus } from "react-icons/fa";

interface Props {
  allowChanges: Boolean;
}

const EnfantListBis: React.FC<Props> = ({ allowChanges }) => {
  const router = useRouter();
  const contextDossier = { ...useStateContext() };
  const [enfants, setEnfants] = React.useState<EnfantData[]>([]);
  const [termOrdered, setTermToOrder] = React.useState<keyof Enfant>(
    "nom"
  );
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState<number>(0);
  const [numberEnfants, setNumberEnfants] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedEnfant, setSelectedEnfant] = React.useState<EnfantData | null>(null)
  const [enfantToPass, setEnfantToPass] = React.useState<EnfantData | null>(null)
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState(0);
  const [enfantsList, setEnfantsList] = React.useState<Record<string, any>[]>(
    []
  );
  const [enfantRefused, setEnfantRefused] = React.useState<number>(0);
  const [errorsRows, setErrorsRows] = React.useState<Record<string, any>[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [activeOnce, setActiveOnce] = React.useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (selectedFile && activeOnce) {
    readXlsxFile(selectedFile, {
      sheet: "Enfants",
      schema,
    }).then(async (rows) => {
      setErrorsRows(rows.errors);
      const rowParsed = rows.rows.filter(
        (v: any, index, a) =>
          !rows.errors.some((err) => err.row - 1 === index + 1) &&
          a.findIndex(
            (v2: any) =>
              v2.nom === v.nom &&
              v2.prenom === v.prenom &&
              Date.parse(v2.dateNaissance) === Date.parse(v.dateNaissance)
          ) === index
      );
      let start = 0;
      while (start < rowParsed.length) {
        const end = Math.min(start + 10, rowParsed.length);
        const batch = rowParsed.slice(start, end);
        const resImport = await importEnfants(batch, contextDossier.dossier.id);
        setEnfantsList(rowParsed);
        start += 10;
        if (rowParsed.length <= start) setProgress(100);
        else setProgress((start / rowParsed.length) * 100);
      }
      setEnfantRefused(new Set(rows.errors.map((obj) => obj.row)).size);
      fetchEnfants()
    });
    setActiveOnce(false);
  }

  React.useEffect(() => {
    if (showModal) {
      const disableScroll = (event: WheelEvent) => {
        const target = event.target as HTMLElement;
        const isScrollable = target.scrollHeight > target.clientHeight;
        if (isScrollable) {
          return;
        }
        event.preventDefault();
      };
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.removeEventListener("wheel", disableScroll);
      };
    } else {
      document.documentElement.style.overflow = "scroll";
    }
  }, [showModal]);

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActiveOnce(false);
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      window.scrollTo({ top: 0, left: 0 });
      setShowModal(true);
      setActiveOnce(true);
      setEnfantsList([]);
      setEnfantRefused(0);
    }
  };

  const handleErrors = (error: Record<string, any>) => {
    return error.reason === "not_an_email" || error.reason === "not an email"
      ? "Le format de l'email est invalide"
      : error.reason === "not_a_date"
      ? "Le format de la date est invalide"
      : error.reason === "not_a_number"
      ? "Le format est invalide"
      : "Ce champ est obligatoire";
  };
  const handleDownload = () => {
    fetch("/template/template-enfants-v1.xlsx")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "template-enfants-v1.xlsx");
        document.body.appendChild(link);
        link.click();
      });
  };

  const fetchEnfants = async () => {
    setLoading(true);
    const enfantsFetched = await getEnfantsByDossierId(contextDossier.dossier.id, page, 25, termOrdered, order)
    setEnfants(enfantsFetched.enfants);
    setNumberEnfants(enfantsFetched.count);
    setLoading(false);
  }

  const handleOrder = (termToOrder: string) => {
    setOrder(
      termToOrder === termOrdered ? (order === "desc" ? "asc" : "desc") : "desc"
    );
    setTermToOrder(termToOrder as keyof Enfant);
  };

  const handlePage = (page: number) => {
    setPage(page); 
  };

  const clickEnfant = (enfant: EnfantData) => {
    if (selectedEnfant && selectedEnfant.id === enfant.id) {
      setSelectedEnfant(null)
    } else {
      setSelectedEnfant(enfant)
    }
  }

  const refreshEnfant = (enfant: EnfantData) => {
    const index = enfants.findIndex((enfantTmp) => enfantTmp.id === enfant.id)
    const newEnfants = [...enfants]
    newEnfants[index] = enfant
    setEnfants(newEnfants)
    setSelectedEnfant(enfant)
  }

  const deleteEnfant = (enfant: EnfantData) => {
    const index = enfants.findIndex((enfantTmp) => enfantTmp.id === enfant.id)
    const newEnfants = [...enfants]
    newEnfants.splice(index, 1)
    setEnfants(newEnfants)
    setSelectedEnfant(null)
  }

  const formEnfant = (enfantToPass: EnfantData) => {
    return (
      <>
        {enfantToPass &&
          <EnfantFormBis
            enfant={enfantToPass}
            allowChanges={allowChanges}
            refresh={refreshEnfant}
            listDelete={deleteEnfant}
          ></EnfantFormBis>
        }
      </>
    )
  }

  const addEnfant = async () => {
    console.log('adding enfant')
    let res = await createEnfant({
      nom: "Enfant",
      prenom: "Nouvel",
      dossierId: contextDossier.dossier.id,
      typeEmploi: "ROLE_1",
      typeConsultation: "GENERALISTE",
      nomPersonnage: "",
      montantCachet: 0,
      remunerationTotale: 0,
    } as Enfant);
    setEnfants([res, ...enfants]);
    res.remuneration = []
    res.piecesDossier = []
    setSelectedEnfant(res);
  };

  React.useEffect(() => {
    setEnfantToPass(null)
    setEnfantToPass(selectedEnfant)
  }, [selectedEnfant])

  React.useEffect(() => {
    fetchEnfants() 
  }, [order, page])

  return (
    <div className={styles.enfantList}>
      {(contextDossier.dossier.statut === "BROUILLON" ||
        contextDossier.dossier.statut === "CONSTRUCTION") && (
        <div className={styles.listBtn}>
          <div>
            <ButtonLink
              light={true}
              onClick={() => {
                addEnfant();
              }}
            >
              Ajouter un enfant
            </ButtonLink>
          </div>
          <div>
            <ButtonLink onClick={handleFileSelectClick}>
              <FaUserPlus style={{ marginRight: "8px" }} />
              {`Importer le fichier d'enfants`}
            </ButtonLink>
            <input
              id="import-enfants"
              type="file"
              accept="xls, xlsx"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
          <div>
            <ButtonLink light={true} onClick={handleDownload}>
              <FaFileDownload style={{ marginRight: "8px" }} /> Télécharger le
              modèle (csv excel)
            </ButtonLink>
          </div>
        </div>
      )}
      {showModal && <div className={styles.overlay} />}
      {showModal && (
        <>
          <div className={styles.modalWrapper}>
            <RxCross2
              className={styles.closeBtn}
              size={24}
              onClick={() => {
                setProgress(0);
                setShowModal(false);
                router.push(`/dossier/${contextDossier.dossier.id}`);
              }}
            />
            <div className={styles.importTitle}>
              Import des informations enfants
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {enfantsList.length > 0 ? (
                <div>
                  {progress === 100
                    ? "Importation terminée"
                    : "Importation en cours..."}
                </div>
              ) : (
                <>{`Aucune information n'a été importée.`}</>
              )}
            </div>
            <div className={styles.percentage}>{Math.trunc(progress)}%</div>
            <ProgressBar progress={progress} />
            <div className={styles.summaryWrapper}>
              <div className={styles.importTitle}>Résumé:</div>
              <div style={{ marginBottom: "20px" }}>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {enfantsList.length}
                  </span>{" "}
                  {enfantsList.length > 1 ? "enfants crées" : "enfant créé"}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{enfantRefused}</span>{" "}
                  {enfantRefused > 1 ? "enfants refusés" : "enfant refusé"}
                </div>
              </div>
              {errorsRows.length ? (
                <div>
                  <div className={styles.importTitle}>
                    Erreurs{" "}
                    <span className={styles.errorDescription}>
                      ({`certains enfants n'ont pas été importés`})
                    </span>
                  </div>

                  {errorsRows.map((error, index) => {
                    return (
                      <div key={index} className={styles.errorRow}>
                        Ligne{" "}
                        <span style={{ fontWeight: "bold" }}>{error.row}</span>{" "}
                        : {error.column} {`=>`} {handleErrors(error)}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
            {/* {progress === 100 && (
              <ButtonLink
                onClick={() => {
                  router.push(`/dossier/${contextDossier.dossier.id}`);
                }}
              >
                Fermer
              </ButtonLink>
            )} */}
          </div>
        </>
      )}

      <TableCard title={"Enfants"}>
        <div className={styles.headRow}>
          <OrderableItem
            text={"Rôle"}
            termToOrder={"typeEmploi"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <OrderableItem
            text={"Nom et prénom"}
            termToOrder={"nom"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <OrderableItem
            text={"Age"}
            termToOrder={"dateNaissance"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <OrderableItem
            text={"Personnage"}
            termToOrder={"nomPersonnage"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <OrderableItem
            text={"Mis à jour"}
            termToOrder={"dateDerniereModification"}
            action={handleOrder}
            termOrdered={termOrdered}
            order={order}
          ></OrderableItem>
          <div className={styles.itemHead}>Notifications</div>
        </div>
        {loading ? <div style={{textAlign: 'center', margin: '2rem'}}><IconLoader></IconLoader></div> : 
        enfants.map((enfant) => {
          const commentsNotifications: CommentaireNotifications = {
            dossierId: contextDossier.dossier.id,
            notificationsProject: 0,
            notificationsChildren: enfant.comments?.length || 0,
          };
          return (
            <a href={`#row-enfant`}
              className={(selectedEnfant && selectedEnfant?.id === enfant.id) ? `${styles.tableEnfant} ${styles.selected}` : styles.tableEnfant}
              key={`table-enfant-${enfant.id}`}
              onClick={() => {
                clickEnfant(enfant);
              }}
            >
              <div className={styles.itemDossier}>{enfant.typeEmploi}</div>
              <div className={styles.itemDossier}>
                {`${enfant.nom} ${enfant.prenom}`}
              </div>
              <div className={styles.itemDossier}>
                {enfant.dateNaissance
                  ? birthDateToFrenchAge(
                      moment(enfant.dateNaissance).toDate()
                    )
                  : ""}
              </div>
              <div className={styles.itemDossier}>{enfant.nomPersonnage}</div>
              <div className={styles.itemDossier}>
                {enfant.dateDerniereModification
                  ? frenchDateText(enfant.dateDerniereModification)
                  : ""}
              </div>
              <div className={styles.itemDossier}>
                {enfant.piecesDossier && (
                  <CountPieces
                    commentsNotifications={commentsNotifications}
                    piecesJustif={enfant.piecesDossier.map(
                      (piece) => piece.statut
                    )}
                  ></CountPieces>
                )}
              </div>
            </a>
          )
        })}
        <div className={styles.pagination}>
          {[...Array(Math.ceil(numberEnfants / 25))].map(
            (e, i) => (
              <ButtonLink
                light={page !== i}
                onClick={() => {
                  handlePage(i);
                }}
                key={i}
              >
                {i + 1}
              </ButtonLink>
            )
          )}
        </div>
      </TableCard>

      {enfantToPass && selectedEnfant &&(
        <div id="row-enfant">
        <br />
        <TableCard title={`${selectedEnfant.typeEmploi} : ${selectedEnfant.nom} ${selectedEnfant.prenom} (${
                selectedEnfant.dateNaissance
                  ? birthDateToFrenchAge(moment(selectedEnfant.dateNaissance).toDate())
                  : ""
              }) - Personnage : ${selectedEnfant.nomPersonnage ?? "..."}`}>
          {formEnfant(enfantToPass)}
        </TableCard>
        </div>
      )}

      {scrollPosition > 450 && (
        <div className={styles.buttonUp}>
          <a href={`#menu-dossier`}>
            <Image
              src={`/images/arrow-up.svg`}
              alt="Supprimer"
              width={30}
              height={30}
            />
          </a>
        </div>
      )}
    </div>
  )
};

export default EnfantListBis;
