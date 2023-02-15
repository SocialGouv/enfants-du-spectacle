import { Comments } from "@prisma/client";
import React from "react";
import styles from "./ListComments.module.scss";
import useStateContext from "src/context/StateContext";
import { frenchDateHour } from "src/lib/helpers";

interface Props {
    title: string,
    comments: Comments[]
}

const ListComments: React.FC<Props> = ({ comments, title }) => {

    return (
        <div className={styles.listComments}>
        
            <h5>{title}</h5>

            {comments.length === 0 ?
            <span>Aucun commentaire.</span>
            :
            comments.map((comment) => (
                <CardComment comment={comment} key={comment.id}></CardComment>
            ))}
        </div>
    );
};

interface CommentsProps {
    comment: Comments
}

const CardComment: React.FC<CommentsProps> = ({ comment }) => {
    return (
        <div className={`${styles.cardComment} ${comment.source === 'INSTRUCTEUR' ? styles.receivedComment : ''}`}>
            <div className={styles.headerComment}>
                <b>Commentaire</b> - {frenchDateHour(comment.date ?? new Date())}
            </div>
            <p className={styles.textComment} dangerouslySetInnerHTML={{ __html: comment.text.replace(/\n/g,"<br />") }}></p>
        </div>
    )
}

export default ListComments;
