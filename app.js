import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

import { db } from "./firebaseconfig.js"


//global array
let todos = [];


const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('.todo-list')


form.addEventListener('submit', async (event) => {
  event.preventDefault()
  // console.log(input.value);

  try {
    const docRef = await addDoc(collection(db, "Todos"), {
      title: input.value,
      date: Timestamp.fromDate(new Date())
    });

    // console.log("Document written with ID: ", docRef.id);
    todos.unshift({
      title: input.value,
      date: Timestamp.fromDate(new Date()),
      id: docRef.id
    });
    renderTodo(todos);

  } catch (e) {
    console.error("Error adding document: ", e);
  }
})




// get all data from database
async function getData() {
  const q = query(collection(db, "Todos"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id });
  });
  // console.log(todos);
  renderTodo(todos);
}




// renderData
function renderTodo(todos) {
  list.innerHTML = "";

  todos.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML += `
      <span>${item.title}</span>
      <div>
        <button type="button" class="todo-btn edit-btn" id="${item.id}">✎</button>
        <button type="button" class="todo-btn delete-btn" id="${item.id}">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });



 
  const deleteBtn = document.querySelectorAll(".delete-btn");
  const editBtn = document.querySelectorAll(".edit-btn");

  deleteBtn.forEach((item, index) => {
    item.addEventListener('click', async (event) => {
      // console.log('btn clicked');
      // console.log(todos[index]);
      await deleteDoc(doc(db, "Todos", todos[index].id));
      // console.log('todo deleted...');
      todos.splice(index, 1);
      renderTodo(todos);
    });
  });


  editBtn.forEach((item, index) => {
    item.addEventListener('click', async (event) => {
      // console.log("edit clicked");
      // console.log(todos[index]);
      const updatedTitle = prompt("Enter updated title");

      const todoRef = doc(db, "todos", todos[index].id);
      await updateDoc(todoRef, {
        title: updatedTitle
      });
      // console.log('todo updated successfully');
      todos[index].title = updatedTitle;
      renderTodo(todos);
    });
  });

}


getData()


