import { useSession } from "next-auth/react";
import * as React from "react";
import styles from "src/components/AddComment.module.scss";
import type { CommentaireDataLight } from "src/lib/types";

interface Props {
  dossierId: number;
  savePost: (e: React.FormEvent, formData: CommentaireDataLight) => void;
}

const AddPost: React.FC<Props> = ({ savePost, dossierId }) => {
  const [formData, setFormData] = React.useState<CommentaireDataLight>();
  const { data: session } = useSession();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      date: new Date(),
      dossierId: dossierId,
      text: e.currentTarget.value.replace(/\n/g, "<br />"),
      user: session?.dbUser,
      userId: session?.dbUser.id,
    });
  };

  return (
    <form
      className={styles.Form}
      onSubmit={(e) => {
        setFormData({
          ...formData,
          date: new Date(),
          dossierId: dossierId,
          text: "",
          user: session?.dbUser,
          userId: session?.dbUser.id,
        });
        e.currentTarget.value = "";
        savePost(e, formData);
      }}
    >
      <div>
        <div className="Form--field">
          <textarea
            onChange={handleForm}
            type="textarea"
            id="text"
            className={styles.areaText}
          />
        </div>
      </div>
      <button
        className="postButton"
        disabled={formData === undefined || formData.text === "" ? true : false}
      >
        Poster
      </button>
    </form>
  );
};

export default AddPost;
