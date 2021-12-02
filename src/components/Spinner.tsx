import React from 'react';


import styled from 'styled-components';

export const SpinnerContainer = styled.div<{ color?: string, size?: string, radius?: string, }>`
  /*
  * dots
  */
  .spinner {
    /* margin: 100px auto 0; */
    /* width: 200px; */
    display        : flex;
    text-align     : center;
    align-items    : center;
    justify-content: space-around;
  }

  .spinner > div {
    width           : ${(props) => (props.size ? props.size : '18px')};
    height          : ${(props) => (props.size ? props.size : '18px')};
    background-color: ${(props) => (props.color ? props.color : '#fff')};

    display          : inline-block;
    animation        : sk-bouncedelay 1.4s infinite ease-in-out both;
    border-radius    : ${(props) => (props.radius ? props.radius : '100%')};

    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    animation-delay        : -0.32s;
    -webkit-animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    animation-delay        : -0.16s;
    -webkit-animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform        : scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform        : scale(1);
    }
  }

  /*
 * circle
 */
  .sk-chase {
    width    : ${(props) => (props.size ? props.size : '40px')};
    height   : ${(props) => (props.size ? props.size : '40px')};
    position : relative;
    animation: sk-chase 2.5s infinite linear both;
  }

  .sk-chase-dot {
    top      : 0;
    left     : 0;
    width    : 100%;
    height   : 100%;
    position : absolute;
    animation: sk-chase-dot 2s infinite ease-in-out both;
  }

  .sk-chase-dot:before {
    content         : '';
    width           : 25%;
    height          : 25%;
    display         : block;
    animation       : sk-chase-dot-before 2s infinite ease-in-out both;
    border-radius   : 100%;
    background-color: ${(props) => (props.color ? props.color : '#fff')};
  }

  .sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
  }
  .sk-chase-dot:nth-child(2) {
    animation-delay: -1s;
  }
  .sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
  }
  .sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
  }
  .sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
  }
  .sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
  }
  .sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
  }
  .sk-chase-dot:nth-child(2):before {
    animation-delay: -1s;
  }
  .sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
  }
  .sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
  }
  .sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
  }
  .sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
  }

  @keyframes sk-chase {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
`;





export type SpinnerProps = {
  type?: 'circle' | 'dots';
  size?: string;
  color?: string;
  radius?: string;
  style?: React.CSSProperties;
};
export const Spinner: React.FC<SpinnerProps> = ({
  type,
  color,
  style,
  size,
  radius,
}) => {
  const circularSpinner = (
    <div className='sk-chase' style={style}>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
      <div className='sk-chase-dot'></div>
    </div>
  );

  const dots = (
    <div className='spinner' style={style}>
      <div className='bounce1'></div>
      <div className='bounce2'></div>
      <div className='bounce3'></div>
    </div>
  );

  let spinner: JSX.Element;

  switch (type) {
    case 'circle': {
      spinner = circularSpinner;
      break;
    }
    case 'dots': {
      spinner = dots;
      break;
    }
    default:
      spinner = dots;
  }

  return (
    <SpinnerContainer size={size} color={color} radius={radius}>
      {spinner}
    </SpinnerContainer>
  );
};

export default Spinner;
