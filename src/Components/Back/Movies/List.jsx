import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';
// import SortBtns from '../SortBtns';
// import Filter from '../Filter';
// import Search from '../Search';

function List() {
  const { movies } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>List of Movies</h2>
      </div>
      <div className='flex-card'>
        <div className='user-4'>
          <h4>Title</h4>
          <h4>Category</h4>
          <h4>Price</h4>
          <h4>Rate</h4>
          {/* <Filter /> */}
          {/* <Search /> */}
          {/* <SortBtns /> */}
        </div>
        {movies ? movies.map((r) => <Row key={r.id} row={r} />) : null}
      </div>
    </>
  );
}

export default List;
