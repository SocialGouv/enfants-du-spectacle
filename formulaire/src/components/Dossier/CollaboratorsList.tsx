import { Dossier, User } from "@prisma/client";
import React from "react";
import { getUsersById } from "src/fetching/users";
import styles from "./HeadingDossier.module.scss";
import { BiTrash } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { updateDossier } from "src/fetching/dossiers";

interface Props {
  dossier: Dossier;
}

const CollaboratorsList: React.FC<Props> = ({ dossier }) => {
  const [collaborators, setCollaborators] = React.useState<User[]>();
  const [showCollabList, setShowCollabList] = React.useState<Boolean>(false);
  const [index, setIndex] = React.useState<number>();
  const [showTrashIcon, setShowTrashIcon] = React.useState<Boolean>(true);

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
    if (dossier.collaboratorIds.length) {
      const resCollaborators = await getUsersById(dossier.collaboratorIds);
      setCollaborators(resCollaborators);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.dropdownWrapper}>
      <div
        className={styles.defaultOption}
        onClick={() => setShowCollabList(!showCollabList)}
      >
        collaborateurs <IoMdArrowDropdown />
      </div>
      {showCollabList && collaborators && collaborators?.length > 0 && (
        <div className={styles.collaboratorsWrapper}>
          {collaborators.map((collab, indexItem) => {
            return (
              <div key={indexItem}>
                <div className={styles.collaboratorItem}>
                  <div style={{ paddingRight: "12px" }}>{collab.email}</div>
                  {collab.id !== index || showTrashIcon ? (
                    <BiTrash
                      size={20}
                      className={styles.trashIcon}
                      onClick={() => {
                        setShowTrashIcon(false);
                        setIndex(collab.id);
                      }}
                    />
                  ) : (
                    <div className={styles.deleteBtnGroup}>
                      <div
                        className={styles.confirmBtn}
                        onClick={() => deleteCollaborator(collab.id)}
                      >
                        Confirmer
                      </div>
                      <div
                        className={styles.cancelBtn}
                        onClick={() => setShowTrashIcon(true)}
                      >
                        Annuler
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollaboratorsList;
