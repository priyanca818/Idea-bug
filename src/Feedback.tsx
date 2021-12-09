import styled from "styled-components";
import Header from "../src/components/Header";
import { Type2 } from "../src/components/SecondaryTable/SecondaryTable2";
import { Div } from "./components/Div";
import Chart2 from "./components/Chart2";

const Feedback = (props) => {
  return (
    <>
      <Header />
      <Div mx="auto" width="80%" mt="80px" mb="40px">
        <BasicCard my="30px" height="600px" width="100%" padding="20px">
          <Chart2 />
        </BasicCard>
        <Type2 />
      </Div>
    </>
  );
};

export const BasicCard = styled(Div)`
  background: #ffffff;
  box-shadow: 0px 1px 6px #dae0e9;
  border-radius: 7px;
  margin-bottom:50px;
`;

export default Feedback;
