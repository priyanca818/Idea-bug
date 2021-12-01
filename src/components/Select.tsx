/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import WhiteLock from '../assets/svg/lock-FFFFFF.svg';
import tick from '../assets/svg/tick-0295F6.svg';
import vars from '../styles/vars';
import Button, { themes } from '../components/Buttons';
import Icon, { TColor, TIcon } from '../components/Icon';
/* import Tooltip, { ITooltipProps } from '../Tooltip'; */

export interface SelectProps {
  value: string | number | null;
  options: Option[];
  placeholder?: string;
  error?: string;
  autocomplete?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  onChange: (value: string | number | null) => void;
  dropdownHeight?: string;
  dropdownWidth?: string;
  calendar?: boolean;
  showBorder?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  icon?: TIcon;
  fontSize?: string;
  padding?: string;
  dropdownStyles?: React.CSSProperties;
  zIndex?: number;
  iconWrapperStyle?: React.CSSProperties;
  mainIconWidth?: string;
  mainIconHeight?: string;
  mainIconWrapperStyle?: React.CSSProperties;
  overflow?: string;
  iconColor?: TColor;
  backgroundColor?: string;
  id?: string;
  styles?: React.CSSProperties;
  selectStyles?: React.CSSProperties;
  lockTooltipContent?: React.ReactText;
  wrapperStyles?: React.CSSProperties;
/*   tooltipProps?: ITooltipProps; */
  showTooltipOnLock?: boolean;
}

type Option = {
  value: string | number | null;
  title: string;
  icon?: React.ReactNode;
  color?: string;
  disabled?: boolean;
  accessible?: boolean;
};

