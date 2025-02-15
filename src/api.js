const API_URL = "https://jsonplaceholder.typicode.com/users";

// getUsers
const getUsers = async () => {
  const response = await fetch(API_URL);

  return await response.json();
};

// deleteUser
const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return await response.json();
};

// editUser --> createUser
const updateUser = async (user) => {
  const URL = user.id ? `${API_URL}/${user.id}` : API_URL;
  const fetchMethod = user.id ? "PUT" : "POST";
  const response = await fetch(URL, {
    method: fetchMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return await response.json();
};

// condition to know if we are editing or creating User

export { getUsers, deleteUser, updateUser };
