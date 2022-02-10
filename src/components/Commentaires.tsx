//import { Icon, Title } from "@dataesr/react-dsfr";
import type { Commentaire } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import AddComment from "src/components/AddComment";
import Comment from "src/components/Comment";
//import styles from "src/components/Commentaires.module.scss";
import CommentairesActionBar from "src/components/CommentairesActionBar";
import IconLoader from "src/components/IconLoader";
import { useCommentaires /*useDossier*/ } from "src/lib/api";
//import { frenchDateHour } from "src/lib/helpers";
import type { CommentaireData, CommentaireDataLight } from "src/lib/types";

interface Props {
  dossierId: number;
}

const Commentaires: React.FC<Props> = ({ dossierId }) => {
  /*const { commentaires, isLoading, isError } = useCommentaires(dossierId);
  const { data: session } = useSession();

  const registerUser = async event => {
    event.preventDefault() 
    const res = await fetch('/api/commentaires', {
      body: JSON.stringify({
        text: event.target.name,
        date: new Date(),
        userId: 8,
        user: '',
        dosierId: 118,
        dossier: ''
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
  }

  if (isLoading) return <IconLoader />;
  if (isError || !commentaires) return <Icon name="ri-error" />;*/

  const { commentaires, isLoading, isError } = useCommentaires(dossierId);
  const [commentsList, setCommentsList] =
    React.useState<CommentaireData[]>(commentaires);
  const { data: session } = useSession();

  const addComment = (e: React.FormEvent, formData: CommentaireDataLight) => {
    console.log("test");
    e.preventDefault();
    const comment: CommentaireData = {
      date: new Date(),
      dossierId: 118,
      id: Math.random(),
      text: formData.text,
      userId: 8,
    };
    setCommentsList([comment, ...commentsList]);
  };

  const deletePost = (id: number) => {
    const commentsListTmp: CommentaireData[] = commentsList.filter(
      (comment: Commentaire) => comment.id !== id
    );
    console.log(commentsListTmp, isError, session);
    setCommentsList(commentsListTmp);
  };

  if (isLoading) return <IconLoader />;

  /*if (!commentsList)
    return (
      <>
        <CommentairesActionBar dossierId={dossierId} />
        <AddComment savePost={addComment} dossierId={dossierId} />
        <h1>Loading...</h1>
      </>
    );*/

  return (
    <>
      <CommentairesActionBar dossierId={dossierId} />
      <h1>My posts</h1>
      <AddComment savePost={addComment} dossierId={dossierId} />
      {commentsList.map((comment: CommentaireData) => (
        <Comment key={comment.id} deletePost={deletePost} comment={comment} />
      ))}
    </>
  );

  /*return (
    <CommentairesActionBar dossierId={dossierId} />
    
  );

  /*return (
    <>
      <CommentairesActionBar dossierId={dossierId} />

      <h3>Commentaires</h3>
      
      <form onSubmit={registerUser}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
        <button type="submit">Register</button>
      </form>

      {commentaires.length == 0 && <span>Aucun commentaire</span>}
      {commentaires.map((comment, index) => (
        <div key={index} className={styles.bloc}>
          <div className={styles.commentSummaryBloc}>
            <div className={styles.name}>{comment.user?.prenom} {comment.user?.nom}</div>
            <div>posté le <span className={styles.date}>{frenchDateHour(comment.date)}</span></div>
          </div>
          {comment.text}
        </div>
      ))}
    </>
  );*/
};

export default Commentaires;
