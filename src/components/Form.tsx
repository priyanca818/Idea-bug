
import styled from 'styled-components'
import Select from "../components/Select"
import Button from './Buttons';
import Heading from './Heading';

export const FormContainer = styled.div<IFormProps>`

text-align:center;
width:30%;
display:block;
background-color: white;
padding:20px 20px 20px 20px;
box-shadow:0 3px 10px rgb(0 0 0 / 0.2);


textarea{
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
    font-family: "Open Sans";
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

    return (
        <FormContainer{...props} >
    <Heading>submit feedback</Heading>
        <Select
        value='test1'
        options={[
          { value: 'test1', title: 'Share an Idea', accessible: true },
          { value: 'test2', title: 'Report a Bug', accessible: true },

        ]}  
        onChange={() => { }}
      />
            <textarea placeholder="Type here (Max. 140 characters)" name="description"></textarea>
            <Button>SUBMIT</Button>
        </FormContainer>
    )
};

export default Form;












