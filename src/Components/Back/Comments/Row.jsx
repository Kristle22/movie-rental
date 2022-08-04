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
      <div className="flex-nw line-w">
        <h2>
          {row.title}
        </h2>
        <h4>
          Price: {row.price.toFixed(2)} Eur.
        </h4>
      </div>
      <h3>Comments({row.com_count})</h3>
      <ul className='flex-row'>
        {row.coms && row.coms.slice(0, -5).split('-^-^-,').map((c, i) => <li key={i} className='flex-row'>{c.split('#').map(el => <i className='flex-nw'>{el}</i>)}
          <button type='button' className='dlt' onClick={() => handleDeleteCom(row.coms_id.split(',')[i])}>
            <svg><use href='#Delete' /> </svg>
          </button>
        </li>)}
      </ul>
      {/* <StatusBtns row={row} /> */}
    </div >
  );
}

export default Row;
