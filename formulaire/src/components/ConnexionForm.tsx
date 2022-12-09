import { Button, ButtonGroup, TextInput } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import React, { useState } from "react";
import styles from "../components/ConnexionForm.module.scss";
import IconLoader from "../components/IconLoader";

const ERROR_MESSAGES = {
  AccessDenied:
    "Vous devez utiliser une adresse mail en @drieets.gouv.fr pour vous connecter",
  Verification:
    "Le lien de connexion est invalide. Il a peut-être déjà été utilisé ou bien a expiré. Veuillez ré-essayer avec un nouveau lien.",
  default: "Erreur lors de la connexion",
};
type ErrorName = keyof typeof ERROR_MESSAGES;

const ConnexionForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { error: errorRaw, callbackUrl } = router.query;
  const error = errorRaw as string;
  const [submitting, setSubmitting] = useState(false);
  const loading = submitting || !router.isReady;
  const { protocol, host } = window.location;
  const defaultCallbackUrl = `${protocol}//${host}/dossiers`;

  const submitSigninForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSubmitting(true);
    signIn("email", {
      callbackUrl: (callbackUrl as string) || defaultCallbackUrl,
      email,
    }).catch((err) => {
      setSubmitting(false);
      window.alert("Une erreur est survenue lors de votre connexion");
      throw err;
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form method="post" action="#" onSubmit={submitSigninForm}>
          <TextInput
            label="Adresse Email"
            type="email"
            id="email"
            name="email"
            placeholder="jean.marc@drieets.gouv.fr"
            className={styles.emailInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <div>
            <ButtonGroup>
              <Button submit={true} disabled={loading}>
                Connexion
                {loading && <IconLoader className={styles.iconLoader} />}
              </Button>
            </ButtonGroup>
          </div>
        </form>
      </div>
      {error && (
        <div className={styles.requiredWrapper}>
          <span role="img" aria-label="avertissement">
            ❌
          </span>
          <span>
            {Object.keys(ERROR_MESSAGES).includes(error)
              ? ERROR_MESSAGES[error as ErrorName]
              : ERROR_MESSAGES.default}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConnexionForm;