import config from '../../config';

const initialState = {
  active: {
    todos: [],
  },
  completed: {
    todos: [],
  },
};

const todosReducer = (state = initialState, action) => {
  const {active, completed} = state;

  const activeTodos = active.todos;
  const completedTodos = completed.todos;

  const {type, payload} = action;

  const actions = config.todos.actions;

  switch (type) {
    case actions.add_todo:
      return {
        ...state,
        active: {
          ...state.active,
          todos: [payload, ...activeTodos],
        },
      };
    case actions.getTodos:
      let activeTodos = action.payload.filter(obj => obj.completed !== true);
      let completedTodos = action.payload.filter(obj => obj.completed == true);
      return {
        ...state,
        active: {
          todos: activeTodos,
        },
        completed: {
          todos: completedTodos,
        },
      };

    case actions.delete_active_todo:
      return {
        ...state,
        active: {
          ...state.active,
          todos: activeTodos.filter((todo, i) => payload != i),
        },
      };

    case actions.delete_completed_todo:
      return {
        ...state,
        completed: {
          todos: completedTodos.filter((todo, i) => payload != i),
        },
      };

    case actions.complete_todo:
      let completedTodo;
      return {
        ...state,
        active: {
          ...state.active,
          todos: activeTodos.map((todo, index) => {
            if (index === payload) {
              completedTodo = todo;
              return {
                ...todo,
                completed: !todo.completed,
              };
            }
            return todo;
          }),
        },
        completed: {
          todos: [completedTodo, ...completedTodos],
        },
      };

    default:
      return state;
  }
};

export default todosReducer;
