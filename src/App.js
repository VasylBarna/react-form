import React, { Component } from 'react';
import Container from './components/Container';
import Counter from './components/Counter';
import Dropdown from './components/Dropdown';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import shortid from 'shortid';
import TodoEditor from './components/TodoEditor';
import Filter from './components/TodoFilter/Filter';
import initialTodos from './todos.json';
import Form from './components/Form';
import Modal from './components/Modal/Modal';
import Clock from './components/Clock/Clock';
import Tabs from './components/Tabs/Tabs';
import tabs from './tabs.json';
import IconButton from './components/IconButton/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    console.log('App componentDidMount');
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);
    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    // Проверка на добавления масива в хранилище (State)
    if (nextTodos !== prevTodos) {
      console.log('Обновилося поле todos, записиваю todos в хранилище');
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }
    // Проверка на закритие модалки
    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

  // formSubmitHandler = data => {};
  // handleNameChange = event => {
  //   this.setState({ name: event.currentTarget.value });
  // };
  // handleTagChange = event => {
  //   this.setState({ tag: event.currentTarget.value });
  // };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    console.log('App render');
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        {/* {showModal && <Clock />}
        <button type="button" onClick={this.toggleModal}>
          Открить / скрить таймер
        </button> */}

        {/* <Tabs items={tabs} /> */}

        <IconButton
          onClick={this.toggleModal}
          arial-label="Добавить заметку(todo)"
        >
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>

        {/* <button type="button" onClick={this.toggleModal}>
          Открить модалку
        </button> */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
            {/* <h1>Привет ето контент модалки как children</h1>
            <p>Lorem ipsum dolor</p>
            <button type="button" onClick={this.toggleModal}>
              Закрить
            </button> */}
          </Modal>
        )}

        {/* <Form onSubmit={this.formSubmitHandler} /> */}
        {/* <ColorPicker options={colorPickerOptions} /> */}

        <div>
          <p>Всего заметок: {totalTodoCount}</p>
          <p>Выполнено: {completedTodoCount}</p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
