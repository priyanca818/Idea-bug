import * as React from 'react';
import styled from 'styled-components';
import vars from '../styles/vars';
import Tooltip, { ITooltipProps } from './Tooltip';
import Button, { themes } from './Buttons';
import { useHistory } from 'react-router-dom';

export interface ICheckboxProps {
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  styles?: React.CSSProperties;
  checkboxStyle?: React.CSSProperties;
  checkboxWidth?: number;
  checkboxHeight?: number;
  checkboxBackgroundColor?: string;
  checkboxBorderColor?: string;
  checkboxDisabledBackgroundColor?: string;
  checkboxDisabledBorderColor?: string;
  imgWidth?: number;
  imgHeight?: number;
  valueMarginLeft?: number;
  value?: string;
  type?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  lockTooltipContent?: React.ReactText;
}

export const Wrapper = styled.div<ICheckboxProps>`
  .container {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    padding-left: ${(props) =>
    props.checkboxWidth &&
    props.valueMarginLeft &&
    `${props.checkboxWidth + props.valueMarginLeft}px`};
    cursor: ${(props) => !props.disabled && props.type !== 'not-accessible'
    ? 'pointer' : 'not-allowed'};
    height: ${(props) => `${props.checkboxHeight}px`};
    color: ${vars.colors.grey1};
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 11px;
    letter-spacing: -0.1px;
    line-height: 15px;
    img {
      display: ${(props) => props.type === 'not-accessible' ? 'block' : 'none'};
    }
  }
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  img {
    width: ${(props) => `${props.imgWidth}px`};
    height: ${(props) => `${props.imgHeight}px`};
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    height: ${(props) => `${props.checkboxHeight}px`};
    width: ${(props) => `${props.checkboxWidth}px`};
    border: 1px solid
      ${(props) =>
    props.checkboxBorderColor
      ? props.checkboxBorderColor
      : vars.colors.grey4};
    border-radius: 3px;
    background-color: ${(props) => props.checkboxBackgroundColor};
  }

  .container:hover input ~ .checkmark {
    background-color: ${vars.colors.grey6};
    img {
      display: ${(props) => props.type === 'not-accessible' ? 'block' : 'none'};
    }
  }

  .container input:checked ~ .checkmark {
    box-sizing: border-box;
    border: 1px solid ${vars.colors.primary_blue};
    border-radius: 3px;
    background-color: ${vars.colors.primary_blue};
    & .tick-img {
      display: block;
    }
  }

  .container input:disabled ~ .checkmark {
    background-color: ${(props) =>
    props.checkboxDisabledBackgroundColor
      ? props.checkboxDisabledBackgroundColor
      : vars.colors.grey5};
    border: 1px solid
      ${(props) =>
    props.checkboxDisabledBorderColor
      ? props.checkboxDisabledBorderColor
      : vars.colors.grey4};
    cursor: not-allowed;
    & .tick-img {
      display : none;
    }
  }
`;

const CheckboxCopy: React.FC<ICheckboxProps> = (props) => {
  const history = useHistory();
  const tooltipProps: ITooltipProps = {
    content: (
      <div style={{
        padding: '5px 0', color: '#FFFFFF',
        fontFamily: 'Nunito', fontSize: '13px',
        letterSpacing: '0.1px', lineHeight: '18px',
        fontWeight: 100, textAlign: 'justify',
      }}>
        {!!props.lockTooltipContent ? props.lockTooltipContent : 'Please upgrade to a higher plan.'}
        <br />
        <Button
          theme={themes.text}
          text='UPGRADE' backgroundColor='#67C5FF'
          onClick={() => history.push('/subscription/plans')}
          styles={{ marginTop: '6px' }}
        />
      </div>),
    maxWidth: '291px',
    height: 72,
    arrowDirection: 'bottom',
    arrowPositionX: '15px',
    arrowPositionY: '10px',
    containerPositionX: 'calc(100% - 53px)',
    containerPositionY: '30px',
    contentStyles: { zIndex: 5 },
  };
  let checkboxElem;
  checkboxElem = (
    <label className='container'
      style={{ ...props.styles }} >
      {props.value}

      {props.type === 'not-accessible' ?
        <Tooltip {...tooltipProps}>
          <div style={{
            height: '20px',
            width: '20px',
            borderRadius: '19.24px',
            backgroundColor: '#EF476F',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'not-allowed',
            marginLeft: '-40px',
          }}>
            <img src=""
              style={{ width: '12px', height: '12px' }}
              alt='na' />
          </div>
        </Tooltip>
        :
        <>
          <input
            type='checkbox'
            checked={props.checked}
            name={props.name}
            value={props.value}
            disabled={props.disabled}
            onClick={props.onClick}
            onChange={props.onChange}
          />
          <span className='checkmark' style={props.checkboxStyle}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <img
                className='tick-img'
                src=""
                alt='na' />
            </div>
          </span>
        </>}
    </label>
  );
  return (
    <Wrapper
      checkboxWidth={props.checkboxWidth}
      checkboxHeight={props.checkboxHeight}
      imgWidth={props.imgWidth}
      imgHeight={props.imgHeight}
      valueMarginLeft={props.valueMarginLeft}
      checkboxBackgroundColor={props.checkboxBackgroundColor}
      checkboxBorderColor={props.checkboxBorderColor}
      checkboxDisabledBackgroundColor={props.checkboxDisabledBackgroundColor}
      checkboxDisabledBorderColor={props.checkboxDisabledBorderColor}
      type={props.type}
      lockTooltipContent={props.lockTooltipContent}
    >
      {checkboxElem}
    </Wrapper>
  );
};

CheckboxCopy.defaultProps = {
  children: null,
  onChange: () => { },
  onClick: () => { },
  value: '',
  name: '',
  type: '',
  checkboxWidth: 15,
  checkboxHeight: 15,
  checkboxBackgroundColor: '#FFFFFF',
  imgWidth: 9,
  imgHeight: 7,
  valueMarginLeft: 8,
  disabled: false,
};

export default CheckboxCopy;