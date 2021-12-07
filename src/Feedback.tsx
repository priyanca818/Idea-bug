import styled from "styled-components";
import Header from "../src/components/Header";
import { Type2 } from "../src/components/SecondaryTable/SecondaryTable2";
import { Div } from "./components/Div";
export interface IFeedbackContainer { }

const Feedback = (props) => {
  return (
    <>
      <Header />
      <Div mx="auto" width="80%" mt="80px">
        <BasicCard my="20px" height="650px" width="100%">
          {/* <Chart2 /> */}
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

const BasicCard = styled(Div)`
  background: #ffffff;
  box-shadow: 0px 1px 6px #dae0e9;
  border-radius: 7px;
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
