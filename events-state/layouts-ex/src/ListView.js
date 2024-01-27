import React from "react";
import { v4 as uuidv4 } from "uuid";

function ListView({state}) {
  console.log(state);
  function view(){
    if (state.proj.length === 0 ) {
      return state.products.map((el, i) => (
      <img key={uuidv4()} src={el.img} alt={el.img} />
    ));
  } else {
    return state.proj.map((el,i) => (<img key={uuidv4()} src={el.img} alt={el.img} />))
  }
}

  return (
    <div className="containerCards">
      {state.products.map((el, i) =>el.name)}
      {view()}
</div>
  );
}

export default ListView;


//     {(profile.map((el,i) => (<img key={uuidv4()} src={el.img} alt={el.category} />)))}