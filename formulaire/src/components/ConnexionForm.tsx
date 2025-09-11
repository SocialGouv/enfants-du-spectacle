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

  const submitSigninForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    
    try {
      // Étape 1 : Préparer le nonce et le cookie
      const prepareResponse = await fetch('/api/auth/prepare-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!prepareResponse.ok) {
        throw new Error('Erreur lors de la préparation de la connexion');
      }

      const { nonce } = await prepareResponse.json();

      // Étape 2 : Déclencher NextAuth
      await signIn("email", {
        callbackUrl: (callbackUrl as string) || defaultCallbackUrl,
        email,
        // On stocke le nonce temporairement pour que sendVerificationRequest puisse l'utiliser
        redirect: false,
      });

      // Rediriger vers la page de vérification après succès
      router.push('/verifyRequest');
    } catch (err) {
      setSubmitting(false);
      console.error('Erreur lors de la connexion:', err);
      window.alert("Une erreur est survenue lors de votre connexion");
    }
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
