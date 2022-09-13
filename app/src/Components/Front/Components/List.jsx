import { useContext } from 'react';
import Row from './Row';
import FrontContext from '../FrontContext';
import SortBtns from '../SortBtns';
import Filter from '../Filter';
import Search from '../Search';

function List() {
  const { movies } = useContext(FrontContext);

  return (
    <>
      <div className='front-logo'></div>
      <div className='flex-card front'>
        <div style={{ display: 'flex' }}>
          <Search />
          <Filter />
          <SortBtns />
        </div>
        <div className='flex-row short padx'>
          {/* <h3>Title</h3>
          <h3>Category</h3>
          <h3>Price</h3> */}
          {/* <h4>Rate It</h4> */}
        </div>
        {movies ? movies.map((c) => c.show ? <Row key={c.id} row={c} /> : null) : null}
      </div>
    </>
  );
}

export default List;
