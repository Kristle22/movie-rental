import { useEffect, useState, useReducer } from 'react';
import cityReducer from './Reducer';
import FrontContext from './FrontContext';
// import Nav from './Nav';
import Crud from './Components/Crud';
import axios from 'axios';
// import { authConfig } from '../../Functions/auth';

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [movies, dispachMovies] = useReducer(cityReducer, []);
  const [cats, setCats] = useState(null);

  const [sortRate, setSortRate] = useState(0);
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  const [createCom, setCreateCom] = useState(null);

  const [rate, setRate] = useState(0);
  const [createRates, setCreateRates] = useState(null);

  // const [users, setUsers] = useState(null);

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };

  const sorting = (e) => {
    const sortOrder = e.target.value;
    setSortRate(sortOrder);
    const action = {
      type: sortOrder,
    };
    dispachMovies(action);
  };

  // Read & queries FRONT
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
      .get('http://localhost:3003/filmai' + query)
      .then((res) => {
        const action = {
          type: 'main_list',
          payload: res.data,
        };
        dispachMovies(action);
      });
  }, [lastUpdate, filter, search]);

  // Simple Read FRONT
  useEffect(() => {
    axios.get('http://localhost:3003/kategorijos').then((res) => {
      setCats(res.data);
    });
  }, [lastUpdate]);

  // CREATE Comments
  useEffect(() => {
    if (null === createCom) return;
    axios
      .post(
        'http://localhost:3003/komentarai',
        createCom,
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createCom]);

  // CREATE RATING
  useEffect(() => {
    if (null === createRates) return;
    axios
      .put(
        'http://localhost:3003/reitingai/' + createRates.id,
        createRates,
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createRates]);

  // //////////////GET USER/////////////////

  // function userId() {
  //   const userId = users.filter((user) => user.name === getUser())[0].id;
  //   return userId;
  // }
  // console.log(userId());

  return (
    <FrontContext.Provider
      value={{
        cats,
        movies,
        message,
        showMessage,
        setFilter,
        setSearch,
        sortRate,
        sorting,
        setCreateCom,
        rate,
        setRate,
        setCreateRates,
      }}
    >
      {show === 'welcome' ? (
        <Crud />
      ) : null}
    </FrontContext.Provider>
  );
}

export default Front;
