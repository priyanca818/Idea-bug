import * as React from 'react';
import styled, { css } from 'styled-components';

import vars from '../styles/vars';

export interface IButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSetColumnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDownloadClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  text?: string;
  icon?: string;
  theme?: themes;
  styles?: {};
  textStyles?: {};
  imageStyles?: {};
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  focusBackgroundColor?: string;
  disabledBackgroundColor?: string;
  type?: 'button' | 'submit' | 'reset';
  elemRef?: React.RefObject<HTMLButtonElement>;
  id?: string;
  focus?: boolean;
  className?:string;
}

export enum themes {
  normal,
  outlined,
  text,
  iconOutlined,
  iconSubtle,
  iconProminent,
  nonGradient,
}

const CommonButton = styled.button<{
  hoverBackgroundColor: string;
  focusBackgroundColor: string;
  disabledBackgroundColor: string;
  focus?: boolean;
  backgroundColor: string;
}>`
  font-family: 'Open Sans';
  font-size: 11px;
  font-weight: bold;
  letter-spacing: -0.1px;
  line-height: 15px;
  text-align: center;
  height: 35px;
  width: 110px;
  border: none;
  border-radius: 7px;

  &:hover {
    cursor: pointer;
  }
`;

const ICON = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconButton = styled.button<{
  hoverBackgroundColor: string;
  focusBackgroundColor: string;
  disabledBackgroundColor: string;
  focus?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  width: 34px;
  border: 1px solid #dae0e9;
  border-radius: 7px;
  background-color: rgba(250, 251, 253, 0);
  font-family: Open Sans, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.1px;
  line-height: 15px;
  text-align: center;

  &:hover {
    background: #f1f4f8;
    cursor: pointer;
  }

  ${({ focus }) => focus && css`
    outline: none;
    background: #DAE0E9;
    &:hover {
      background: #DAE0E9;
      cursor: pointer;
    }
  `}

  &:disabled {
    background: ${(props) =>
    props.disabledBackgroundColor
      ? props.disabledBackgroundColor
      : vars.colors.grey4};
    border: 1px solid ${vars.colors.grey4};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const IconSubtleButton = styled(IconButton)`
  background-color: #f1f4f8;
  border: none;

  &:hover {
    background: ${(props) =>
    props.hoverBackgroundColor ? props.hoverBackgroundColor : '#DAE0E9'};
  }

  &:focus {
    outline: none;
    background: ${(props) =>
    props.focusBackgroundColor ? props.focusBackgroundColor : '#ACB5C2'};
  }
`;

const IconProminentButton = styled(IconButton)`
  background-color: #0097fc;
  border: none;

  &:hover {
    background: ${(props) =>
    props.hoverBackgroundColor ? props.hoverBackgroundColor : '#0068C3'};
  }

  &:focus {
    outline: none;
    background: ${(props) =>
    props.focusBackgroundColor
      ? props.focusBackgroundColor
      : '#0068C3'};
  }
`;

const NonGradient = styled(CommonButton)`
  border-radius: 7px;
  background-color: #0295F6;
  color: #ffffff;

  &:hover{
    outline: none;
    background-color : #0068C3;
  }

  &:focus{
    outline: none;
    background-color : #0068C3;
  }

  &:disabled {
    background: ${(props) =>
    props.disabledBackgroundColor
      ? props.disabledBackgroundColor
      : vars.colors.grey4};
    border: 1px solid ${vars.colors.grey4};
    cursor: not-allowed;
    box-shadow: none;
  }

  ${({ focus }) => focus && css`
    outline: none;
    background: #0068C3;
    &:hover {
      background: #0068C3;
    }
  `}
`;

const NormalButton = styled(CommonButton)`
  box-sizing: border-box;
  background: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : 'linear-gradient(52.84deg, #63bcf6 0%, #0295f6 100%)'};
  color: #ffffff;
  box-shadow: 0 1px 5px 0 #acb5c2;

  &:hover {
    background: ${(props) =>
    props.hoverBackgroundColor
      ? props.hoverBackgroundColor
      : 'linear-gradient(48.95deg, #0295f6 0%, #0068c3 100%)'};
  }
  &:focus {
    outline: none;
    background: ${(props) =>
    props.focusBackgroundColor
      ? props.focusBackgroundColor
      : vars.colors.dark_primary};
    box-shadow: 0 0 3px 0 #0068c3;
  }
  &:disabled {
    background: ${(props) =>
    props.disabledBackgroundColor
      ? props.disabledBackgroundColor
      : vars.colors.grey4};
    border: 1px solid ${vars.colors.grey4};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const TextButton = styled(CommonButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  padding: 0;
  background: transparent;
  border: none;
  text-decoration: underline;

  color: ${({backgroundColor}) => backgroundColor ? backgroundColor : vars.colors.primary_blue};

  &:hover {
    color: #0068c3;
  }

  ${({ focus }) => focus && css`
    color: #0068c3;
  `}

  &:focus {
    outline: none;
    text-decoration: underline;
    font-weight: bold;
    color: #0068c3;
  }
  &:disabled {
    text-decoration: none;
    color: ${vars.colors.grey4};
    cursor: not-allowed;
  }
`;

const OutlinedButton = styled(CommonButton)`
  box-sizing: border-box;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${vars.colors.primary_blue};
  border: 2px solid ${vars.colors.primary_blue};

  &:hover {
    background: ${(props) =>
    props.hoverBackgroundColor
      ? props.hoverBackgroundColor
      : 'rgba(2, 149, 246, 0.13)'};
    border: 2px solid ${vars.colors.dark_primary};
  }

  &:focus {
    outline: none;
    border: 2px solid ${vars.colors.primary_blue};
    color: #ffffff;
    background: ${(props) =>
    props.focusBackgroundColor
      ? props.focusBackgroundColor
      : 'rgba(2, 149, 246, 0.5)'};
  }
  &:disabled {
    background: ${(props) =>
    props.disabledBackgroundColor
      ? props.disabledBackgroundColor
      : 'transparent'};
    color: ${vars.colors.grey4};
    border: 2px solid ${vars.colors.grey4};
    cursor: not-allowed;
  }
`;

const Text = styled.div`
  padding: 10px 15.5px;
  color: #4b5461;
  font-family: 'Open Sans';
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.2px;
  line-height: 15px;
`;

const Button: React.SFC<IButtonProps> = (props) => {
  const buttons = {
    [themes.normal]: NormalButton,
    [themes.outlined]: OutlinedButton,
    [themes.text]: TextButton,
    [themes.iconOutlined]: IconButton,
    [themes.iconSubtle]: IconSubtleButton,
    [themes.iconProminent]: IconProminentButton,
    [themes.nonGradient]: NonGradient,
  };

  const themeType = props.theme || themes.normal;
  const ThemedButton = buttons[themeType];

  return (
    <ThemedButton
      className={props.className}
      style={props.styles}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
      ref={props.elemRef && props.elemRef}
      backgroundColor={props.backgroundColor || ''}
      hoverBackgroundColor={props.hoverBackgroundColor || ''}
      focusBackgroundColor={props.focusBackgroundColor || ''}
      disabledBackgroundColor={props.disabledBackgroundColor || ''}
      {...(props.id ? { id: props.id } : {})}
      {...(props.focus ? { focus: props.focus } : {})}
    >
      {props.text &&
        (themeType === themes.iconOutlined || themeType === themes.iconSubtle) ? (
        <Text style={props.textStyles}>{props.text}</Text>
      ) : (
        <div style={props.textStyles}>{props.text}</div>
      )}
      {props.icon && (
        <ICON>
          <img style={props.imageStyles} src={props.icon} alt="alt"></img>
        </ICON>
      )}
      {props.children}
    </ThemedButton>
  );
};

Button.defaultProps = {
  children: null,
  onClick: () => { },
  onSetColumnClick: () => { },
  onDownloadClick: () => { },
  disabled: false,
  text: '',
  type: 'button',
  theme: themes.normal,
  styles: {},
  textStyles: {},
  imageStyles: {},
  hoverBackgroundColor: '',
  focusBackgroundColor: '',
  disabledBackgroundColor: '',
};

export default Button;