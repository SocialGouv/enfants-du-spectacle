import React from "react";
import { Comments, createComment } from "src/lib/fetching/comments";
import styles from "./InputComments.module.scss";
import { ButtonLink } from "./uiComponents/button";

interface Props {
  dossierId: number;
  enfantId: number | null;
  parentId: number | null;
  sender: string | null;
  action: (comment: Omit<Comments, "id">) => void;
}

const InputComments: React.FC<Props> = ({
  dossierId,
  enfantId,
  parentId,
  action,
  sender,
}) => {
  const [comment, setComment] = React.useState<string>("");

  return (
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
          let commentSent: Omit<Comments, "id"> = {
            text: comment,
            source: "INSTRUCTEUR",
            dossierId: dossierId,
            sender: sender,
            enfantId: enfantId,

            date: new Date(),
          };
          console.log("length : ", comment.length);
          if (comment.length > 2) {
            createComment(commentSent);
            action(commentSent);
            setComment("");
          }
        }}
      >
        Ajouter un nouveau commentaire
      </ButtonLink>
    </div>
  );
};

export default InputComments;
