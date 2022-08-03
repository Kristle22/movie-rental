import { useContext } from 'react';
import FrontContext from './FrontContext';

function SortBtns() {
  const { sortRate, sorting } = useContext(FrontContext);
  return (
    <>
      <select
        className='sorting'
        value={sortRate}
        onChange={sorting}
        style={{ maxWidth: '150px' }}
      >
        <option value='0'>Sort by Rate</option>
        <option value='default'>default</option>
        <option value='rate_asc'>sort 0 - 9</option>
        <option value='rate_desc'>sort 9-0</option>
      </select>
    </>
  );
}

export default SortBtns;
