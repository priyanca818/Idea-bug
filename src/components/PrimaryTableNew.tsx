import React, {
    Fragment,
    ReactNode,
    ReactText,
    useCallback,
    useEffect,
    useRef,
    useState,
  } from 'react';
  import styled, { css } from 'styled-components';
  
  import  Checkbox from './Checkbox';
  import {  Div} from './Div';
  import  Select  from './Select';
  import {  Spinner } from './Spinner';
  
  
  
  
  
  
  import Icon from './Icon';
  
  import vars from '../styles/vars';
  
/*   import { LoaderWrapper } from './l'; */
  
  export interface PrimaryTableProps {
    loading: boolean;
    data: any[] | null;
    total?: {} | null; // same as data type row
    height?: string;
    width?: string;
    customLeftNodes?: React.ReactNode[];
    customRightNodes?: React.ReactNode[];
    columns: {
      data: {
        key: string;
        title: string;
  
        align: string;
        headAlignment?: string;
  
        rightBorder?: boolean;
  
        // keep allways on top
        pivot: boolean;
  
        resizeable?: boolean;
  
        // format data
        data: (item: any) => React.ReactNode;
  
        // format totals
        total: (item: any) => React.ReactNode;
  
        sort: boolean;
  
        width?: number;
        minWidth?: number;
  
        padding?: boolean;
  
        // show/hide column
        checked?: boolean;
        accessible?: boolean;
      }[];
    };
    showBorderOnHover?: boolean;
    rowAccessor: string | number;
    rowSelection?: {
      // selected Rows
      selectedRows: ReactText[];
  
      // setSelected Rows
      setSelectedRows: (list: ReactText[]) => void;
    };
    sort: {
      key: string;
      direction: 'asc' | 'desc';
      onChange: (key: string, direction: 'asc' | 'desc') => void;
    };
    period?: {
      from: string | null;
      to: string | null;
      onChange: (
        from: string | null,
        to: string | null,
        mode: string | null,
      ) => void;
      dropdownInactive?: CallableFunction;
      savedMode?: 'day' | 'week' | 'month' | 'custom';
    };
  
    pagination?: {
      page: number;
      onChange: (page: number) => void;
      perPage: number;
      onChangePerPage: (perPage: number) => void;
      total: number | null;
    };
    borderRadius?: string;
    // empty State Heading
    emptyStateHead?: string;
    // empty State Description
    emptyStateDesc?: string;
  
    customEmptyStateMessage?: ReactNode;
  }
  
  export interface Filter {
    title: string;
    value: string;
  }
  
  let resizeColumn: string = '';
  let lastWidth: number = 0;
  let columnMinWidth: number = 0;
  
  export const PrimaryTable: React.FC<PrimaryTableProps> = ({
    data,
    sort,
    height,
    width,
    total,
    loading,
    columns,
    pagination,
    rowAccessor,
    rowSelection,
    customLeftNodes,
    customRightNodes,
    customEmptyStateMessage,
    emptyStateHead = 'No Results Found',
    emptyStateDesc = 'Please check the date range or filters and try again.',
    borderRadius,
    showBorderOnHover=true,
  }) => {
    // * column that is hovered now
  
    // const spanRef = useRef<HTMLSpanElement>(null);
    const [hoverColumn, setHoverColumn] = useState<string | null>(null);
  
    // * list of all columns width
    const [columnsWidth, setColumnsWidth] = useState<{ [key: string]: number }>(
      {},
    );
  
    const leftValue = useRef<{ [key: string]: number }>({});
    const isResizing = useRef('');
    const resizerHeight = useRef(0);
  
    const tableRef = useRef<HTMLTableElement>(null);
    const headRowRef = useRef<HTMLTableRowElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
  
    const [showShadow, setShowShadow] = useState(false);
  
    // * clear rows selection when data is changed
    useEffect(() => {
      rowSelection?.setSelectedRows([]);
  
      // scroll to top on data change
      // spanRef.current?.scrollIntoView({
      //   // block: 'start',
      //   behavior: 'smooth',
      // });
    }, [data]);
  
    const onScroll = useCallback(
      (e: object) => {
        const elem = e['target'];
        const scrollLeft = elem['scrollLeft'];
        if (scrollLeft === 0) {
          setShowShadow(false);
        } else {
          setShowShadow(true);
        }
      },
      [setShowShadow],
    );
  
    // * set default columns width when data is changed
    // * if checkbox column exists, set width to 42 for it
    // * if default width value is provided in props, use it
    // * else width is defined automatically according to the cell content
    // * but not exceeding the max width
    useEffect(() => {
      // document.addEventListener('mousemove', onResizeThrottled);
      document.addEventListener('mousemove', onResize);
      document.addEventListener('mouseup', onResizeEndDoc);
  
      const containerHeight =
        containerRef?.current?.getBoundingClientRect().height;
  
      const tableHeight = tableRef?.current?.getBoundingClientRect().height;
  
      resizerHeight.current =
        (containerHeight! < tableHeight! ? containerHeight : tableHeight) || 0;
  
      const columnNodes = headRowRef.current?.querySelectorAll('th');
  
      const x = {};
      const y = {};
  
      columnNodes &&
        Object.values(columnNodes).forEach((col) => {
          const colId = col.getAttribute('data-col-id');
          const colIndex = col.getAttribute('data-col-index');
  
          if (!colId) return;
  
          const width = (colIndex && columns.data[colIndex].width) || null;
  
          y[colId] = 0;
          colId === 'checkbox' && rowSelection
            ? // ? (x[colId] = 42)
              (x[colId] = 45)
            : (x[colId] = width || Math.round(col.getBoundingClientRect().width));
        });
  
      setColumnsWidth(x);
      leftValue.current = y;
  
      return () => {
        // document.removeEventListener('mousemove', onResizeThrottled);
        document.removeEventListener('mousemove', onResize);
        document.removeEventListener('mouseup', onResizeEndDoc);
      };
    }, [data, columns]);
  
    // * check if it's possible to move to next/prev page
    const canPrevPage = !!pagination?.total && pagination?.page > 1;
  
    const canNextPage =
      !!pagination?.total &&
      pagination?.page * pagination?.perPage < pagination?.total;
  
    // * handle moving to next/prev page
    const prevPage = () => pagination?.onChange(pagination?.page - 1);
  
    const nextPage = () => {
      pagination?.onChange(pagination?.page + 1);
    };
  
    // * render pagination data: from, to, total
    const renderPaginationStats = useCallback(() => {
      const from =
        pagination?.total && pagination?.total > 0
          ? pagination?.page * pagination?.perPage - pagination?.perPage + 1
          : 0;
      const to = pagination?.total
        ? Math.min(pagination?.page * pagination?.perPage, pagination?.total)
        : 0;
  
      return `${from} - ${to} of ${pagination?.total || 0}`;
    }, [pagination]);
  
    // * handle sorting change
    // * if same column is clicked, change sorting direction
    // * if another column is clicked, sort by this column and set default sorting direction
    const changeSort = (key: string) => {
      if (key === sort.key) {
        sort.onChange(key, sort.direction === 'asc' ? 'desc' : 'asc');
      } else {
        sort.onChange(key, 'asc');
      }
    };
  
    // * check if row is selected
    const isSelectedRow = (selectedRowId: ReactText) =>
      rowSelection?.selectedRows?.includes(selectedRowId) ?? false;
  
    // * handle row selection
    // * if row is already selected, unselect it and vice versa
    const selectRow = (rowData: {}) => {
      const selectedRowId = rowData[rowAccessor];
  
      if (isSelectedRow(selectedRowId)) {
        rowSelection?.setSelectedRows(
          rowSelection?.selectedRows.filter((rowId) => rowId !== selectedRowId),
        );
      } else {
        rowSelection?.setSelectedRows([
          ...rowSelection?.selectedRows,
          selectedRowId,
        ]);
      }
    };
  
    // * check if all rows are selected
    const isSelectedAllRows = () =>
      rowSelection?.selectedRows.length === data?.length;
  
    // * handle all rows selection
    // * if all rows are selected, unselect all
    // * if none or only several rows are select, select remaining
    const selectAllRows = () => {
      if (isSelectedAllRows()) {
        rowSelection?.setSelectedRows([]);
      } else {
        rowSelection?.setSelectedRows(
          data?.map((rowData: {}) => rowData[rowAccessor]) || [],
        );
      }
    };
  
    // * check if at least one row is selected
    const isSelectedAnyRow = () => (rowSelection?.selectedRows?.length ?? 0) > 0;
  
    // * select checkbox type for 'select all' checkbox
    // * if all rows are selected, show check sign
    // * if only some rows are selected, show dash sign
    const getCheckboxType = () => {
      if (rowSelection?.selectedRows.length === data?.length) return 'normal';
  
      if (rowSelection?.selectedRows?.length ?? 0 > 0) return 'indeterminate';
  
      return 'normal';
    };
  
    // * handle resize
    // * on start - save key of resized column and current mouse position
    // * on move  - calculate the distance between previous mouse position and current
    // *            and adjust the column width accordingly
    // * on end   - clear saved data
    const onResizeStart =
      (id: string, minWidth?: number) => (e: React.MouseEvent) => {
        e.persist();
        e.preventDefault();
        e.stopPropagation();
        resizeColumn = id;
        lastWidth = e.clientX;
        columnMinWidth = minWidth || 0;
        isResizing.current = id;
      };
  
    const onResize = useCallback(
      (e: MouseEvent) => {
        if (resizeColumn) {
          const deltaX = e.clientX - lastWidth;
          lastWidth = e.clientX;
  
          setColumnsWidth((prevState) => {
            const prevWidth = prevState[resizeColumn];
            const x = {
              ...prevState,
              [resizeColumn]:
                prevWidth + deltaX > columnMinWidth
                  ? prevWidth + deltaX
                  : columnMinWidth,
            };
            return x;
          });
        }
      },
      [setColumnsWidth, resizeColumn],
    );
  
    const onResizeEndDoc = useCallback((_e: MouseEvent) => {
      isResizing.current = '';
      resizeColumn = '';
      lastWidth = 0;
    }, []);
  
    const onResizeEnd = useCallback((_e: React.MouseEvent) => {
      isResizing.current = '';
      resizeColumn = '';
      lastWidth = 0;
    }, []);
  
    // * prevent resize events from being triggered very often
    // * const onResizeThrottled = throttle(onResize, 200);
  
    // * calculate left position for sticky columns
    // * left position = width of all previous sticky columns
    // * e.g. left position of 1st sticky column = 0
    // * left position of 2nd sticky column = width of 1st sticky column
    // * left position of 3rd sticky column = width of 1st and 2nd sticky columns, etc.
  
    let lastLeft = 0;
  
    const calculateLeft = (colId: string, pivot: boolean, colWidth?: number) => {
      const left = lastLeft;
  
      if (pivot) {
        lastLeft += colWidth
          ? columnsWidth[colId]
            ? columnsWidth[colId] + 30
            : 0
          : columnsWidth[colId] ?? 0;
      }
  
      leftValue.current = { ...leftValue.current, [colId]: left };
  
      return left;
    };
  
    const getAlignment = (a: string) => {
      switch (a.toLowerCase()) {
        case 'right': {
          return 'flex-end';
        }
        case 'left': {
          return 'flex-start';
        }
        case 'center': {
          return 'center';
        }
        default: {
          return '';
        }
      }
    };
  
    return (
      // * resize 'move' and 'start' events are handle here
      // * to allow moving mouse within the entire table component
      <Container
        onMouseUp={onResizeEnd}
        onScroll={onScroll}
        style={{ height, width }}
      >
        {(customLeftNodes || customRightNodes) && (
          <Header>
            <Block>
              {customLeftNodes?.map((node, index) => (
                <Fragment key={index}>{node}</Fragment>
              ))}
            </Block>
            <Block>
              {customRightNodes?.map((node, index) => (
                <Fragment key={index}>{node}</Fragment>
              ))}
            </Block>
          </Header>
        )}
{/*         {loading && (
          <LoaderWrapper height='100%' overlay={!!data?.length}>
            <Spinner
              size='15px'
              type='dots'
              color='#0295F6'
              style={{
                width: '120px',
                height: '60px',
                margin: '9px 9px',
              }}
            />
          </LoaderWrapper>
        )} */}
  
        {!customEmptyStateMessage && !loading && (!data || data.length === 0) && (
          <Filler style={{ height, width }}>
            <Text1>{emptyStateHead}</Text1>
            <Text2>{emptyStateDesc}</Text2>
          </Filler>
        )}
        {customEmptyStateMessage &&
          !loading &&
          (!data || data.length === 0) &&
          customEmptyStateMessage}
        {!!data?.length && (
          <Content
         /*    height='100%' */
/*             maxHeight={
              !!customLeftNodes || !!customRightNodes
                ? !!pagination
                  ? 'calc(100% - 90px)'
                  : 'calc(100% - 45px)'
                : '100%'
            } */
 /*            ref={containerRef}
            overflow={'auto'}
            borderRadius={borderRadius} */
          >
            {data && (
              <>
                <Table ref={tableRef}>
                  <Thead>
                    <Tr ref={headRowRef} header>
                      {rowSelection && (
                        <Th
                          pivot
                          checkbox
                          colWidth={columnsWidth['checkbox']}
                          left={calculateLeft('checkbox', true)}
                          showShadow={true}
                          data-col-id='checkbox'
                          rightBorder
                          padding
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Checkbox
                              type={getCheckboxType()}
                              styles={{
                                width: '15px',
                                height: '15px',
                                padding: 0,
                                // display: 'block',
                              }}
                              checkboxHeight={15}
                              checkboxWidth={15}
                              checked={isSelectedAnyRow()}
                              onClick={() => selectAllRows()}
                            />
                          </div>
                        </Th>
                      )}
  
                      {columns.data.map((column, colIndex) => {
                        const {
                          checked = true,
                          resizeable = true,
                          rightBorder = false,
                          padding = true,
                        } = column;
  
                        return (
                          checked && (
                            <Th
                              key={column.key}
                              sort={column.sort}
                              left={calculateLeft(
                                column.key,
                                column.pivot,
                                padding ? column.width : 0,
                              )}
                              pivot={column.pivot}
                              colWidth={columnsWidth[column.key]}
                              // padding={padding}
                              padding
                              hover={column.key === hoverColumn}
                              sorted={column.key === sort.key}
                              textAlign={column.headAlignment ?? column.align}
                              showShadow={showShadow}
                              rightBorder={rightBorder}
                              data-col-id={column.key}
                              data-col-index={colIndex}
                              onMouseLeave={() => setHoverColumn(null)}
                              onMouseEnter={() => showBorderOnHover && setHoverColumn(column.key)}
                            >
                              <SortArea
                                sortable={!!column.sort}
                                onClick={
                                  column.sort
                                    ? () => changeSort(column.key)
                                    : undefined
                                }
                                alignment={getAlignment(
                                  column.headAlignment ?? column.align,
                                )}
                              >
                                <span>{column.title}</span>
                                {column.sort && (
                                  <SortIcon>
                                    <Icon
                                      icon={
                                        column.key === sort.key &&
                                        sort.direction === 'asc'
                                          ? 'expand_less'
                                          : 'expand_more'
                                      }
                                      color={
                                        column.key === sort.key ? 'blue' : 'black'
                                      }
                                    />
                                  </SortIcon>
                                )}
                              </SortArea>
                              {/*
                                  resize 'start' event is handled here to allow starting
                                  resize only from the border of the header cell.
                               */}
                              {resizeable && (
                                <ResizeArea
                                  draggable
                                  onClick={(e: React.MouseEvent) =>
                                    e.stopPropagation()
                                  }
                                  onMouseDown={onResizeStart(
                                    column.key,
                                    column.width,
                                  )}
                                  height={resizerHeight.current}
                                  isResizing={isResizing.current === column.key}
                                />
                              )}
                            </Th>
                          )
                        );
                      })}
                    </Tr>
                    {total && (
                      <Tr total>
                        {rowSelection && (
                          <Td
                            total
                            pivot
                            padding
                            checkbox
                            rightBorder
                            colWidth={columnsWidth['checkbox']}
                            left={leftValue.current['checkbox']}
                            showShadow={true}
                          />
                        )}
                        {columns.data.map((column, _index) => {
                          const {
                            checked = true,
                            rightBorder = false,
                            padding = true,
                          } = column;
                          return (
                            checked && (
                              <Td
                                style={{
                                  height: '36px',
                                }}
                                key={column.key}
                                total
                                textAlign={column.align}
                                pivot={column.pivot}
                                padding={padding}
                                hover={column.key === hoverColumn}
                                colWidth={columnsWidth[column.key]}
                                left={leftValue.current[column.key]}
                                showShadow={showShadow}
                                rightBorder={rightBorder}
                              >
                                {column.total(total)}
                              </Td>
                            )
                          );
                        })}
                      </Tr>
                    )}
                  </Thead>
  
                  <tbody>
                    {/* <span ref={spanRef} /> */}
                    {data.map((item, index) => (
                      <Tr key={index}>
                        {rowSelection && (
                          <Td
                            pivot
                            checkbox
                            padding
                            rightBorder
                            colWidth={columnsWidth['checkbox']}
                            left={leftValue.current['checkbox']}
                            showShadow={true}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Checkbox
                                type='normal'
                                styles={{
                                  width: '15px',
                                  height: '15px',
                                  padding: 0,
                                  // display: 'block',
                                }}
                                checkboxHeight={15}
                                checkboxWidth={15}
                                checked={isSelectedRow(item[rowAccessor])}
                                onClick={() => selectRow(item)}
                              />
                            </div>
                          </Td>
                        )}
                        {columns.data.map((column, _index) => {
                          const {
                            checked = true,
                            padding = true,
                            rightBorder = false,
                          } = column;
                          const columnData = column.data(item);
                          return (
                            checked && (
                              <Td
                                key={column.key}
                                textAlign={column.align}
                                pivot={column.pivot}
                                padding={padding}
                                hover={column.key === hoverColumn}
                                colWidth={columnsWidth[column.key]}
                                minWidth={`${column.width || 0}px`}
                                left={leftValue.current[column.key]}
                                showShadow={showShadow}
                                rightBorder={rightBorder}
                                onMouseEnter={() => showBorderOnHover && setHoverColumn(column.key)}
                                onMouseLeave={() => setHoverColumn(null)}
                              >
                                <ValueWrapper>
                             {/*    width={columnsWidth[column.key]} */}
                                  {columnData}
                                </ValueWrapper>
                              </Td>
                            )
                          );
                        })}
                      </Tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Content>
        )}
        {pagination && (
          <Footer>
            <ShowRowsText>Show Rows:</ShowRowsText>
            <Select
              calendar
              // borderRight
              width='64px'
              value={pagination.perPage}
              height='30px'
              showBorder={true}
              backgroundColor={vars.colors.grey6}
              options={[
                { title: '20', value: 20 },
                { title: '50', value: 50 },
                { title: '100', value: 100 },
              ]}
              onChange={(value) => {
                pagination.onChange(1);
                pagination.onChangePerPage(value ? +value : 20);
              }}
            />
            <RowsText>{renderPaginationStats()}</RowsText>
            <PaginationButton
              role='button'
              onClick={canPrevPage ? prevPage : undefined}
              disabled={!canPrevPage}
            >
              <Icon icon='arrow_back' color={ canPrevPage ? 'black' : 'grey'} />
            </PaginationButton>
            <PaginationButton
              role='button'
              disabled={!canNextPage}
              onClick={canNextPage ? nextPage : undefined}
            >
              <Icon icon='arrow_forward' color={ canPrevPage ? 'black' : 'grey'} />
            </PaginationButton>
          </Footer>
        )}
      </Container>
    );
  };
  
  export default PrimaryTable;
  
  const ValueWrapper = styled(Div)`
    position: relative;
  
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `;
  
  const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    position: relative;
    box-sizing: content-box;
    /* box-shadow: 0 1px 6px 0 #ececec; */
    /* box-sizing: border-box; */
  `;
  
  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fafbfd;
    width: 100%;
    height: 44px;
    border-radius: 7px 7px 0 0;
    border-bottom: 1px solid ${vars.colors.grey4};
  `;
  
  const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 44px;
    border-radius: 0 0 7px 7px;
    background-color: #fafbfd;
    box-shadow: 0 -1px 8px 0 #e3e3e3;
  `;
  
  /* overflow: ${({ overflow }) => overflow}; */
  const Content = styled(Div)<{ showHeader?: boolean; borderRadius?: string }>`
    width: 100%;
    border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
    /* height: 100%; */
    /* height: ${({ showHeader }) => (showHeader ? '' : '100%')}; */
  
    /* height: 475px; */
  
    /* position: relative; */
  
    background-color: #fff;
  
    &::-webkit-scrollbar {
      background-color: #fff;
      width: 16px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #babac0;
      border-radius: 16px;
      border: 5px solid #fff;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-track:hover {
      background-color: #f4f4f4;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #a0a0a5;
      border: 4px solid #f4f4f4;
    }
    body {
      background-color: #babac0;
    }
    .overflow {
      min-height: 100vh;
    }
  `;
  
  const Block = styled.div`
    display: flex;
    align-items: center;
  `;
  
  // const FiltersButton = styled.div`
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 44px;
  //   height: 44px;
  //   border-left: ${vars.colors.grey4};
  //   border-right: 1px solid ${vars.colors.grey4};
  //   transition: background-color ${vars.general.transition_duration};
  //   cursor: pointer;
  
  //   &:hover {
  //     background-color: ${vars.colors.grey4};
  //   }
  // `;
  
  // const Filter = styled.div`
  //   display: flex;
  //   align-items: center;
  //   margin-left: 10px;
  //   padding: 6px 10px;
  //   border-radius: 2px;
  //   background-color: ${vars.colors.primary_blue};
  //   color: #ffffff;
  //   font-family: 'Nunito', sans-serif;
  //   font-size: 10px;
  //   letter-spacing: -0.1px;
  //   line-height: 14px;
  
  //   span {
  //     color: #ffffff;
  //     font-family: 'Nunito', sans-serif;
  //     font-size: 10px;
  //     letter-spacing: -0.1px;
  //     line-height: 14px;
  //     font-weight: 700;
  //     margin-right: 6px;
  //   }
  // `;
  
  // const ActionContainer = styled.div`
  //   display: flex;
  //   align-items: center;
  //   margin-left: 5px;
  // `;
  
  // const SetColumnsButton = styled.div`
  //   font-family: 'Open Sans', sans-serif;
  //   font-size: 11px;
  //   font-weight: 600;
  //   letter-spacing: -0.1px;
  //   line-height: 15px;
  //   height: 44px;
  //   padding: 0 14px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   border-left: 1px solid ${vars.colors.grey4};
  //   transition: background-color ${vars.general.transition_duration};
  //   cursor: pointer;
  
  //   &:hover {
  //     background-color: ${vars.colors.grey4};
  //   }
  // `;
  
  const ShowRowsText = styled.div`
    height: 44px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border-right: 1px solid ${vars.colors.grey4}; */
    color: ${vars.colors.grey1};
    font-family: 'Open Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: -0.1px;
    line-height: 15px;
  `;
  
  const RowsText = styled.div`
    height: 44px;
    padding: 0 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${vars.colors.grey1};
    font-family: 'Open Sans', sans-serif;
    font-size: 11px;
    letter-spacing: -0.1px;
    line-height: 15px;
  `;
  
  const PaginationButton = styled.div<{ disabled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color ${vars.general.transition_duration};
    cursor: pointer;
  
    height: 30px;
    width: 30px;
    margin-right: 7px;
    border: 1px solid ${vars.colors.grey4};
    border-radius: 7px;
  
    &:hover {
      background-color: ${vars.colors.grey4};
    }
  
    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
        background-color: ${vars.colors.grey4};
      `};
  `;
  
  const Table = styled.table`
    min-width: 100%;
    /* min-height: 100%; */
    /* border-collapse: collapse; */
  
    border-spacing: 0;
    border-collapse: separate;
    table-layout: fixed;
  `;
  
  const Thead = styled.thead``;
  
  const Tr = styled.tr<{ header?: boolean; total?: boolean }>`
    background-color: ${({ total }) => (!total ? '#ffffff' : '#fafbfd')};
    transition: background-color ${vars.general.transition_duration};
  
    ${({ total, header }) =>
      !total &&
      css`
        &:hover {
          /* background-color: ${header ? '#ffffff' : '#f1f4f8'}; */
        }
      `};
  
    &:hover {
      background-color: #f1f4f8;
    }
  `;
  
  type ThProp = {
    left?: number;
    sort?: boolean;
    pivot?: boolean;
    hover?: boolean;
    sorted?: boolean;
    padding: boolean;
    colWidth?: number;
    checkbox?: boolean;
    minWidth?: string;
    maxWidth?: string;
    textAlign?: string;
    showShadow?: boolean;
    rightBorder: boolean;
  };
  
  const Th = styled.th.attrs<ThProp>(({ colWidth }) => ({
    style: {
      width: colWidth ? `${colWidth}px` : undefined,
      minWidth: colWidth ? `${colWidth}px` : undefined,
      maxWidth: colWidth ? `${colWidth}px` : undefined,
    },
  }))<ThProp>`
    padding: ${({ padding }) => (padding ? '0 14.5px 0 14.5px' : 0)};
    border: 0;
    height: 44px;
  
    color: ${({ sorted }) =>
      sorted ? vars.colors.primary_blue : vars.colors.grey1};
  
    background-color: #fafbfd;
  
    position: sticky;
    top: 0;
  
    text-align: ${({ textAlign }) => textAlign || 'left'};
  
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    line-height: 17px;
    letter-spacing: -0.1px;
  
    text-overflow: ellipsis;
  
    border-bottom: 1px solid ${vars.colors.grey4};
  
    box-sizing: border-box;
  
    overflow: visible;
    user-select: none;
    transition: max-width 0.2s, min-width 0.2s;
  
    ${({ checkbox }) =>
      checkbox &&
      css`
        /* min-width: 42px;
        max-width: 42px; */
        min-width: 34px;
        max-width: 34px;
  
        padding: 0;
      `};
  
    /* z-index: 2; */
    z-index: 3;
    ${({ pivot, left, showShadow }) =>
      pivot &&
      css`
        left: ${left ?? 0}px;
        z-index: 5;
        /* box-shadow: ${showShadow ? '4px 0px 3px 0 #f1f4f8' : 'none'}; */
        box-shadow: ${showShadow ? '4px 0 6px 0 #f1f4f8' : 'none'};
      `};
  
    ${({ hover }) =>
      hover &&
      css`
        border-right: 1px solid ${vars.colors.grey4};
      `};
  
    ${({ rightBorder }) =>
      rightBorder &&
      css`
        border-right: 1px solid ${vars.colors.grey4};
      `};
  `;
  
  type SortAreaOptions = {
    sortable: boolean;
    alignment: 'flex-end' | 'flex-start' | 'center' | '';
  };
  
  const SortArea = styled.div<SortAreaOptions>`
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
  
    ${({ sortable }) =>
      sortable &&
      css`
        cursor: pointer;
      `};
  
    justify-content: ${({ alignment }) => alignment};
  `;
  
  const SortIcon = styled.div`
    /* display: inline-flex; */
    display: flex;
    align-items: center;
    padding-bottom: 4px;
    margin-left: 4px;
    cursor: pointer;
    transform: translateY(3px);
  `;
  
  type TdProps = {
    total?: boolean;
    textAlign?: string;
    checkbox?: boolean;
    pivot?: boolean;
    hover?: boolean;
    colWidth?: number;
    left?: number;
    showShadow?: boolean;
    minWidth?: string;
    maxWidth?: string;
  
    rightBorder: boolean;
    padding: boolean;
  };
  
  const Td = styled.td.attrs<TdProps>(({ colWidth }) => ({
    style: {
      width: colWidth ? `${colWidth}px` : undefined,
    },
  }))<TdProps>`
    color: ${vars.colors.grey1};
    font-size: 12px;
    text-align: ${({ textAlign }) => textAlign || 'left'};
    line-height: 17px;
    font-family: 'Open Sans', sans-serif;
    font-weight: ${({ total }) => (total ? 'bold' : '400')};
    letter-spacing: -0.1px;
    background-color: ${({ total }) => (!total ? 'inherit' : '#fafbfd')};
  
    border: 0;
    padding: ${({ padding }) => (padding ? '12px 14.5px 12px 14.5px' : 0)};
    position: relative;
  
    min-width: ${({ minWidth }) => minWidth};
    border-bottom: 1px solid ${vars.colors.grey4};
  
    transition: max-width 0.2s, min-width 0.2s;
  
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  
    ${({ checkbox }) =>
      checkbox &&
      css`
        min-width: 10px;
        max-width: 10px;
        padding: 0;
      `};
  
    ${({ pivot, left, showShadow, total }) =>
      pivot &&
      css`
        position: sticky;
        left: ${left ?? 0}px;
        /* z-index: ${total ? (left ? 2 : 1) : 1}; */
        z-index: 3;
        box-shadow: ${showShadow ? '4px 0 6px 0 #f1f4f8' : 'none'};
      `};
  
    ${({ hover }) =>
      hover &&
      css`
        border-right: 1px solid ${vars.colors.grey4};
      `};
  
    ${({ rightBorder }) =>
      rightBorder &&
      css`
        border-right: 1px solid ${vars.colors.grey4};
      `}
  
    ${({ total, checkbox, pivot }) =>
      total &&
      css`
        position: sticky;
        top: 44px;
        z-index: ${checkbox ? 4 : pivot ? 4 : 1};
      `}
  `;
  
  const ResizeArea = styled.div<{ height: number; isResizing: boolean }>`
    position: absolute;
    top: 0;
    ${({ height }) => {
      const h = `${height}px`;
      return height
        ? css`
            height: ${h};
          `
        : css`
            bottom: 0;
          `;
    }};
  
    right: 0;
    width: 10px;
    /* z-index: 3; */
    background-color: transparent;
    border-right: 2px solid transparent;
    /* background-color: #0295f6; */
    cursor: ew-resize;
  
    &:hover {
      border-right: 3px solid #0295f6;
      /* background-color: #0295f6; */
    }
  
    ${({ isResizing }) =>
      isResizing &&
      css`
        border-right: 3px solid #0295f6;
        &:hover {
          border-right: 3px solid transparent;
          /* background-color: #0295f6; */
        }
      `};
  `;
  
  const Filler = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
  `;
  
  const Text1 = styled.div`
    color: #222222;
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    letter-spacing: -0.2px;
    line-height: 33px;
  `;
  
  const Text2 = styled.div`
    color: #acb5c2;
    width: 500px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    letter-spacing: -0.2px;
    text-align: center;
    line-height: 27px;
    margin-top: 10px;
  `;
  