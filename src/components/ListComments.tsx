import { useSession } from "next-auth/react";
import React from "react";
import type { Comments } from "src/lib/fetching/comments";
import { frenchDateHour } from "src/lib/helpers";

import styles from "./ListComments.module.scss";
import { User } from "@prisma/client";
import { getUsersById } from "src/lib/fetching/users";

interface Props {
  comments: Comments[];
}

const ListComments: React.FC<Props> = ({ comments, title }) => {
  return (
    <div className={styles.listComments}>
      {comments.length === 0 ? (
        <span>Aucun commentaire.</span>
      ) : (
        comments
          .sort((a, b) => {
            if (a.date < b.date) {
              return 1;
            }
            if (a.date > b.date) {
              return -1;
            }
            return 0;
          })
          .map((comment) => <CardComment comment={comment} key={comment.id} />)
      )}
    </div>
  );
};

interface CommentsProps {
  comment: Comments;
}

const CardComment: React.FC<CommentsProps> = ({ comment }) => {
  return (
    <div
      className={`${styles.cardComment} ${
        comment.source === "SOCIETE_PROD" ? styles.receivedComment : ""
      }`}
    >
      <div className={styles.headerComment}>
        {comment.sender && <b>{comment.sender}</b>} -{" "}
        {frenchDateHour(comment.date ?? new Date())}
      </div>
      <p
        className={styles.textComment}
        dangerouslySetInnerHTML={{
          __html: comment.text.replace(/\n/g, "<br />"),
        }}
      />
    </div>
  );
};

export default ListComments;
