
import styled from "styled-components";
import Chart from "../components/Chart";

export const TableContainer = styled.div<ITableContainerProps>`

`

export interface ITableContainerProps {


}


const Table : React.FC<ITableContainerProps> = (props) => {

    return (
   
        <TableContainer{...props} >
        <Chart></Chart>
        </TableContainer>
  
    )
};

export default Table;