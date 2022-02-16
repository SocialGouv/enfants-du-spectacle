//import { Commentaire } from "@prisma/client";
import * as React from "react";
import styles from "src/components/Comment.module.scss";
import { frenchDateHour } from "src/lib/helpers";
import type { CommentaireData } from "src/lib/types";

interface Props {
  comment: CommentaireData;
  index: number;
  deletePost: (id: number) => void;
}

const Post: React.FC<Props> = ({ comment, index, deletePost }) => {
  return (
    <>
      <div key={index} className={styles.bloc}>
        <div className={styles.commentSummaryBloc}>
          <div className={styles.name}>
            {comment.user?.prenom} {comment.user?.nom}
          </div>
          <div className={styles.dateBloc}>
            <span>posté le </span>
            <span className={styles.date}>{frenchDateHour(comment.date)}</span>
            <button
              className={styles.deleteComment}
              onClick={() => {
                deletePost(comment.id);
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />
        </div>
      </div>
    </>
  );
};

export default Post;
