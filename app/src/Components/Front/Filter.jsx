import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function Filter() {
  const { cat, filtering, cats } = useContext(FrontContext);
  // const [cat, setCat] = useState(0);

  // const filtering = (e) => {
  //   setCat(e.target.value);
  //   setFilter(Number(e.target.value));
  // };
  console.log(cats)
  return (
    <>
      <select
        className='sorting'
        value={cat}
        onChange={(e) => filtering(e.target.value)}
        style={{ maxWidth: '160px' }}
      >
        <option value='0'>Filter by Category</option>
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
