import { TelephoneExchange } from "./TelephoneExchange.js";

const phoneExchange = new TelephoneExchange(["Alice", "Bob", "Carol"]);
const callList = document.getElementById("call-list");

function render() {
  callList.innerHTML = Array.from(phoneExchange.mp.entries())
    .map(([number, name]) => {
      return `<li data-number="${number}">${name}</li>`;
    })
    .join("");
}

render();

function addNewUser() {
  const name = prompt("Enter name of new user");
  if (name.trim() === "") {
    alert("Name cannot be empty");
    return;
  }
  phoneExchange.add(name);
  render();
}

const addUserButton = document.getElementById("add-user");
addUserButton.addEventListener("click", addNewUser);

function deleteUser(event) {
  if (confirm("Are you sure you want to delete this user?") === false) {
    return;
  }
  const target = event.target;
  if (target.tagName === "LI") {
    const number = Number(target.dataset.number);
    phoneExchange.delete(number);
    render();
  }
}

callList.addEventListener("dblclick", deleteUser);

function getClassByStatus(status) {
  switch (status) {
    case 1:
      return "bg-warning";
    case 2:
      return "bg-danger";
    case 3:
      return "bg-success";
  }
}

async function testAll() {
  const items = callList.querySelectorAll("li");

  items.forEach((item) => {
    item.className = "";
  });

  for (const item of items) {
    const number = Number(item.dataset.number);
    phoneExchange.call(number).then(function (status) {
      item.className = getClassByStatus(status);
    });
  }
}

const testAllButton = document.getElementById("test-all");
testAllButton.addEventListener("click", testAll);
