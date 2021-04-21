import React from 'react';
import styled from 'styled-components';
import { Paragraph } from '@components/Paragraph/Paragraph';

interface IProps<TData> {
  data: TData[];
  columns: IColumn[];
  isLoading?: boolean;
}

export type IColumn = {
  Header: string | JSX.Element;
  accessor: string;
  Cell?: (value: any) => JSX.Element | string;
};

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: ${props => props.theme.colors.gray['300']};
  border: solid ${props => props.theme.colors.gray['400']};
  border-width: 1px 0;
`;

const Row = styled.tr`
  &:nth-child(even) > td,
  &:nth-child(even) > th {
    background-color: ${props => props.theme.colors.white};
  }
`;

const Cell = styled.td`
  padding: 14px 15px;
  text-align: left;
  vertical-align: middle;
  border: solid ${props => props.theme.colors.gray['400']};
  border-width: 0 0 1px 1px;
`;

const HeadCell = styled(Cell)`
  white-space: nowrap;
  border-left: none;
  font-weight: bold;
`;

export const Table = <TData,>({ columns, data, isLoading = false }: React.PropsWithChildren<IProps<TData>>) => {
  const rows = React.useMemo(() => {
    return columns.map(({ Header, accessor, Cell }) => (
      {
        id: `row-${accessor}`,
        Header,
        cells: data.map((group, index) => {
          const cellValue = group[accessor] ?? '';

          return {
            id: `cell-${accessor}-${index}`,
            value: cellValue,
            render: () => (Cell ? Cell(cellValue) : cellValue),
          };
        }),
      }
    ))
  }, [columns, data])

  if (data.length === 0) {
    return <Paragraph>No results</Paragraph>;
  }

  return (
    <StyledTable>
      <tbody>
        {isLoading ? (
          <Row>
            <Cell>...loading</Cell>
          </Row>
        ) : (
          rows.map(({ id, Header, cells }, index) => (
            <Row key={id}>
              <HeadCell as="th">{Header}</HeadCell>
              {cells.map(({ id, render }) => (
                <Cell key={id}>{render()}</Cell>
              ))}
            </Row>
          ))
        )}
      </tbody>
    </StyledTable>
  );
};
