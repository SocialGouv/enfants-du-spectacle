import { Comments } from "@prisma/client";
import React from "react";
import { createComment } from "src/fetching/commentaires";
import { ButtonLink } from "src/uiComponents/button";
import styles from "./InputComments.module.scss";
import useStateContext from "src/context/StateContext";

interface Props {
  dossierId: number;
  title: string;
  enfantId: number | null;
  parentId: number | null;
  sender: string | null;
}

const InputComments: React.FC<Props> = ({
  title,
  dossierId,
  enfantId,
  parentId,
  sender,
}) => {
  const [comment, setComment] = React.useState<string>("");
  const contextDossier = { ...useStateContext() };

  return (
    <>
      <h5 className={styles.h5Spacer}>{title}</h5>
      <div className={styles.InputComments}>
        <textarea
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
            setComment((e.target as HTMLTextAreaElement).value);
          }}
          id="presentation"
          value={comment}
          className={styles.areaText}
        />

        <ButtonLink
          onClick={() => {
            let commentSent: Omit<
              Comments,
              "id" | "userId" | "externalUserId" | "seen"
            > = {
              text: comment,
              source: "SOCIETE_PROD",
              dossierId: dossierId,
              enfantId: enfantId,
              commentsId: parentId,
              sender: sender,
              date: new Date(),
            };
            console.log("length : ", comment.length);
            if (comment.length > 2) {
              createComment(commentSent);
              contextDossier.processEntity("comments", [
                commentSent,
                ...contextDossier.comments,
              ]);
              setComment("");
            }
          }}
        >
          Ajouter un nouveau commentaire
        </ButtonLink>
      </div>
    </>
  );
};

export default InputComments;
