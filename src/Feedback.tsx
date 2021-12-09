import styled from "styled-components";
import Header from "../src/components/Header";
import { Type2 } from "../src/components/SecondaryTable/SecondaryTable2";
import { Div } from "./components/Div";
import Chart2 from "./components/Chart2";



export interface IFeedbackContainer { }


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

  // <PageWindow>
  //   <The1440Window>
  //   </The1440Window>
  // </PageWindow>

  // return (
  //   <>
  //     <PageWindow>
  //       <FeedbackContainer>
  //         <The1440Window>
  //           <Header >
  //           </Header>
  //           <Container>

  //             <Chart2 />
  //           </Container>

  //           <Type2 />

  //           {/*         <SecondaryTable
  //           headerData={paymentHeaderData}
  //           rowData={paymentRowData}
  //           tableType='title'
  //           title='Idea and Bugs'
  //           wrapperStyles={{ width: '95%', height: '550px', }}
  //         /> */}

  //         </The1440Window>
  //       </FeedbackContainer>
  //     </PageWindow>
  //   </>
  // );
};

export const BasicCard = styled(Div)`
  background: #ffffff;
  box-shadow: 0px 1px 6px #dae0e9;
  border-radius: 7px;
  margin-bottom:50px;
`;

// type TetDivProps = {
//   height: number;
//   width: number;
// };

// const TestDiv = styled.div<TetDivProps>`

// background-color: red;

// width:${({ width }) => width}px;
// height:${({ height }) => height}px;
// `;

export default Feedback;
