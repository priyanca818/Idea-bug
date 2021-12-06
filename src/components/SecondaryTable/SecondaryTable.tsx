import React from 'react';
import styled from 'styled-components';

import vars from '../../styles/vars';
import Button, { themes } from '../../../src/components/Buttons';
import Spinner from '../../components/Spinner';

interface ISecTableProps {
  type?: string;
  linkColor?: boolean;
  rowData?: any;
  headerData?: any;
  data?: any;
  tableType?: any;
  title?: string;
  subtitle?: string;
  fontStyles?: {};
  styles?: {};
  buttonName?: string;
  buttonStyles?: {};
  buttonTextStyles?: {};
  wrapperStyles?: {};
  onClick?: (e: any) => void;
  buttonClick?: (e: any) => void;
  showLoader?: any;
  isAlignmentRequired?: boolean;
  alignment?: boolean;
}

const Table = styled.table<ISecTableProps>`

  width: 100%;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 0 0 0 #ececec;
  border-collapse: collapse;
  thead {
    width: 100%;
    display: table;
  }
  tbody {
    width: 100%;
    display: table;
  }
  th {
    height: ${({ type }) => (type === 'doubleColumn' ? '10px' : '15px')};
    color: #222222;
    background-color: ${vars.colors.grey6};
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.1px;
    line-height: ${({ type }) => (type === 'doubleColumn' ? '20px' : '20px')};
    text-align: left;
    padding-top: 14px;
    padding-bottom: 35px;
    border: solid #dae0e9;
    border-width: ${({ type }) =>
      type === 'plain' || type === 'doubleColumn' ? '0 0 0.5px 0' : '0.5px 0'};
  }
  tr {
    display: flex;
    flex-direction: row;
  }
  th,
  td {
    width: 100%;
  }

  td {
    color: #222222;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    letter-spacing: -0.1px;
    line-height: 15px;
    border: solid #dae0e9;
    border-width: 0 0 0.5px 0.5px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 5px;
  }
  td:last-child,
  th:last-child {
    padding-right: 15px;
  }
  td:first-child,
  th:first-child {
    padding-left: 15px;
  }
  td:nth-child(1),
  td:nth-child(2),
  td:nth-child(3) {
    align-items: ${({ alignment }) => alignment && 'center'};
    display: ${({ alignment }) => alignment && 'flex'};
  }
  td:nth-child(1) {
    border-left: ${({ type }) =>
      type === 'doubleColumn' ? '0.5px solid #dae0e9' : '0'};
  }
  .list {
    cursor: pointer;
    color: #0295f6;
    font-weight: 600;
  }
  .list-red {
    cursor: pointer;
    color: #d61414;
    font-weight: 600;
  }
  .link-bold {
    cursor: pointer;
    color: #0295f6;
    font-weight: 700;
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
  }
  .link-bold-red {
    cursor: pointer;
    color: #d61414;
    font-weight: 700;
    text-decoration: underline;
    padding-top: ${({ alignment }) => alignment && '10px'};
  }
  .spinner-class {
    border-width: 0;
  }
`;

const PlainTableWrapper = styled.div<ISecTableProps>`
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: ${({ type }) =>
    type === 'plain' ? '0 1px 6px 0 #dae0e9' : '0 0 0 0 #ececec'};
`;

const TitleTableWrapper = styled.div<ISecTableProps>`
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  margin-left:5%;
  margin-bottom:50px;

  .title {
    height: auto;
    width: 100%;
    color: #222222;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.2px;
    line-height: 22px;
    padding: 15px;
  }
`;

const SubtitleTableWrapper = styled(TitleTableWrapper)<ISecTableProps>`
  .title {
    padding-left: 15px;
    padding-top: 14px;
    padding-bottom: 0px;
  }
  .subtitle {
    height: auto;
    width: 100%;
    color: #acb5c2;
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
    letter-spacing: -0.1px;
    line-height: 17px;
    padding-left: 15px;
    padding-bottom: 10px;
    padding-top: 5px;
  }
`;

const ButtonTableWrapper = styled(TitleTableWrapper)<ISecTableProps>`
  .button {
    float: right;
    display: block;
    margin-right: 0px;
  }
  .title {
    padding-left: 15px;
    padding-top: 14px;
  }
  .subtitle {
    height: auto;
    width: 100%;
    color: #acb5c2;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    letter-spacing: -0.1px;
    line-height: 17px;
    padding-left: 15px;
    padding-bottom: 10px;
    margin-top: -10px;
  }
`;

const Wrapper = {
  plain: PlainTableWrapper,
  doubleColumn: PlainTableWrapper,
  title: TitleTableWrapper,
  subtitle: SubtitleTableWrapper,
  button: ButtonTableWrapper,
};

const SecondaryTable: React.FC<ISecTableProps> = ({
  tableType,
  wrapperStyles,
  title,
  subtitle,
  buttonName,
  buttonStyles,
  buttonTextStyles,
  buttonClick,
  headerData,
  rowData,
  showLoader,
  styles,
  isAlignmentRequired,
}) => {
  const TableWrapper = Wrapper[tableType] || PlainTableWrapper;
  const showTitle =
    tableType !== 'plain' &&
    tableType !== 'doubleColumn' &&
    tableType !== 'button';

  const tableContainer = (
    <TableWrapper
      type={tableType}
      style={wrapperStyles}
      alignment={isAlignmentRequired}
    >
      {showTitle && <div className='title'>{title}</div>}
      {tableType === 'subtitle' && subtitle && (
        <div className='subtitle'>{subtitle}</div>
      )}
      {tableType === 'button' && (
        <>
          <div className='title'>
            {title}
            <div className='button'>
              <Button
                theme={themes.nonGradient}
                text={buttonName}
                styles={buttonStyles}
                textStyles={buttonTextStyles}
                onClick={buttonClick}
              />
            </div>
          </div>
          <div className='subtitle'>{subtitle}</div>
        </>
      )}
      <Table type={tableType} style={styles} alignment={isAlignmentRequired}>
        <thead>
          <tr>
            {headerData.map((title: any) => (
              <th
                style={{ textAlign: title.align, width: title.width }}
                key={title.key}
              >
                {title.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showLoader ? (
            <tr>
              {headerData.map((cell: any) => (
                <td className='spinner-class' key={cell.key}>
                  <Spinner
                    size={'10px'}
                    type={'dots'}
                    color={'#0295F6'}
                    style={{
                      width: '50px',
                      height: '20px',
                    }}
                  />
                </td>
              ))}
            </tr>
          ) : (
            rowData &&
            rowData.map((row: any) => (
              <tr key={row.id} data-key={row.id}>
                {headerData &&
                  headerData.map((cell: any) => (
                    <td
                      style={{ textAlign: cell.align, width: cell.width }}
                      key={cell.key}
                      onClick={cell.onClick}
                      className={
                        cell.clickable
                          ? 'list'
                          : cell.isLinkRed
                          ? 'list-red'
                          : ''
                      }
                    >
                      {cell.clickableWithLink ? (
                        <div className='link-bold' onClick={cell.onClick}>
                          {row[cell.key]}
                        </div>
                      ) : cell.isLinkRed ? (
                        <div className='link-bold-red' onClick={cell.onClick}>
                          {row[cell.key]}
                        </div>
                      ) : (
                        row[cell.key]
                      )}
                    </td>
                  ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableWrapper>
  );
  return <>{tableContainer}</>;
};

SecondaryTable.defaultProps = {
  tableType: 'plain',
  title: '',
  onClick: () => {},
};

export default SecondaryTable;
