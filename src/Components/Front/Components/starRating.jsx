import { useContext } from "react";
// import { useState } from "react";
import FrontContext from "../FrontContext";

function StarRating({ row }) {
  const { setCreateRates, rate, setRate } = useContext(FrontContext);

  const rateIt = (e) => {
    console.log(e.target.value);
    setRate(e.target.value);
  }
  const sendRate = () => {
    if (rate === 0) return;
    setCreateRates({ id: row.id, rate: Number(rate) });
    setRate('');
  }
  // console.log(row)
  return (
    <div className="pad">
      <div class="rating">
        <label htmlFor={'1' + row.id}>1</label>
        <input id={'1' + row.id} type="radio" name="rating1" value="1" checked={rate === "1"} onChange={rateIt} />
        <label htmlFor={'2' + row.id}>2</label>
        <input id={'2' + row.id} type="radio" name="rating2" value="2" checked={rate === "2"} onChange={rateIt} />
        <label htmlFor={'3' + row.id}>3</label>
        <input id={'3' + row.id} type="radio" name="rating3" value="3" checked={rate === "3"} onChange={rateIt} />
        <label htmlFor={'4' + row.id}>4</label>
        <input id={'4' + row.id} type="radio" name="rating4" value="4" checked={rate === "4"} onChange={rateIt} />
        <label htmlFor={'5' + row.id}>5</label>
        <input id={'5' + row.id} type="radio" name="rating5" value="5" checked={rate === "5"} onChange={rateIt} />
        <div className="rate">
          <svg><use href="#rating" /></svg>
          <span>{rate ? rate : null}</span>
        </div>
      </div>
      <button className="rate" onClick={sendRate}>Rate It!</button>
    </div>
  )
}

export default StarRating;