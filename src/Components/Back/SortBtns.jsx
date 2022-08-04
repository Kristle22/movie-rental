import { useContext } from 'react';
import BackContext from './BackContext';

function SortBtns() {
  const { sort, sorting } = useContext(BackContext);

  return (
    <>
      <select
        className='sorting'
        value={sort}
        onChange={sorting}
        style={{ maxWidth: '150px' }}
      >
        <option value='0'>Sort by Price</option>
        <option value='default'>default</option>
        <option value='price_asc'>sort 0 - 9</option>
        <option value='price_desc'>sort 9-0</option>
      </select>
      <select
        className='sorting'
        value={sort}
        onChange={sorting}
        style={{ maxWidth: '150px' }}
      >
        <option value='0'>Sort By Rate</option>
        <option value='default'>default</option>
        <option value='rate_asc'>sort 0 - 9</option>
        <option value='rate_desc'>sort 9-0</option>
      </select>
    </>
  );
}

export default SortBtns;
