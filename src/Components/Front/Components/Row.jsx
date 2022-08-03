import { useContext } from 'react';
import FrontContext from '../FrontContext';
// import Comment from './Comment';
// import Rating from './Rating';

function Row({ row }) {
  const {
  } = useContext(FrontContext);

  return (
    <>
      <div className='flex-row user-4 frame'>
        {/* <div>
          <img
            className='img-box'
            src={row.photo}
            alt='film'
          />
        </div> */}
        <p>{row.title}</p>
        <p>{row.cat}</p>
        <p className='prc'>{Number(row.price).toFixed(2)} Eur.</p>
        <div className='heading-sm'>
          <svg><use href='#rating' /></svg>
          <p>{row.rating.toFixed(2)}</p>
        </div>
      </div>
      <div className='btns'>
        {/* <button type='button' className='put' onClick={addToCart}>
          <svg>
            <use href='#cart' />
          </svg>
        </button> */}
      </div>
      <div className="flex">
        {/* <Comment row={row} /> */}
        {/* <Rating row={row} /> */}
      </div>
    </>
  );
}

export default Row;
