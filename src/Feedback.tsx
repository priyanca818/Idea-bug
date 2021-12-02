
import Form from '../src/components/Form';
import SecondaryTable from './components/SecondaryTable';
import {paymentHeaderData, paymentRowData} from "../src/components/TableData"
import Chart from '../src/components/Chart'


const Feedback = () => {

  return (
    <>
<Chart/>
     <Form/>

<SecondaryTable
headerData={paymentHeaderData}
rowData={paymentRowData}
tableType='title'
title='Idea and Bugs'
wrapperStyles={{ width: '90%', height: '550px', }}
/>
</>
  )
};


export default Feedback