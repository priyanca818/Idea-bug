
import styled from "styled-components";


export const TableContainer = styled.div<ITableContainerProps>`

`

export interface ITableContainerProps {


}


const Table : React.FC<ITableContainerProps> = (props) => {

    return (
   
        <TableContainer{...props} >
        </TableContainer>
  
    )
};

export default Table;