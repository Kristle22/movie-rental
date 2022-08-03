import { useContext } from 'react';
import Row from './Row';
import FrontContext from '../FrontContext';
// import SortBtns from '../SortBtns';
// import Filter from '../Filter';
// import Search from '../Search';

function List() {
  const { movies } = useContext(FrontContext);

  return (
    <>
      <div className='front-logo'></div>
      <div className='flex-card front'>
        <div style={{ display: 'flex' }}>
          {/* <Filter /> */}
          {/* <SortBtns /> */}
          {/* <Search /> */}
        </div>
        <div className='flex-row user-4'>
          <h4>Title</h4>
          <h4>Category</h4>
          <h4>Price</h4>
          <h4>Rate</h4>
        </div>
        {movies ? movies.map((c) => <Row key={c.id} row={c} />) : null}
      </div>
    </>
  );
}

export default List;
