import { useCallback, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import UsersTable from '../components/usersTable';
import styles from '../styles/table.module.scss';

type CellType = {
  value: string;
};
const columns = [
  {
    //id: 'id',
    Header: 'E-mail',
    accessor: 'email',
  },
  { /* id: 'id', */ Header: 'First Name', accessor: 'first_name' },
  { /* id: 'id', */ Header: 'Last name', accessor: 'last_name' },
  {
    /* id: 'id', */
    Header: 'Avatar',
    accessor: 'avatar',
    Cell: ({ value }: CellType) => (
      <Image
        priority
        src={value}
        loader={() => value}
        className={''}
        height={100}
        width={100}
        alt={'profile_picture'}
      />
    ),
  },
];

/* type Support = {
  url: string;
  text: string;
}; */
type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

/* type Data = {
  page: string;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
};

type Props = {
  data: Data;
}; */

/* type Fetcher = {
  pageSize: number;
  pageIndex: number;
}; */

const Users = () => {
  const [data, setData] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const fetchData = useCallback(async ({ pageIndex }) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${pageIndex + 1}`
    );
    const data = await response.json();
    console.log({ data });
    setData(data.data);
    setPageCount(data.total_pages);
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <UsersTable
          columns={columns}
          data={data}
          pageCount={pageCount}
          fetchData={fetchData}
        />
      </div>
    </Layout>
  );
};

/* export async function getStaticProps() {
  const response = await fetch('https://reqres.in/api/users');
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
} */

export default Users;
