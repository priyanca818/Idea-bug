import styled from "styled-components";
import Select from "../components/Select";
import Button from "./Buttons";
import { Heading } from "./Heading";
import { useState } from "react";

export const FormContainer = styled.div`
  border-radius: 7px;
  width: 300px;
  background-color: white;
  padding: 20px 20px 20px 20px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.6);

  position: absolute;
  top: calc(100% + 5px);
  left: -230px;

  textarea {
    font-family: "Open Sans", sans-serif;
    margin-top: 10px;
    border-color: rgb(218, 224, 233);
    overflow: auto;
    padding: 11px 12px;
    box-sizing: border-box;
    height: 120px;
    width: 100%;
    border: 1px solid #dae0e9;
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
`;

export interface IFormProps {
}

const Form: React.FC<IFormProps> = (props) => {
    const [type, setType] = useState<string | null>(null);

    return (
        <FormContainer>
            <Heading heading="Submit Feedback" />
            <Select
                placeholder="Select Type"
                value={type}
                options={[
                    { value: "idea", title: "Share an Idea", accessible: true },
                    { value: "bug", title: "Report a Bug", accessible: true },
                ]}
                onChange={(d) => {
                    console.log(d);
                    setType(d as string | null);
                }}
            />
            <textarea
                placeholder="Type here (Max. 140 characters)"
                name="description"
            ></textarea>
            <Button>SUBMIT</Button>
        </FormContainer>
    );
};

export default Form;