const Select: React.FC<SelectProps> = ({
  value,
  options,
  placeholder,
  error,
  autocomplete = false,
  disabled = false,
  width = '100%',
  height = '38px',
  onChange,
  dropdownHeight = '227px',
  dropdownWidth,
  calendar = false,
  showBorder = true,
  borderLeft = false,
  borderRight = false,
  icon,
  fontSize,
  padding = '0 15px',
  dropdownStyles = {},
  overflow = 'hidden',
  iconColor = 'grey',
  iconWrapperStyle = {},
  mainIconWidth='18px',
  mainIconHeight='18px',
  mainIconWrapperStyle,
  backgroundColor,
  id = '',
  styles = {},
  selectStyles = {},
  zIndex = 3,
  wrapperStyles,
  lockTooltipContent,
  showTooltipOnLock=true,
/*   tooltipProps = {
    content: (
      <>
        {!!lockTooltipContent
          ? lockTooltipContent
          : 'Please upgrade to a higher plan.'}
        <br />
        <Button
          theme={themes.text}
          text='UPGRADE'
          onClick={() => history.push('/subscription/plans')}
          styles={{ marginTop: '6px' }}
        />
      </>
    ),
    maxWidth: '210px',
    height: 72,
    arrowDirection: 'bottom',
    arrowPositionX: 'calc(100% - 35px)',
    arrowPositionY: '10px',
    containerPositionX: 'calc(100% - 200px)',
    containerPositionY: '20px',
    contentStyles: {
      color: '#FFFFFF',
      fontFamily: 'Nunito',
      fontSize: '13px',
      letterSpacing: '0.1px',
      lineHeight: '18px',
      fontWeight: 100,
      textAlign: 'initial',
      zIndex: 5,
    },
    style: {
      marginLeft: 'auto',
    },
  }, */
}) => {
/*   const history = useHistory(); */
  const [dropdownShow, setDropdownShow] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [currentOption, setCurrentOption] = useState<string | number | null>(
    null,
  );

  const select = useRef(null);
  const input = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    return () => {
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('keydown', onKeyClick);
      // @ts-ignore
      select.current.removeEventListener('wheel', onMouseScroll);
    };
  }, []);

  useEffect(() => {
    if (dropdownShow) {
      if (input.current) {
        // @ts-ignore
        input.current.focus();
      }

      const index = options.findIndex((option) => option.value === value) + 4;

      checkScroll(index, options.length);
      setCurrentOption(value);

      document.addEventListener('click', onClickOutside);
      // @ts-ignore
      select.current.addEventListener('wheel', onMouseScroll);
    } else {
      window.focus();

      setCurrentOption(null);

      document.removeEventListener('click', onClickOutside);
      // @ts-ignore
      select.current.removeEventListener('wheel', onMouseScroll);
    }
  }, [dropdownShow]);

  useEffect(() => {
    setCurrentOption(null);
  }, [autocompleteValue]);

  const filterOptions = _.memoize(
    (options: Option[], autocompleteValue: string) =>
      options.filter((option) =>
        option.title
          .toLowerCase()
          .trim()
          .includes(autocompleteValue.toLowerCase().trim()),
      ),
    (options: Option[], autocompleteValue: string) =>
      JSON.stringify({
        autocompleteValue,
        options: options.map((option) => option.value),
      }),
  );

  const onClickOutside = (e: any) => {
    // @ts-ignore
    if (select.current && !select.current.contains(e.target)) {
      document.removeEventListener('click', onClickOutside);
      setDropdownShow(false);
    }
  };

  const onKeyClick = (e: any) => {
    e.stopPropagation();

    switch (e.keyCode) {
      case 13:
        onEnterClick();
        break;
      case 27:
        setDropdownShow(false);
        break;
      case 38:
        onKeyUpOrDown(-1);
        break;
      case 40:
        onKeyUpOrDown(1);
        break;
      case 9:
        setDropdownShow(false);
        break;
    }
  };

  const onMouseScroll = (e: any) => {
    e.stopPropagation();
  };

  const onChangeWrapper = (newValue: string | number | null) => {
    setDropdownShow(false);
    setAutocompleteValue('');

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  const onMouseOverOption = (value: string | number | null) =>
    setCurrentOption(value);

  const onEnterClick = () => {
    if (currentOption === null) return;

    onChangeWrapper(currentOption);
  };

  const onKeyUpOrDown = (direction: number) => {
    const filteredOptions = filterOptions(options, autocompleteValue);

    if (!filteredOptions.length) return;

    let index;

    if (currentOption === null) {
      index = direction === 1 ? 0 : filteredOptions.length - 1;
    } else {
      index =
        filteredOptions.findIndex((option) => option.value === currentOption) +
        direction;
    }

    if (index < 0) index = filteredOptions.length - 1;
    if (index > filteredOptions.length - 1) index = 0;

    setCurrentOption(filteredOptions[index].value);
    checkScroll(index, filteredOptions.length);
  };

  const onClickField = (e: any) => {
    e.stopPropagation();

    setDropdownShow(!dropdownShow);
  };

  const checkScroll = (index: number, total: number) => {
    const ITEM_HEIGHT = 38;
    const globalMinScroll = 0;
    const globalMaxScroll = total > 5 ? (total - 5) * ITEM_HEIGHT : 0;

    // @ts-ignore
    let { scrollTop } = dropdown.current;

    let minScroll = (index - 4) * ITEM_HEIGHT;
    if (minScroll < globalMinScroll) minScroll = globalMinScroll;
    let maxScroll = index * ITEM_HEIGHT;
    if (maxScroll > globalMaxScroll) maxScroll = globalMaxScroll;

    if (scrollTop < minScroll) scrollTop = minScroll;
    if (scrollTop > maxScroll) scrollTop = maxScroll;

    // @ts-ignore
    dropdown.current.scrollTop = scrollTop;
  };

  const renderField = () => {
    const isPlaceholder = !options.length || value === null;
    const fieldValue = isPlaceholder
      ? placeholder
      : options.find((option) => option.value === value)?.title;
    const optionIcon = !isPlaceholder &&
    options.find((option) => option.value === value)?.icon;

    const iconNode = icon && (
      <MainIconWrapper>
        <img src={icon} style={{...mainIconWrapperStyle,
          color:'black',
          width:mainIconWidth, height:mainIconHeight}}  alt='alt'/>
      </MainIconWrapper>
    );

    if (!dropdownShow) {
      return (
        <CurrentValue overflow={overflow} isPlaceholder={isPlaceholder}>
          {iconNode} {!!optionIcon && optionIcon}
          {fieldValue}
        </CurrentValue>
      );
    }

    return autocomplete ? (
      <AutocompleteInput
        ref={input}
        type='text'
        placeholder={placeholder}
        value={autocompleteValue}
        onChange={(e) => setAutocompleteValue(e.target.value)}
        onKeyDown={onKeyClick}
      />
    ) : (
      <CurrentValue overflow={overflow} isPlaceholder={isPlaceholder}>
        {iconNode} {!!optionIcon && optionIcon}
        {fieldValue}
      </CurrentValue>
    );
  };

  const filteredOptions = autocomplete
    ? filterOptions(options, autocompleteValue)
    : options;

  return (
    <SelectWrapper ref={select} style={{ ...wrapperStyles, width }}>
      <SelectField
        id={id}
        onClick={disabled ? undefined : onClickField}
        disabled={disabled}
        error={!!error}
        calendar={calendar}
        border={showBorder}
        borderLeft={borderLeft}
        borderRight={borderRight}
        dropdownShow={dropdownShow}
        style={{ ...selectStyles, height }}
        fontSize={fontSize}
        padding={padding}
        backgroundColor={backgroundColor}
      >
        {renderField()}

        <IconWrapper style={iconWrapperStyle}>
          <Icon
            icon={dropdownShow ? 'expand_less' : 'expand_more'}
            color={iconColor}
            width='18px'
            height='18px'
          />
        </IconWrapper>
      </SelectField>
      {dropdownShow && (
        <SelectDropdown
          ref={dropdown}
          calendar={calendar}
          height={dropdownHeight}
          width={dropdownWidth}
          fieldHeight={height}
          style={{ ...dropdownStyles, zIndex, overflowY: 'auto' }}
        >
          {filteredOptions.map((option) => (
            <SelectDropdownItem
              style={styles}
              key={option.value || ''}
              selected={currentOption === option.value}
              active={value === option.value}
              onClick={
                option.accessible !== false
                  ? _.wrap(option.value, onChangeWrapper)
                  : undefined
              }
              onMouseOver={
                option.accessible !== false
                  ? _.wrap(option.value, onMouseOverOption)
                  : undefined
              }
              onFocus={
                option.accessible !== false
                  ? _.wrap(option.value, onMouseOverOption)
                  : undefined
              }
              color={option.color || ''}
              disabled={option.disabled || false}
              accessible={
                option.accessible !== undefined ? option.accessible : true
              }
            >
              {!!option.icon && option.icon}
              {option.title}
              {option.accessible === false ?
              !!showTooltipOnLock ? (
                

                <div/>

              ) : (<IconWrapper>
                <div
                  style={{
                    height: '20px', width: '20px',
                    borderRadius: '19.24px',    
                    backgroundColor: '#EF476F',
                    display: 'flex', cursor: 'not-allowed',
                    justifyContent: 'center', alignItems: 'center',
                  }}>
                  <img src={WhiteLock}
                  style={{ width: '12px', height: '12px' }}  alt='alt'/>
                </div>
              </IconWrapper>)
              : (
                value === option.value && (
                  <IconWrapper>
                    <TickIcon />
                  </IconWrapper>
                )
              )}
            </SelectDropdownItem>
          ))}
          {!filteredOptions.length && <NoOptions>No options</NoOptions>}
        </SelectDropdown>
      )}
    </SelectWrapper>
  );
};

