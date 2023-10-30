import { Comments } from "@prisma/client";
import React from "react";
import styles from "./ListComments.module.scss";
import { frenchDateHour } from "src/lib/helpers";

interface Props {
  comments: Comments[];
}

const ListComments: React.FC<Props> = ({ comments }) => {
  return (
    <>
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
            .map((comment) => (
              <CardComment comment={comment} key={comment.id}></CardComment>
            ))
        )}
      </div>
    </>
  );
};

interface CommentsProps {
  comment: Comments;
}

const CardComment: React.FC<CommentsProps> = ({ comment }) => {
  return (
    <div
      className={`${styles.cardComment} ${
        comment.source === "INSTRUCTEUR" ? styles.receivedComment : ""
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
      ></p>
    </div>
  );
};

export default ListComments;
