import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CheckPointItem from "./CheckPointItem";

export default function CheckPoint() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // const handleCheckList = () => {
  //   fetch("http://localhost:9000/dashboard")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // };

  const handleChecked = (_id) => {
    fetch(`http://localhost:9000/checkedlist/${id}/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    // .then((newData) => setData(newData));
  };

  const handleReset = () => {
    fetch("http://localhost:9000/reset", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((newData) => setData(newData));
  };

  useEffect(() => {
    fetch("http://localhost:9000/detail/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.checklist);
        // setData(data);
      });
  }, [id]);
  // useEffect(() => {
  //   handleCheckList();
  // }, []);
  console.log(data);

  if (data) {
    return (
      <div className="dashboard_container">
        {/* <h2>{data.thema}</h2> */}
        {data.map((el, i) => (
          <div key={i}>
            <CheckPointItem
              title={el.title}
              id={el.id}
              checked={el.checked}
              handleChecked={handleChecked}
              checklist={el.checklist}
            />
          </div>
        ))}
        <button onClick={handleReset}>Reset</button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

{
  /* <div className="dashboard_container">
{data.map((item, i) => {
  return (
    <div key={i}>
      {item.checklist.map((el, i) => (
        <CheckPointItem
          title={el.title}
          id={el.id}
          checked={el.checked}
          handleChecked={handleChecked}
        />
      ))}
    </div>
  );
})}

<button onClick={handleReset}>Reset</button>
</div> */
}
