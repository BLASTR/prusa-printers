import { IPrinter, Printers } from '@components/Pages/Printers/Printers';
import { NextPage } from 'next';

interface IProps {
  data: IPrinter[];
}

const Page: NextPage<IProps> = ({ data }) => <Printers data={data} />;

export const getServerSideProps = async () => {
  const response = await fetch('https://my.backend/list');
  const printers = await response.json();

  return {
    props: {
      data: printers,
    },
  };
};

export default Page;
