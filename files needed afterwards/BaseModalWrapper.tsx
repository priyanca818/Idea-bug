import React, { MouseEventHandler, ReactNode } from 'react'
import Modal from './Modal';



export interface BaseModalWrapperProps {
    isModalVisible: boolean;
    onBackdropClick: () => void;
    message?: string;
    content?: ReactNode;
}

interface ComponentsProps {
    ContainerComponent: React.ComponentType<{}>;
    CloseButtonComponent: React.ComponentType<{
        onClick?: MouseEventHandler<any>;
    }>;
}

type Props = BaseModalWrapperProps & ComponentsProps;

const BaseModalWrapper: React.FC<Props> = ({ isModalVisible, onBackdropClick }) => {

    if (!isModalVisible) {
        return null
    }

    return (

        <Modal onBackdropClick={onBackdropClick} />
    );
}

export default BaseModalWrapper