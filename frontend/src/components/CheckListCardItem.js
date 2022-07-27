import React from "react";
import { apiBaseUrl } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function CheckListCardItem({ img, id, thema }) {
  const navigate = useNavigate();
  console.log(img);
  return (
    // <Link to={`/checklist/${id}`}>
    <div
      onClick={() => navigate(`/checklist/${id}`)}
      className="check_list_card"
    >
      <img
        src={img.startsWith("http") ? img : `${apiBaseUrl}/${img}`}
        alt={img}
      />
      <h4>{thema}</h4>
      {/* <button>delete</button> */}
    </div>
    // </Link>
  );
}
