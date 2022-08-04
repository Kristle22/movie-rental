import { useContext, useState } from 'react';
import BackContext from './BackContext';

function Filter() {
  const { setFilter, cats } = useContext(BackContext);
  const [cat, setCat] = useState(0);

  const filtering = (e) => {
    setCat(e.target.value);
    setFilter(Number(e.target.value));
  };

  return (
    <>
      <select
        className='sorting'
        value={cat}
        onChange={filtering}
        style={{ maxWidth: '160px' }}
      >
        <option value='0'>Category</option>
        {cats &&
          cats.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
      </select>
    </>
  );
}

export default Filter;
