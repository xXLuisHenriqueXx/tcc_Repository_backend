// require("dotenv").config();

// const userFactory = require('../factories/user-factory');
// const noteFactory = require('../factories/note-factory');
// // const todoFactory = require('../factories/todo-factory');

// const { connect } = require("../../config/database");

// const User = require("../User");
// const Note = require("../Note");
// // const Todo = require("../Todo");

// // Gerar dados de teste para usuários, notas e tarefas a partir de argumentos passados na linha de comando
// const usersQnty = +process.argv.find(arg => arg.match(/^--users=/))?.replace(/^--users=/, "") || 10;
// const notesQnty = +process.argv.find(arg => arg.match(/^--notes=/))?.replace(/^--notes=/, "") || 40;
// // const todosQnty = +process.argv.find(arg => arg.match(/^--todos=/))?.replace(/^--todos=/, "") || 40;

// const connection = connect();

// connection.on("open", async () => {
//   const users = userFactory.buildList(usersQnty);
//   const notes = users.map(user => noteFactory.buildList(notesQnty / usersQnty)).flat();
//   // const todos = users.map(user => todoFactory.buildList(todosQnty / usersQnty)).flat();

//   const userDocs = users.map(u => new User(u));
//   const noteDocs = notes.map(n => new Note(n));
//   // const todoDocs = todos.map(t => new Todo(t));

//   await User.bulkSave(userDocs);
//   await Note.bulkSave(noteDocs);
//   // await Todo.bulkSave(todoDocs);

//   console.log(`Created ${users.length} users, ${notes.length} notes, and ${todos.length} todos.`);
//   connection.close();
// });