import React from 'react';
import IconLoader from 'src/components/IconLoader';
import styles from "./buttonStyle.module.scss";

interface IProps {
  href?: string;
  alt?: boolean;
  rel?: string;
  target?: string;
  disabled?: boolean;
  light?: boolean; 
  loading?: boolean;
  size?: 'small' | null | 'large';
  onClick?: (() => void) | undefined;
  type?: 'button' | 'submit' | 'reset';
  download?: string;
  children: React.ReactNode
}

interface ILinkProps {
  href: string;
  alt?: boolean;
  rel?: string;
  target?: string;
  disabled?: boolean;
  download?: string;
  light?: boolean; 
  loading?: boolean;
  size?: 'small' | null | 'large';
  onClick?: (() => void) | undefined;
  children: React.ReactNode
}

interface IButtonProps {
  alt?: boolean;
  disabled?: boolean;
  size?: 'small' | null | 'large';
  light?: boolean; 
  loading?: boolean;
  onClick?: (() => void) | undefined;
  type: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode
}

const LinkAsAButton: React.FC<ILinkProps> = ({
  href,
  alt,
  rel,
  target,
  disabled,
  children,
  download,
  size,
  loading,
  light,
  onClick = () => {},
}) => (
  <a
    rel={rel}
    target={target}
    onClick={onClick}
    className={light ? styles.buttonLinkLight : styles.buttonLink}
    href={href}
    download={download}
  >
    <div className={styles.contentWrapper}>{children}</div>
  </a>
);

const ClassicButton: React.FC<IButtonProps> = ({
  type,
  onClick,
  alt,
  size,
  disabled,
  children,
  loading,
  light,
}) => (
  <button
    onClick={onClick}
    type={type}
    disabled={loading}
    className={ light ? styles.buttonLinkLight : styles.buttonLink}
  >
    <div className={styles.contentWrapper}>
      {(() => {
        switch (loading) {
          case true: 
            return <IconLoader size={40} text={`chargement ...`}/>
          default: 
            return children
        }
      })()}
    </div>
  </button>
);

const ButtonLink: React.FC<IProps> = ({
  href,
  alt,
  rel,
  target,
  disabled,
  children,
  size,
  type,
  onClick,
  download, 
  loading,
  light
}) => {
  if (href) {
    return (
      <LinkAsAButton
        href={href}
        rel={rel}
        target={target}
        alt={alt}
        disabled={disabled}
        size={size}
        light={light}
        onClick={onClick}
        download={download}
      >
        {children}
      </LinkAsAButton>
    );
  }
  if (onClick || type) {
    return (
      <ClassicButton
        onClick={onClick}
        type={type}
        light={light}
        loading={loading}
        alt={alt}
        disabled={disabled}
        size={size}
      >
        {children}
      </ClassicButton>
    );
  }
  throw new Error('Should not happen');
};

export default ButtonLink;