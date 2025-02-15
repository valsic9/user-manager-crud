import { getUsers, deleteUser, updateUser } from "./api";

// declarations
let editUser = null;
const userList = document.getElementById("user-list");
const form = document.getElementById("form");

// render users
const renderUsers = async () => {
  userList.innerHTML = "";
  const users = await getUsers();

  users.forEach((user) => {
    const element = document.createElement("li");
    element.innerHTML = `<span>${user.name} (${user.email})</span> 
    <button data-id="${user.id}" class="btn edit">Edit</button>
    <button data-id="${user.id}" class="btn delete"">Delete</button>`;
    userList.appendChild(element);
  });
};

// handle submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;

  await updateUser({
    name: nameInput,
    email: emailInput,
    id: editUser ? editUser.id : null, // cannot read property 'id' of null so we need to set a default value
  });
  form.reset();
  renderUsers();
};

// handle edit
const handleEdit = async (oldId) => {
  if (
    document.getElementById("name").value.length &&
    document.getElementById("email").value.length &&
    document.getElementById("email").value.includes("@")
  ) {
    const editeduser = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      id: oldId,
    };
    await updateUser(editeduser);
    form.reset();
    renderUsers();
  } else {
    alert("Please fill in the form with the information you want to edit");
  }
};

// handle delete
const handleDelete = async (id) => {
  deleteUser(id);
  renderUsers();
};

// event listeners
form.addEventListener("submit", handleSubmit);

userList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const id = e.target.getAttribute("data-id");
    // select span and split name and email
    // const userDOM = e.target.parentNode.children[0].textContent.split(" (");
    // const user = Array.from(userDOM);
    handleEdit(id);
  } else {
    const id = e.target.getAttribute("data-id");

    handleDelete(id);
  }
});

renderUsers();
export { renderUsers };
