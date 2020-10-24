import { Response, Request } from 'express';
import { ITodo } from './../../types/todo';
import Todo from '../../models/todo';

const getTodos = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    response.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (request: Request, response: Response): Promise<void> => {
  try {
    const body = request.body as Pick<ITodo, 'name' | 'description' | 'status'>;

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    response
      .status(201)
      .json({ message: 'Todo added', todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = request;

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );

    const allTodos: ITodo[] = await Todo.find();
    response.status(200).json({
      message: 'Todo updated',
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const deleteTodo: ITodo | null = await Todo.findByIdAndRemove(
      request.params.id
    );

    const allTodos: ITodo[] = await Todo.find();
    response.status(200).json({
      message: 'Todo deleted',
      todo: deleteTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
