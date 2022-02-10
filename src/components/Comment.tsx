//import { Commentaire } from "@prisma/client";
import * as React from "react";
import styles from "src/components/Commentaires.module.scss";
import { frenchDateHour } from "src/lib/helpers";
import type { CommentaireData } from "src/lib/types";

interface Props {
  comment: CommentaireData;
  deletePost: (id: number) => void;
}

const Post: React.FC<Props> = ({ comment, deletePost }) => {
  return (
    <>
      <div>
        <div className={styles.commentSummaryBloc}>
          <div className={styles.name}>
            {comment.user?.prenom} {comment.user?.nom}
          </div>
          <div>
            posté le{" "}
            <span className={styles.date}>{frenchDateHour(comment.date)}</span>
          </div>
        </div>
        {comment.text}
      </div>
      <button
        className="Card__button"
        onClick={() => {
          deletePost(comment.id);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default Post;
