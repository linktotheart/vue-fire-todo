<template>
  <div id="app">
    <header class="page-header"></header>

    <section class="wrapper">
      <form class="new-todo-form">
        <label class="new-todo-label">
          New Todo:
          <input v-model="newTodo" type="text" class="new-todo-input" />
        </label>
        <button
          type="submit"
          @click.prevent="addTodo()"
          class="new-todo-button"
        >
          Add
        </button>
      </form>
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <label class="todo-item-label" v-if="currentlyEditing !== todo.id">
            <input
              type="checkbox"
              v-model="todo.completed"
              @change="updateTodo(todo)"
              class="todo-item__checkbox"
            />
            {{ todo.text }}
          </label>
          <div class="btn-group">
            <button @click="editTodo(todo)" class="todo-button">
              <img src="./assets/pencil.svg" alt="Edit todo" />
            </button>
            <button @click="deleteTodo(todo)" class="todo-button">
              <img src="./assets/trash.svg" alt="Delete todo" />
            </button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { todosCollection } from "./firebase";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      newTodo: "",
      todos: [],
    };
  },
  firestore() {
    return {
      todos: todosCollection.orderBy("createdAt", "desc"),
    };
  },
  methods: {
    addTodo() {
      todosCollection
        .add({
          text: this.newTodo,
          completed: false,
          id: this.todos.length,
          createdAt: new Date(),
          currentlyEditing: null,
          todoEditText: "",
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      this.newTodo = "";
    },
    updateTodo(todo) {
      todosCollection
        .doc(todo.id)
        .update({ ...todo })
        .then((docRef) => console.log("Document updated with id", docRef))
        .catch((err) => console.log("error updating document", err));
    },
    deleteTodo(todo) {
      todosCollection.doc(todo.id).delete();
    },
    editTodo(todo) {},
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.page-header {
  padding: 5rem 0;
  width: 100%;
  background: #ff33ae;
}
.wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}
.new-todo-form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #fafafa;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
  margin-top: -3rem;
  background: white;
}
.new-todo-label {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  text-align: left;
  font-weight: bold;
}
.new-todo-input {
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid lightgrey;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: normal;
}
.new-todo-button {
  font-size: 1rem;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  background: #ff33ae;
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #ff33ae;
}
.todo-item {
  display: flex;
  align-items: center;
  border-top: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  &:first-of-type {
    border-radius: 3px 3px 0 0;
  }
  &:last-of-type {
    border-bottom: 1px solid lightgrey;
    border-radius: 0 0 3px 3px;
  }
}
.todo-item-label {
  cursor: pointer;
  padding: 1rem;
}
.todo-item__checkbox {
  margin-right: 1rem;
}
.todo-list {
  max-width: 100%;
  margin: 2rem auto;
}
.todo-button {
  background: transparent;
  border: 0;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
  float: right;
}
</style>
