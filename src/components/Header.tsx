
import styled from 'styled-components'
import Heading from './Heading'
export const HeaderContainer = styled.div<IHeaderProps>`

position: fixed;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgb(218, 224, 233);
    z-index: 10;
    background: white;
    top: 0px;
    left: 0px;
    color: rgb(34, 34, 34);
    font-family: "Open Sans", sans-serif;
    align-content: center;
    font-weight: 600;



    .pageName{
        align-content: center;
        margin-left: 70px;
        margin-top: 20px;
    }


/*     height:40px;
text-align: center;
background-color: #ffffff;
color: Blue;
  border-width: 2px;
  font-size: 30px;
  box-shadow:0 3px 10px rgb(0 0 0 / 0.2);
  margin-top: -5px;
  width:100%; */

`


export interface IHeaderProps {


}



export const Header: React.FC<IHeaderProps> = (props) => {



    return (
<>
<HeaderContainer>
    <div className='pageName'>
<Heading 
 headingFontSize={20}
        margin-left="83px"
        heading='Feedback'/>
        </div>
</HeaderContainer>
</>

    )
};

export default Header;









