import { Response, Request } from "express";

const todos = [
  { id: 1, text: "Buy Milk", completedAt: new Date() },
  { id: 2, text: "Buy Bread", completedAt: null },
  { id: 3, text: "Buy Butter", completedAt: new Date() },
];

export class TodosController {
  //* Aqui vamos a querer inyectar un repositorio, para poder implementarlo y usarlo mediante caso de usos
  constructor() {}
  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  //* TYPE GUARD
  private isValidId(id: any): id is number {
    return typeof id === "number" && !isNaN(id) && id > 0;
  }

  public GetTodoById = (req: Request, res: Response) => {
    const id = req.params.id && +req.params.id;

    if (!this.isValidId(id)) {
      return res.status(400).json({ error: "Id number is not a number" });
    }

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json(`TODO with id ${id} not found`);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Text property es required" });
    const newTodo = { id: todos.length + 1, text: text, completedAt: null };
    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = req.params.id && +req.params.id;

    if (!this.isValidId(id)) {
      return res.status(400).json({ error: "Id number is not a number" });
    }

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;
    // if (!text)
    //   return res.status(404).json({ error: `Text property is required` });

    // todo.text = text; //! OJO , PASA POR REFERENCIA

    //? Para evitar esto de la referencia podemos hacer un for each para la inmutabilidad
    // todos.forEach((todo, index) => {
    //   if (todo.id === id) {
    //     todos[index] = todo;
    //   }
    // });

    //* Va a ser igual al texto siempre y cuando  venga un valor sino va a seguir siendo el mismo valor que tenia antes
    todo.text = text || todo.text;
    completedAt === null
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = req.params.id && +req.params.id;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    todos.splice(todos.indexOf(todo), 1);

    res.json(todos);
  };
}