export default Select;

const SelectWrapper = styled.div`
  position: relative;
`;

interface SelectFieldProps {
  disabled: boolean;
  error: boolean;
  calendar: boolean;
  border: boolean;
  borderLeft: boolean;
  borderRight: boolean;
  dropdownShow: boolean;
  fontSize: string | undefined;
  padding: string;
  backgroundColor?: string;
}
const SelectField = styled.div<SelectFieldProps>`
/*   width: 100%; */
  /* border-radius: 7px;
  border: 1px solid ${vars.colors.grey4}; */
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#FFFFFF'};
  outline: none;
  color: ${vars.colors.grey1};
  font-size: 12px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}

  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #dae0e9;
      border: 1px solid #acb5c2;
      cursor: default;
    `}

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${vars.colors.secondary_red};
    `}

  ${({ calendar, dropdownShow }) =>
    calendar &&
    css`
      border-radius: 0;
      border: 0;
      height: 34px;
      background-color: ${dropdownShow ? vars.colors.grey5 : '#FAFBFD'};
    `}

  ${({ border }) =>
    border &&
    css`
      border-radius: 7px;
      border: 1px solid ${vars.colors.grey4};
    `}
  ${({ borderLeft }) =>
    borderLeft &&
    css`
      border-left: 1px solid ${vars.colors.grey4};
    `}

  ${({ borderRight }) =>
    borderRight &&
    css`
      border-right: 1px solid ${vars.colors.grey4};
    `}
`;

