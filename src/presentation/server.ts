import express from "express";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
  }

  async start() {
    //* Middlewares: Funciones que se ejecutan ent odo momento que pasen por una ruta

    //* Public folder
    this.app.use(express.static(this.publicPath));

    //* Aplicaciones con diferentes rutas, para obtener todas las requests y las responses que no sean public
    this.app.get(/.*/, (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${3000}`);
    });
  }
}
