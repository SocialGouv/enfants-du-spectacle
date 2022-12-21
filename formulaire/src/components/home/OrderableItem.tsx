import { Dossier, Enfant } from "@prisma/client";
import Image from "next/image";
import React from "react";
import styles from "./OrderableItem.module.scss";

interface Props {
    text: string,
    termToOrder: keyof Dossier | keyof Enfant
    termOrdered: keyof Dossier | keyof Enfant
    order?: 'asc' | 'desc'
    action: (term: keyof Dossier | keyof Enfant) => void
}

const OrderableItem: React.FC<Props> = ({ text, termToOrder, termOrdered, order, action }) => {

    return (
        <div className={styles.orderableItem} onClick={() => {action(termToOrder)}}>
            {termToOrder === termOrdered &&
                <Image
                    src={`/images/${order === 'asc' ? 'arrow-down' : 'arrow-up'}.svg`}
                    alt="Institut Français"
                    width={15}
                    height={15}
                />
            }
            {text}
        </div>
    );
};

export default OrderableItem;