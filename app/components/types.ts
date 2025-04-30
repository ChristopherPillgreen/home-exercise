
import React, { ChangeEvent } from 'react';


export interface InputProps {
    compChange?: (value: string) => React.ReactNode;
    voidChange?: (value: string) => void;
    stringChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export interface LinkProps {
    onClick?: () => void;
    href?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export type Plan = {
    planID: number;
    planName: string;
    planDescription: string;
    image: string;
};