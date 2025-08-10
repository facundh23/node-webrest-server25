import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = "public", routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares: Funciones que se ejecutan ent odo momento que pasen por una ruta

    //? Primer middleware usado para peticiones POST de todos, son dos una para recibir json y otra para recibir x-form-urlencoded
    this.app.use(express.json()); // JSON o RAW
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlenconded

    //* Public folder
    this.app.use(express.static(this.publicPath));

    //* Definir mis rutas
    this.app.use(this.routes);

    //* Cualquier ruta no definida va a pasar por aqui, esto ayuda al router de los SPA
    this.app.get(/.*/, (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
