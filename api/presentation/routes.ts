import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //* Solo mandamos la referencia de la funcion, cuando tenemos argumentos que simplemente son suados para pasarlos a una funcion podemos usarlo asi
    //* ya que son la misma cantidad de argumentos en las mismas posiciones
    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
