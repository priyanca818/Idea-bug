


import styled from "styled-components";
import Heading from "./Heading"

export const TableContainer = styled.div<ITableContainerProps>`

 background-color: red;
`

export interface ITableContainerProps {


}


const Table : React.FC<ITableContainerProps> = (props) => {

    return (
        <TableContainer{...props} >
<Heading>Ideas and Bugs</Heading>
        </TableContainer>
    )
};

export default Table;