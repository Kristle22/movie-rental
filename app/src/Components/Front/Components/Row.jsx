// import Rating from './Rating';
import StarRating from './StarRating';
import Comment from './Comment';
import { useContext } from 'react';
import FrontContext from '../FrontContext';

function Row({ row }) {
  const { filtering } = useContext(FrontContext);

  return (
    <div className='flex-row full'>
      <div className='flex-col short frame' style={{ position: 'relative' }}>
        <div>
          <img
            className='img-box front'
            src={row.photo}
            alt='film'
          />
          <div className='rateIt pad' style={{ position: 'absolute', left: '220px', top: 0 }}>
            <p className='heading'>{row.rating.toFixed(2)}</p>
            <svg className='rating'><use href='#rating' /></svg>
          </div>
        </div>
        <h2>{row.title}</h2>
        <h3 style={{ cursor: 'pointer' }} onClick={() => filtering(row.cat_id)}><u>{row.cat}</u></h3>
        <p className='prc'>{Number(row.price).toFixed(2)} Eur.</p>
        <div className="flex-row short">
        </div>
        <StarRating row={row} />
      </div>
      <Comment row={row} />
      <div className="">
        {/* <Rating row={row} /> */}
      </div>
    </div>
  );
}

export default Row;
