import { useContext } from 'react';
import BackContext from '../BackContext';
// import StatusBtns from './StatusBtns';

function Row({ row }) {
  const { handleDeleteCom } = useContext(BackContext);

  return (
    <div className=' com flex-col'>
      {/* <img
        className='img-box pad'
        src={row.image ? row.image : null}
        alt='coat of arms'
      /> */}
      <div className="flex-nw sb line-w">
        <h2>
          {row.title}
        </h2>
        <h4>
          Price: {Number(row.price).toFixed(2)} Eur.
        </h4>
        <h3>
          Rating: {Number(row.rating).toFixed(2)}
        </h3>
      </div>
      <h3>Comments({row.com_count})</h3>
      <ul>
        {row.coms && row.coms.slice(0, -5).split('-^-^-,').map((c, i) => <div className='flex-nw'><li key={i} className='flex-col'>{c.split('#').map(el => <i>{el}</i>)}</li>
          <button type='button' className='dlt' style={{ marginBottom: '25px' }} onClick={() => handleDeleteCom(row.coms_id.split(',')[i])}>
            <svg><use href='#Delete' /> </svg>
          </button></div>)}
      </ul>
      {/* <StatusBtns row={row} /> */}
    </div >
  );
}

export default Row;
