//import { Icon, Title } from "@dataesr/react-dsfr";
import type { Commentaire } from "@prisma/client";
import React from "react";
import AddComment from "src/components/AddComment";
import Comment from "src/components/Comment";
//import styles from "src/components/Commentaires.module.scss";
import CommentairesActionBar from "src/components/CommentairesActionBar";
import { createCommentaire, deleteCommentaire } from "src/lib/queries";
//import { frenchDateHour } from "src/lib/helpers";
import type { CommentaireData } from "src/lib/types";

interface Props {
  dossierId: number;
  commentaires: Commentaire[];
}

const Commentaires: React.FC<Props> = ({ dossierId, commentaires }) => {
  const [commentsList, setCommentsList] =
    React.useState<CommentaireData[]>(commentaires);

  const addComment = (e: React.FormEvent, formData: CommentaireData) => {
    e.preventDefault();
    const comment: CommentaireData = {
      date: formData.date,
      dossierId: formData.dossierId,
      text: formData.text,
      userId: formData.userId,
    };
    createCommentaire(comment);
    comment.user = formData.user;
    setCommentsList([comment, ...commentsList]);
  };

  const deletePost = (id: number) => {
    const commentsListTmp: CommentaireData[] = commentsList.filter(
      (comment: Commentaire) => comment.id !== id
    );
    setCommentsList(commentsListTmp);
    deleteCommentaire(id);
  };

  return (
    <>
      <CommentairesActionBar dossierId={dossierId} />
      <h2>Commentaires instructeur</h2>
      <AddComment savePost={addComment} dossierId={dossierId} />
      {commentsList.length == 0 && <span>Aucun commentaire</span>}
      {commentsList.length > 0 && (
        <>
          {commentsList
            .sort((a, b) => {
              if (a.date < b.date) {
                return 1;
              }
              if (a.date > b.date) {
                return -1;
              }
              return 0;
            })
            .map((comment: CommentaireData) => (
              <Comment
                key={comment.id}
                index={comment.id}
                deletePost={deletePost}
                comment={comment}
              />
            ))}
        </>
      )}
    </>
  );
};

export default Commentaires;
