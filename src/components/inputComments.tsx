import React from "react";
import { Comments } from "src/lib/fetching/comments";
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
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const submitComment = async (commentText: string) => {
    if (commentText.length <= 2 || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Create the comment data with all required fields
      const commentData = {
        text: commentText,
        source: "INSTRUCTEUR",
        enfantId: enfantId,
        sender: sender || "Utilisateur",
        date: new Date(),
        seen: true
      };
            
      const response = await fetch(`/api/dossier-comments/${dossierId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      
      // Get the response body for error details
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error("Server response:", responseData);
        throw new Error(`Error submitting comment: ${response.status} - ${responseData.details || responseData.error || 'Unknown error'}`);
      }
      
      // If successful, update the UI
      action(responseData);
      setComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("Échec de l'envoi du commentaire. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.InputComments}>
      <textarea
        onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
          setComment((e.target as HTMLTextAreaElement).value);
        }}
        id="presentation"
        value={comment}
        className={styles.areaText}
        disabled={isSubmitting}
      />

      <ButtonLink
        onClick={() => submitComment(comment)}
        disabled={isSubmitting || comment.length <= 2}
      >
        {isSubmitting ? "Envoi en cours..." : "Ajouter un nouveau commentaire"}
      </ButtonLink>
    </div>
  );
};

export default InputComments;
