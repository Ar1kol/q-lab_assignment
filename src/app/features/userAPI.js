import axios from "axios";

axios.defaults.baseURL = "https://randomuser.me/api/";

export function getUsers(rows) {
  console.log(rows)
  return new Promise((resolve) =>
    axios(`?page=1&results=${rows}&seed=userseed`).then((res) =>
      resolve({ data: res.data })
    )
  );
}
