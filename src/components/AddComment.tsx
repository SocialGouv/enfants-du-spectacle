import * as React from "react";
import type { CommentaireDataLight } from "src/lib/types";

interface Props {
  dossierId: number;
  savePost: (e: React.FormEvent, formData: CommentaireDataLight) => void;
}

const AddPost: React.FC<Props> = ({ savePost /*, dossierId */ }) => {
  const [formData, setFormData] = React.useState<CommentaireDataLight>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      date: new Date(),
      dossierId: 118,
      text: e.currentTarget.value,
      userId: 8,
    });
  };

  return (
    <form
      className="Form"
      onSubmit={(e) => {
        savePost(e, formData);
      }}
    >
      <div>
        <div className="Form--field">
          <label htmlFor="text">Description</label>
          <input onChange={handleForm} type="text" id="text" />
        </div>
      </div>
      <button
        className="Form__button"
        disabled={formData === undefined ? true : false}
      >
        Add Post
      </button>
    </form>
  );
};

export default AddPost;
