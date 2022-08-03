import { useState, useEffect, useContext } from 'react';
import BackContext from '../BackContext';
// import { useRef } from 'react';
// import Photo from './Photo';

function Edit() {
  const {
    modalData,
    setModalData,
    setEditData,
    cats,
    // setDeletePhoto,
  } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [cat, setCat] = useState(0);
  const [price, setPrice] = useState('');

  // const fileInput = useRef();
  // const [image, setImage] = useState(null);
  // console.log(modalData);

  // const handleDeletePhoto = () => {
  //   setDeletePhoto({ id: modalData.id });
  //   setModalData((p) => ({ ...p, photo: null }));
  // };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setTitle(modalData.title);
    setCat(
      cats.filter((c) => modalData.cat === c.title)[0]?.id ?? null
    );
    setPrice(Number(modalData.price));
    // setImage(modalData.photo);
  }, [modalData, cats]);

  const handleEdit = () => {
    const data = {
      id: modalData.id,
      title,
      price,
      cat,
      // photo: image,
    };
    setEditData(data);
    console.log(data);
    setModalData(null);
  };
  if (null === modalData) {
    return null;
  }

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont'>
          <div className='modal'>
            <div className='left-side'>
              <button
                type='button'
                className='close-x'
                onClick={() => setModalData(null)}
              >
                &times;
              </button>
              {/* <button className='remove'
                type='button'
                onClick={handleDeletePhoto}>
                Remove Photo
              </button>
              <Photo /> */}
              <h1 className='heading'>Movie Rating:</h1>
              <h1>{modalData.rating.toFixed(2)}</h1>
            </div>
            <div className='right-side form'>
              <form>
                <label>Title:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) =>
                    setTitle(e.target.value)}
                  value={title}
                  placeholder='Enter movie title...'
                />
                <select value={cat} onChange={e => setCat(e.target.value)}>
                  <option defaultValue='0'>Choose category</option>
                  {cats
                    ? cats.map((c) => (
                      <option
                        key={c.id}
                        value={c.id}>
                        {c.title}
                      </option>
                    ))
                    : null}
                </select>
                <label>Price:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                  placeholder='... Eur.'
                />
                <div className='btns-modal'>
                  <button
                    type='button'
                    className='close'
                    onClick={() => setModalData(null)}
                  >
                    <svg>
                      <use href='#Exit' />
                    </svg>
                  </button>
                  <button type='button' className='put' onClick={handleEdit}>
                    <svg className='put'>
                      <use href='#Save' />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Edit;
