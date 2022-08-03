import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {
  const { setDeleteData, setModalData } = useContext(BackContext);
  const handleDelete = () => {
    setDeleteData(row);
  };
  const handleModal = () => {
    setModalData(row);
  };

  return (
    <>
      <div className='user-4 frame'>
        {/* <img
          src={row.photo}
          alt='some_outfit'
        /> */}
        <p>{row.title}</p>
        <u>{row.cat}</u>
        <p>{Number(row.price).toFixed(2)} Eur.</p>
        <p>{Number(row.rating).toFixed(2)}</p>
      </div>
      <div className='btns row'>
        <button type='button' className='edt' onClick={handleModal}>
          <svg>
            <use href='#Edit' />
          </svg>
        </button>
        <button type='button' className='dlt' onClick={handleDelete}>
          <svg>
            <use href='#Delete' />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Row;

// {JSON.stringify(new Date(row.lastUsed))
//   .slice(1, -6)
//   .replace('T', ' ')}
