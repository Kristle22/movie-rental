// import Rating from './Rating';
import StarRating from './StarRating';
import Comment from './Comment';

function Row({ row }) {

  return (
    <>
      <div className='flex-row short frame'>
        {/* <div>
          <img
            className='img-box'
            src={row.photo}
            alt='film'
          />
         </div> */}
        <h2>{row.title}</h2>
        <h3>{row.cat}</h3>
        <p className='prc'>{Number(row.price).toFixed(2)} Eur.</p>
        <div className="flex-row short">
        </div>
        <StarRating row={row} />
      </div>
      <div className='rateIt pad'>
        <p className='heading'>{row.rating.toFixed(2)}</p>
        <svg><use href='#rating' /></svg>
      </div>
      <Comment row={row} />
      <div className="flex">
        {/* <Rating row={row} /> */}
      </div>
    </>
  );
}

export default Row;
