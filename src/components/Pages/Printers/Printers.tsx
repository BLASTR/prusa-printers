import NextHead from 'next/head'
import styled from "styled-components";
import React from 'react';

import { Container } from '@components/Container/Container';
import { PrintersTable } from '@components/Pages/Printers/PrintersTable/PrintersTable';
import { Input } from '@components/Input/Input';
import { useQuery } from '@hooks/useQuery';
import { Checkbox } from '@components/Checkbox/Checkbox';
import { useDebounce } from '@hooks/useDebounce';

export interface IPrinter {
  id: number;
  title: string;
  buildVolume: string;
  layerHeight: string;
  maxTravelSpeed: string;
  maxTemperatures: string;
  controller: string;
  filamentDiameter: string;
  diyKit: boolean;
  builtPrinter: boolean;
}

interface IProps {
  data?: IPrinter[];
}

const Section = styled.section`
  padding-top: 100px;
`;

export const Printers: React.FC<IProps> = ({ data }) => {
  const [filteredPrinters, setFilteredPrinters] = React.useState(data);
  const [searchInput, setSearchInput] = React.useState({ touched: false, value: '' })
  const [diyType, setDiyType] = React.useState(true);
  const [buildType, setBuildType] = React.useState(true);
  const debouncedSearchValue = useDebounce(searchInput.value);
  const query = useQuery<IPrinter[]>(searchInput.touched ? `https://my.backend/list?search=${debouncedSearchValue}`: null);

  const filterPrinters = (filterFn: (printer: IPrinter) => boolean) => {
    console.log(query.data)
    if (query.data.length > 0) {
      return query.data.filter(filterFn);
    }

    return [];
  };

  React.useEffect(() => {
    if (query.data !== null) {
      setFilteredPrinters(
        filterPrinters(
          ({ diyKit, builtPrinter }) => (diyKit && diyType) || (builtPrinter && buildType),
        ),
      );
    }
  }, [query.data, diyType, buildType]);

  return (
    <>
      <NextHead>
        <title>Printers table | Prusa3D</title>
      </NextHead>
      <Section>
        <Container>
          <Input
            name="printers-search"
            value={searchInput.value}
            onChange={event => setSearchInput({ touched: true, value: event.target.value  })}
            placeholder="Search:"
            className="mb-lg"
          />
          <div className="mb-sm">
            <Checkbox name="diy-kit" checked={diyType} className="mr-sm" onChange={() => setDiyType(!diyType)}>
              DIY Kit
            </Checkbox>
            <Checkbox name="build-printer" checked={buildType} onChange={() => setBuildType(!buildType)}>
              Build printer
            </Checkbox>
          </div>
          <PrintersTable data={filteredPrinters} isLoading={query.status === 'pending'} />
        </Container>
      </Section>
    </>
  );
};
