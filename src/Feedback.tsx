
import Form from '../src/components/Form';
import SecondaryTable from './components/SecondaryTable';
import {paymentHeaderData, paymentRowData} from "../src/components/TableData"
import Chart2 from "../src/components/Chart2"
import { Container } from './BudgetView/advertisingAnalytics.styles';
import styled from 'styled-components';




    
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
<FeedbackContainer>
<Form/>
    <Container>

    <Chart2/>
    </Container>


<SecondaryTable
headerData={paymentHeaderData}
rowData={paymentRowData}
tableType='title'
title='Idea and Bugs'
wrapperStyles={{ width: '90%', height: '550px', }}
/>
</FeedbackContainer>
</>
  );
    };




export default Feedback; 
