import React, { useEffect, useState } from "react";
import CheckListCardItem from "./CheckListCardItem";

export default function CheckListCard() {
  const [data, setData] = useState([]);

  const handleCheckList = () => {
    fetch("http://localhost:9000/dashboard")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    handleCheckList();
  }, []);

  return (
    <div className="check_list_container">
      {data.map((item, i) => (
        <div key={i}>
          <CheckListCardItem thema={item.thema} id={item.id} img={item.img} />
        </div>
      ))}
    </div>
  );
}
