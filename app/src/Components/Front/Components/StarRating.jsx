import { useContext } from "react";
// import { useState } from "react";
import FrontContext from "../FrontContext";

function StarRating({ row }) {
  const { setCreateRates, rate, setRate } = useContext(FrontContext);

  const rateIt = (e) => {
    setRate(e.target.value);
  }
  const sendRate = () => {
    if (rate === 0) return;
    setCreateRates({ id: row.id, rate: Number(rate) });
    setRate(0);
  }
  console.log(row, rate)
  return (
    <div className="pad">
      <div class="rating">
        <label
          htmlFor={'a' + row.id}>1</label>
        <input
          id={'a' + row.id}
          type="radio"
          name={'a' + row.id}
          value="1"
          checked={rate === "1"}
          onChange={rateIt} />
        <label
          htmlFor={'b' + row.id}>2</label>
        <input
          id={'b' + row.id}
          type="radio"
          name={'b' + row.id}
          value="2"
          checked={rate === "2"}
          onChange={rateIt} />
        <label
          htmlFor={'c' + row.id}>3</label>
        <input
          id={'c' + row.id}
          type="radio"
          name={'c' + row.id}
          value="3"
          checked={rate === "3"}
          onChange={rateIt} />
        <label
          htmlFor={'d' + row.id}>4</label>
        <input
          id={'d' + row.id}
          type="radio"
          name={'d' + row.id}
          value="4"
          checked={rate === "4"}
          onChange={rateIt} />
        <label
          htmlFor={'e' + row.id}>5</label>
        <input
          id={'e' + row.id}
          type="radio"
          name={'e' + row.id}
          value="5"
          checked={rate === "5"}
          onChange={rateIt} />
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
