import React from "react";
import { v4 as uuidv4 } from "uuid";

function ProjectList({ id, img, state, handleList }) {
  console.log(state);
  function view(){
    if (state.proj.length === 0 ) {
      return state.project.map((el, i) => (
      <img key={uuidv4()} src={el.img} alt={el.category} />
    ));
  } else {
    return state.proj.map((el,i) => (<img key={uuidv4()} src={el.img} alt={el.category} />))
  }
}

  return (
    <div className="containerCards" onClick={handleList}>
      {view()}
</div>
  );
}

export default ProjectList;


//     {(profile.map((el,i) => (<img key={uuidv4()} src={el.img} alt={el.category} />)))}