import React from 'react'

import styled from 'styled-components'
import Select from "../components/Select"
import Button from './Buttons';
import {useState} from 'react'
import Form from './Form';

export const ModalContainer = styled.div<IModalProps>`
.Popup{
    display: none;
}



`


export interface IModalProps {

    display: string
}



const Modal: React.FC<IModalProps> = (props) => {
    const [disp, setDisp] = useState<boolean>(false)


    return (
        <>
<ModalContainer display="none">
 <button
  onClick={() => {
   setDisp ((disp) => !disp);
   
}} 
 >  show</button>
 </ModalContainer>
 </>
    )


};



export default Modal;

