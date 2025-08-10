import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoController = new TodosController();

    //* Solo mandamos la referencia de la funcion, cuando tenemos argumentos que simplemente son suados para pasarlos a una funcion podemos usarlo asi
    //* ya que son la misma cantidad de argumentos en las mismas posiciones
    router.get("/", todoController.getTodos);
    //! La linea de arriba es la misma que esta de abajo pero mas simple
    // router.get("/api/todos",(req, res ) => todoController.getTodos(req, res));

    router.get("/:id", todoController.GetTodoById);

    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);
    return router;
  }
}
