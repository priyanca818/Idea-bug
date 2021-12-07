import React from 'react'
import Form from './Modal'






interface ModalWrapperProps{

    isModalVisible:boolean
    onBackdropClick : () => void;
}

const ModalForm: React.FC<ModalWrapperProps> = ({onBackdropClick, isModalVisible }) => {
if(!isModalVisible)
{
    return null;
}


return (

<Form onBackdropClick = {onBackdropClick}/>

);


}   





export default ModalForm








