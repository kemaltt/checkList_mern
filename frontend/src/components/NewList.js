import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewList() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputName, setInputName] = useState("");
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    // console.log(input);
    const formData = new FormData();

    // Update the formData object
    formData.append("title", inputTitle);
    formData.append("name", inputName);
    formData.append("img", img, img.name); // Blob = Binary Large Object

    fetch("http://localhost:9000/dashboard", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setInputTitle("");
        setInputName("");
        setImg(null);
        navigate("/");
      });
  };

  // const handleInput = (e) => {
  //   e.preventDefault();
  //   console.log(input);
  //   fetch("http://localhost:9000/dashboard", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: input,
  //       name: input,
  //       // checked: false,
  //     }),
  //   }).then((res) => res.json());
  // };

  return (
    <div className="new_list">
      <h3>Create a new checklist</h3>
      <form>
        {/* <div>
          <input
            onChange={(e) => setInputTitle(e.target.value)}
            value={inputTitle}
            type="text"
            placeholder="new title"
          />
        </div> */}
        <div>
          <input
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
            type="text"
            placeholder="new title"
          />
        </div>
        <div>
          <input
            type="file"
            name="blogPicture"
            id="blogPicture"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>

        <div>
          <button onClick={handleInput}>Submit</button>
        </div>
      </form>
    </div>
  );
}
