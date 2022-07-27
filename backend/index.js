const express = require("express");
const app = express();
const { readJSONFile, writeJSONFile } = require("./jsonFileSystem");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const multer = require("multer");

const jsonPath = "./models/data.json";

const PORT = process.env.PORT || 9000;

//logging middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("new request", req.method, req.url);
  next();
});

app.get("/dashboard", (req, res) => {
  readJSONFile("./models/data.json").then((data) => {
    res.json(data);
  });
});

app.get("/detail/:id", (req, res) => {
  const gesuchterCheckListId = req.params.id;

  readJSONFile("./models/data.json").then((data) => {
    const gesuchterCheckList = data.find(
      (item) => item.id === gesuchterCheckListId
    );
    res.json(gesuchterCheckList);
    console.log(gesuchterCheckList);
  });
  // const checklist = beitrageArray.find((b) => b.id === gesuchterCheckListId);
  // console.log("checklist", checklist);
  // res.json(checklist);
});

app.put("/checkedlist/:listId/:checkPointId", (req, res) => {
  const listId = req.params.listId;
  const checkPointId = req.params.checkPointId;

  readJSONFile("./models/data.json")
    .then((data) => {
      // const newCheckList = data.find((item) => item.id === listId);
      // return newCheckList;
      const newData = data.map((item) => {
        console.log(item.id);
        if (item.id === listId) {
          item.checklist.map((checkPoint) => {
            if (checkPoint.id === checkPointId) {
              checkPoint.checked = !checkPoint.checked;
            }
            return checkPoint;
          });
        }
        return item;
      });
      return newData;
    })
    // .then((newCheckList) => {
    //   return newCheckList.checklist.find((item) => item.id === checkPointId);
    // })
    // .then((newCheckList) => {
    //   newCheckList.checked = !newCheckList.checked;
    //   return newCheckList;
    //   console.log(newCheckList);
    // })
    .then((newCheckList) => {
      writeJSONFile("./models/data.json", newCheckList).then(() => {
        res.json(newCheckList);
      });
    });

  // res.json(newCheckList);
  // const newData = data.map((item) => {
  //   console.log(item.id);
  //   if (item.id === id) {
  //     item.checklist.map((checkPoint) => {
  //       if (checkPoint.id === id) {
  //         checkPoint.checked = !checkPoint.checked;
  //       }
  //       return checkPoint;
  //     });
  //     // item.checked = !item.checked;
  //   }
  //   return item;
  // });
  console.log(newData);
});

app.put("/reset", (req, res) => {
  readJSONFile("./models/data.json").then((data) => {
    const newData = data.filter((item) => {
      item.checked = false;
      return item;
    });
    console.log(newData);
    writeJSONFile("./models/data.json", newData).then(() => {
      res.json(newData);
    });
  });
});

const upload = multer({ dest: "./uploads" });
const uploadFilesMiddleware = upload.single("img");

app.post("/dashboard", uploadFilesMiddleware, (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const newList = {
    thema: req.body.thema,
    // name: req.body.name,
    img: req.file.filename,
    // checked: false,
    id: uuid(),
  };
  console.log(newList);
  readJSONFile(jsonPath) // lesen
    .then((data) => [newList, ...data])
    .then((updatedData) => writeJSONFile(jsonPath, updatedData)) // reviews schreiben
    .then((updatedData) => res.json(updatedData)); // antworten
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
