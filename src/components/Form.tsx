
import styled from 'styled-components'
import Select from "../components/Select"
import Button from './Buttons';
import  {Heading_Basic} from './Heading';
import {useState} from 'react'

export const FormContainer = styled.div<IFormProps>`

text-align:center;
width:25%;
display:block;
background-color: white;
padding:20px 20px 20px 20px;
box-shadow:0 3px 10px rgb(0 0 0 / 0.2);
margin-bottom: 50px;

textarea{
    font-family:"Open Sans", sans-serif;
margin-top: 10px;
border-color: rgb(218, 224, 233);
    overflow: auto;
    padding: 11px 12px;
    box-sizing: border-box;
    height: 120px;
    width: 100%;
    border: 1px solid #DAE0E9;
    border-radius: 7px;
    background-color: rgb(255, 255, 255);
    color: rgb(34, 34, 34);
    font-size: 13px;
    letter-spacing: -0.1px;
    line-height: 19px;
    font-weight: 400;
    outline: none;
    resize: none;
}


`


export interface IFormProps {


}



const Form: React.FC<IFormProps> = (props) => {

    const [type, setType] = useState<string|null>(null)
//string/null - the value will be either one
//type - in which the value will come after rendering
//settype - the value we give in the onchange function after which will be automatic after selection
//which is either string or null

    return (
        <FormContainer{...props} >
    <Heading_Basic/>
  

        <Select
        placeholder='Select Type'
        value={type}
        options={[
          { value: 'idea', title: 'Share an Idea', accessible: true },
          { value: 'bug', title: 'Report a Bug', accessible: true },

        ]}  
        onChange={(d) => {console.log(d);
        setType(d as (string | null)) }} //d is the parameter which can be anything from the select options
      />
      
            <textarea placeholder="Type here (Max. 140 characters)" name="description"></textarea>
            <Button>SUBMIT</Button>
        </FormContainer>
    )
};

export default Form;









