import { useContext, useState } from "react";
import FrontContext from "../FrontContext";


function Comment({ row }) {
  const { setCreateCom } = useContext(FrontContext);

  const [comment, setComment] = useState('');

  const handleComment = () => {
    setCreateCom({ comment, filmId: row.id });
    setComment('');
  }

  return (
    <div className="com frame front">
      <h3>Movie: '<i>{row.title}</i>'</h3>
      <h2>
        Comments ({row.com_count})
      </h2>
      <h4>
        {row.com_count ? null : (
          <div className='comment'>
            No feedback yet. Be the first to comment on this movie!
          </div>
        )}
      </h4>
      <ul>
        {row.coms && row.coms.slice(0, -5).split('-^-^-,').map((c, i) => <li key={i} className='flex-col'>{c.split('#').map(el => <i>{el}</i>)}</li>)}
      </ul>
      <div className='feedback com'>
        <form className='com'>
          <label>Leave a Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Write your comment here...'
          ></textarea>
          <button className='put' onClick={handleComment}>
            <svg className='put'>
              <use href='#post' />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Comment;