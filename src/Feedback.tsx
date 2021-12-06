
import Form from '../src/components/Form';
import SecondaryTable from './components/SecondaryTable';
import { paymentHeaderData, paymentRowData } from "../src/components/TableData"
import Chart2 from "../src/components/Chart2"
import { Container } from './BudgetView/advertisingAnalytics.styles';
import styled from 'styled-components';
import Header from '../src/components/Header'
import {The1440Window, PageWindow} from './pages.styles'
import {Type2} from "../src/components/SecondaryTable/SecondaryTable2"
import Modal from './components/Modal';





export const FeedbackContainer = styled.div<IFeedbackContainer>`
    body{
      background-color: #f0f3f7;
    }

width:100%;
height:150%;
background-color: #f0f3f7;
    `

export interface IFeedbackContainer {


}

const Feedback: React.FC<IFeedbackContainer> = (props) => {




  return (
    <>
 <PageWindow>
      <FeedbackContainer>
      <The1440Window>
        <Header />
        <Form />
        <Container>

          <Chart2 />
        </Container>

<Type2/>

{/*         <SecondaryTable
          headerData={paymentHeaderData}
          rowData={paymentRowData}
          tableType='title'
          title='Idea and Bugs'
          wrapperStyles={{ width: '95%', height: '550px', }}
        /> */}


<Modal display="none"></Modal>
           </The1440Window>
      </FeedbackContainer>
      </PageWindow>
    </>
  );
};




export default Feedback;