const IconWrapper = styled.div`
  position: absolute;
  font-size: 16px;
  top: 50%;
  transform: translateY(-50%);
  right: 6px;
  transition: transform ${vars.general.transition_duration};
`;

const CurrentValue = styled.div<{ overflow: string; isPlaceholder: boolean }>`
  min-height: 17px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 50%;
  color: ${vars.colors.grey1};

  ${({ overflow }) =>
    overflow &&
    css`
      overflow: ${overflow};
    `}

  ${({ isPlaceholder }) =>
    isPlaceholder &&
    css`
      color: ${vars.colors.grey3};
    `}
`;

const AutocompleteInput = styled.input`
  width: 100%;
  outline: none;
  border: 0;
  margin-left: -2px;
  color: ${vars.colors.grey1};
  background-color: transparent;

  &::placeholder {
    color: ${vars.colors.grey3};
  }
`;

const TickIcon = styled.div`
  box-sizing: border-box;
  height: 11.2px;
  width: 15.2px;
  /* transition: 400ms; */
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${tick});
`;

const SelectDropdown = styled.div<{
  fieldHeight: string;
  height: string;
  width?: string;
  calendar: boolean;
}>`
  position: absolute;
  z-index: 3;
  top: calc(
    ${({ fieldHeight, calendar }) =>
      `${fieldHeight} + ${!calendar ? '4px' : '0px'}`}
  );
  padding: 0;
  width: ${({width}) => width ? width : '100%'};
  border-radius: 7px;
  box-shadow: 0 2px 6px ${vars.colors.grey4};
  background-color: #ffffff;
  max-height: ${({ height }) => height};
  overflow-y: auto;

  ${({ calendar }) =>
    calendar &&
    css`
      border-radius: 0;
    `}

  &::-webkit-scrollbar {
    background-color: #fff;
    width: 0px;
  } 

  /* background of the scrollbar except button or resizer */
  &::-webkit-scrollbar-track {
    background-color: #f4f4f4;
    width: 0px;
    height:0px;
  }

  /* scrollbar itself */
/*   &::-webkit-scrollbar-thumb {
    background-color: #a0a0a5;
    border: 0px solid #f4f4f4;
    border-radius: 16px;
  } */

  /* set button(top and bottom of the scrollbar) */
  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }
`;

const SelectDropdownItem = styled.div<{
  selected: boolean;
  active: boolean;
  color?: string;
  disabled: boolean;
  accessible?: boolean;
}>`

  height: 38px;
  padding: 0 15px;
  cursor: pointer;
  background-color: #ffffff;
  color: ${vars.colors.grey1};
  font-size: 12px;
  font-weight: 400;
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;
  user-select: none;
  transition-property: background-color, color;
  transition-duration: ${vars.general.transition_duration};

  &:not(:last-child) {
    border-bottom: 0.5px solid ${vars.colors.grey4};
  }

  &:hover {
    background-color: ${vars.colors.grey5};
  }

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  ${({ selected }) =>
    selected &&
    css`
      /* background-color: ${vars.colors.grey5}; */
    `}

  ${({ active }) =>
    active &&
    css`
      color: ${vars.colors.primary_blue};
      font-weight: 500;
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
    `}

    ${({ accessible }) =>
    accessible === false &&
    css`
      cursor: not-allowed;
      /* pointer-events: none; */
    `}
`;

const NoOptions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  padding: 0 15px;
  background-color: #ffffff;
  color: ${vars.colors.grey3};
  font-size: 12px;
  font-weight: 400;
`;

const MainIconWrapper = styled.div`
  margin-right: 9px;
`;
