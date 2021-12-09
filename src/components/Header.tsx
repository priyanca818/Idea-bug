import styled from "styled-components";
import Form from "./Form";
import { useState } from "react";
import { Div } from "./Div";
import Button, { themes } from "./Buttons";

export const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible((isModalVisible) => !isModalVisible);
  };

  return (
    <HeaderContainer id="HeaderContainer" pl="30px" pr="10px">
      <LeftDiv id="LeftDiv">
        <HeadingText>FeedBack</HeadingText>
      </LeftDiv>
      <RightDiv id="RightDiv">
        <Div position="relative">
          <Button theme={themes.normal} text="Share Idea/Bug" onClick={toggleModal} />
          {isModalVisible && <Form />}
        </Div>
      </RightDiv>
    </HeaderContainer>
  );
};

export default Header;

const HeadingText = styled.span`
  font-size: 20px;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
`;

const HeaderContainer = styled(Div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  background-color: white;
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  font-family: "Open Sans", sans-serif;
  box-shadow:0 3px 10px rgb(0 0 0 / 0.05);
`;

const LeftDiv = styled.div``;

const RightDiv = styled.div``;

