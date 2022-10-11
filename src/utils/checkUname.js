import { CreateNote, GetNotes } from "../services";

const bcrypt = require("bcryptjs");

//check and update username
const CheckUsername = (data) => {
  let result = [];
  GetNotes({ type: "u&p" }).then((e) => {
    e.map((ev, i) => {
      data?.id === ev?.uid ? (result[i] = true) : (result[i] = false);
    });
    console.log(result.includes(false));
    if (result.includes(true) === false) storeUsername(data);
  });
};

//const store username
const storeUsername = (data) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(data.username, salt);
  return CreateNote({ uid: data.id, username: hash }, "u&p");
};

export default CheckUsername;
