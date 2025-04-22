
import React, { ChangeEvent } from 'react';


export interface InputProps {
    compChange?: (value: string) => React.ReactNode;
    voidChange?: (value: string) => void;
    stringChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export interface aProps {
    onClick?: () => void;
    href?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}