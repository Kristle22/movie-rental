import { useEffect, useState, useReducer } from 'react';
import cityReducer from './Reducer';
import BackContext from './BackContext';
import Nav from './Nav';
import MoviesCrud from './Movies/Crud'
import CatsCrud from './Cats/Crud';
import ComsCrud from './Comments/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [createData, setCreateData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const [movies, dispachMovies] = useReducer(cityReducer, []);

  const [cats, setCats] = useState(null);
  const [createCat, setCreateCat] = useState(null);
  const [deleteCat, setDeleteCat] = useState(null);

  const [status, setStatus] = useState(0);

  const [sort, setSort] = useState('0');
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  // Optional state
  const [deletePhoto, setDeletePhoto] = useState(null);
  const [comments, setComments] = useState(null);
  // const [deleteCom, setDeleteCom] = useState(null);

  const sorting = (e) => {
    const sortOrder = e.target.value;
    setSort(sortOrder);
    const action = {
      type: sortOrder,
    };
    dispachMovies(action);
  };

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };
  // ///////////AXIOS GET/CREATE/DELETE/UPDATE DATA///////////
  // Read
  useEffect(() => {
    let query;
    if (filter === 0 && !search) {
      query = '';
    } else if (filter) {
      query = '?cat-id=' + filter;
    } else if (search) {
      query = '?s=' + search;
    }

    axios
      .get('http://localhost:3003/filmai' + query, authConfig())
      .then((res) => {
        const action = {
          type: 'main_list',
          payload: res.data,
        };
        dispachMovies(action);
      });
  }, [lastUpdate, filter, search]);

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios
      .post('http://localhost:3003/filmai', createData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios
      .delete('http://localhost:3003/filmai/' + deleteData.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/filmai/' + editData.id, editData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // /////////////AXIOS SECOND//////////////
  // READ cats
  useEffect(() => {
    axios.get('http://localhost:3003/kategorijos', authConfig()).then((res) => {
      setCats(res.data);
    });
  }, [lastUpdate]);

  // Create Cat
  useEffect(() => {
    if (null === createCat) return;
    axios
      .post('http://localhost:3003/kategorijos', createCat, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createCat]);

  // Delete Cat
  useEffect(() => {
    if (null === deleteCat) return;
    axios
      .delete('http://localhost:3003/kategorijos/' + deleteCat.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteCat]);

  /////////////////////////COMMENTS/PHOTO/STATUS//////////////////////////////
  // READ COMMENTS
  useEffect(() => {
    axios.get('http://localhost:3003/komentarai', authConfig()).then((res) => {
      setComments(res.data);
    });
  }, [lastUpdate]);

  // DELETE COMMENT
  const handleDeleteCom = (id) => {
    axios
      .delete('http://localhost:3003/komentarai/' + id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  };

  // Delete Photo
  useEffect(() => {
    if (null === deletePhoto) return;
    axios
      .delete('http://localhost:3003/nuotrauka/' + deletePhoto.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deletePhoto]);

  // Edit STATUS
  useEffect(() => {
    if (null === status) return;
    axios
      .put('http://localhost:3003/statusas/' + status.id, status, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [status]);

  return (
    <BackContext.Provider
      value={{
        movies,
        setCreateData,
        setDeleteData,
        modalData,
        setModalData,
        setEditData,
        cats,
        setCreateCat,
        setDeleteCat,
        sort,
        sorting,
        filter,
        setFilter,
        setSearch,
        message,
        setDeletePhoto,
        setStatus,
        handleDeleteCom,
        comments,
      }}
    >
      {show === 'admin' ? (
        <>
          <Nav />
          <div className='admin'>
            <div className='center'>
              <img
                src={require('../../img/admin-1.png')}
                alt='admin panel'
                style={{
                  maxWidth: '350px',
                  opacity: '0.5'
                }}
              />
            </div>
          </div>
        </>
      ) : show === 'movies' ? (
        <MoviesCrud />
      ) : show === 'cats' ? (
        <CatsCrud />
      ) : show === 'comments' ? (
        <ComsCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
