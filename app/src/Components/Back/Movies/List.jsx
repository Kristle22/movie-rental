import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';
import Search from '../Search';
import Filter from '../Filter';
import SortBtns from '../SortBtns';

function List() {
  const { movies } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>List of Movies</h2>
      </div>
      <div className='flex-card'>
        <div className="flex-nw sb">
          <Search />
          <Filter />
          <SortBtns />
        </div>
        <div className='main-5'>
          <h4>Photo</h4>
          <h4>Title</h4>
          <h4>Category</h4>
          <h4>Price</h4>
          <h4>Rate</h4>
        </div>
        {movies ? movies.map((r) => <Row key={r.id} row={r} />) : null}
      </div>
    </>
  );
}

export default List;
