import { useContext, useState } from 'react';
import BackContext from '../BackContext';
import Photo from './Photo';


function Create() {
  const { setCreateData, cats, fileInput, image, setImage } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [cat, setCat] = useState(0);
  const [price, setPrice] = useState('');

  const handleCreate = () => {
    const data = {
      title,
      price: parseFloat(price),
      cat: Number(cat),
      photo: image,
    };
    setCreateData(data);
    setTitle('');
    setPrice('');
    setCat(0);
    setImage(null);
    fileInput.current.value = null;
  };

  return (
    <>
      <div
        className='form-container'
        style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
      >
        <div className='imghere'></div>
        {image ? (
          <div className='fix'>
            <img
              src={image}
              alt='activity'
            />
          </div>
        ) : null}
        <div className='form create'>
          <h3>Create a movie</h3>
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
            <Photo />
            <div className='btns add'>
              <button type='button' className='put' onClick={handleCreate}>
                <svg>
                  <use href='#Add' />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
