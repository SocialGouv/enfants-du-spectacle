import { Dossier, User } from "@prisma/client";
import React, { useRef } from "react";
import { getUsersById } from "src/fetching/users";
import styles from "./HeadingDossier.module.scss";
import { BiTrash } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { updateDossier } from "src/fetching/dossiers";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  dossier: Dossier;
  setShowDialogue: (showDialogue: boolean) => void;
}

const CollaboratorsList: React.FC<Props> = ({ dossier, setShowDialogue }) => {
  const [collaborators, setCollaborators] = React.useState<User[]>();
  const [showCollabList, setShowCollabList] = React.useState<Boolean>(false);
  const [index, setIndex] = React.useState<number>();
  const [showTrashIcon, setShowTrashIcon] = React.useState<Boolean>(true);
  const collabRef = useRef<HTMLDivElement>(null);

  const deleteCollaborator = async (collaboratorId: number) => {
    await updateDossier({
      ...dossier,
      collaboratorIds: dossier.collaboratorIds.filter(
        (c) => c !== collaboratorId
      ),
    });
    dossier.collaboratorIds = dossier.collaboratorIds.filter(
      (c) => c !== collaboratorId
    );

    setCollaborators(collaborators?.filter((c) => c.id !== collaboratorId));
  };

  const getUsers = async () => {
    const resCollaborators = await getUsersById(dossier.collaboratorIds);
    setCollaborators(resCollaborators);
  };

  React.useEffect(() => {
    getUsers();
  }, [dossier]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        collabRef.current &&
        !collabRef.current.contains(event.target as Node)
      ) {
        setShowCollabList(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownWrapper}>
      <div
        className={styles.defaultOption}
        onClick={(event) => {
          event.stopPropagation();
          setShowCollabList(!showCollabList);
        }}
      >
        collaborateurs <IoMdArrowDropdown />
      </div>
      {showCollabList && (
        <div className={styles.collaboratorsWrapper} ref={collabRef}>
          {collaborators &&
            collaborators.map((collab, indexItem) => {
              return (
                <div key={indexItem}>
                  <div className={styles.collaboratorItem}>
                    <div style={{ paddingRight: "12px" }}>{collab.email}</div>
                    {collab.id !== index || showTrashIcon ? (
                      <BiTrash
                        size={20}
                        className={styles.trashIcon}
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowTrashIcon(false);
                          setIndex(collab.id);
                        }}
                      />
                    ) : (
                      <div className={styles.deleteBtnGroup}>
                        <div
                          className={styles.confirmBtn}
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteCollaborator(collab.id);
                          }}
                        >
                          Confirmer
                        </div>
                        <div
                          className={styles.cancelBtn}
                          onClick={(event) => {
                            event.stopPropagation();
                            setShowTrashIcon(true);
                          }}
                        >
                          Annuler
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          <div
            className={`${styles.collaboratorItem} ${styles.addCollaborator}`}
          >
            Ajouter un collaborateur
            <AiOutlinePlusCircle
              size={20}
              className={styles.plusIcon}
              onClick={() => {
                setShowCollabList(false);
                setShowDialogue(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorsList;
