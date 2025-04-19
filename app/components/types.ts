export interface InputProps {
    onChange: (value: string) => void;
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