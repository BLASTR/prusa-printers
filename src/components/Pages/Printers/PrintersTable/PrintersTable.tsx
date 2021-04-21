import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { IColumn, Table } from '@components/Table/Table';
import { Paragraph } from '@components/Paragraph/Paragraph';
import { Button } from '@components/Button/Button';
import { IPrinter } from "@components/Pages/Printers/Printers";

interface IProps {
  data: IPrinter[];
  isLoading: boolean;
}

const HideButton = styled.button`
  background-color: transparent;
  border: none;
  appearance: none;
  cursor: pointer;
  padding: 10px;
  color: ${props => props.theme.colors.brand};

  &:hover {
    opacity: 0.8;
  }
`;

const Label = styled.span`
  color: ${props => props.theme.colors.brand};
`;

export const PrintersTable: React.FC<IProps> = ({ data, isLoading }) => {
  const [hiddenRows, setHiddenRows] = React.useState<Record<string, string>>({});

  const getHideButton = (id: string, name: string) => (
    <>
      {name}
      <HideButton onClick={() => setHiddenRows(prevState => ({ ...prevState, [id]: name }))}>
        <FontAwesomeIcon icon={faEye} />
      </HideButton>
    </>
  );

  const columns: IColumn[] = React.useMemo(() => {
    const defaultColumns = [
      {
        Header: 'Model',
        accessor: 'title',
        Cell: value => <Label>{value}</Label>,
      },
      {
        Header: getHideButton('buildVolume', 'Build volume'),
        accessor: 'buildVolume',
      },
      {
        Header: getHideButton('layerHeight', 'Layer height'),
        accessor: 'layerHeight',
      },
      {
        Header: getHideButton('maxTravelSpeed', 'Max travel speed'),
        accessor: 'maxTravelSpeed',
      },
      {
        Header: getHideButton('maxTemperatures', 'Max temperatures'),
        accessor: 'maxTemperatures',
      },
      {
        Header: getHideButton('controller', 'Controller'),
        accessor: 'controller',
      },
      {
        Header: getHideButton('diyKit', 'DIY Kit'),
        accessor: 'diyKit',
        Cell: value => (value ? <Button>Buy DIY Kit</Button> : ''),
      },
      {
        Header: getHideButton('builtPrinter', 'Build Printer'),
        accessor: 'builtPrinter',
        Cell: value => (value ? <Button>Buy Build Printer</Button> : ''),
      },
      {
        Header: getHideButton('filamentDiameter', 'Filament diameter'),
        accessor: 'filamentDiameter',
      },
    ];

    const hiddenRowAccessors = Object.keys(hiddenRows);

    if (hiddenRowAccessors.length === 0) {
      return defaultColumns;
    }

    return defaultColumns.filter(({ accessor }) => !hiddenRowAccessors.includes(accessor));
  }, [hiddenRows]);

  return (
    <>
      <Table columns={columns} data={data} isLoading={isLoading} />
      <Paragraph>
        Hidden parameters:{' '}
      </Paragraph>
      <ul>
        {Object.entries(hiddenRows).map(([rowAccessor, name]) => (
          <li key={name}>
            <Button
              theme="link"
              onClick={() =>
                setHiddenRows(prevState =>
                  Object.entries(prevState).reduce(
                    (hiddenRows, [hiddenRowAccessor, name]) =>
                      hiddenRowAccessor === rowAccessor
                        ? hiddenRows
                        : { ...hiddenRows, [hiddenRowAccessor]: name },
                    {},
                  ),
                )
              }
            >
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
