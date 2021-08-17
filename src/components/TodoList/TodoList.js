import React from 'react';
import Todo from '../Todo';
import classNames from 'classnames';
import './TodoList.scss';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <Todo
          text={text}
          completed={completed}
          onToggleCompleted={() => {
            onToggleCompleted(id);
          }}
          onDelete={() => {
            onDeleteTodo(id);
          }}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
