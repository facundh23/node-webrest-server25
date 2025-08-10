import fs from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);

  //? EL cliente nos pide algo nosotros tenemos que devolverle algo como respuesta, le tenemos que decir al navegador cual es la respuesta
  //? Este es conocido como Server Side rendering
  //   res.writeHead(200, { "content-type": "text/html" }); //? Todo ok
  //   res.write("<h1>Hola Mundo</h1>");
  //   res.end();
  //   res.writeHead(400) //? Bad request
  //   res.writeHead(200) //? Not found

  //   const data = { name: "Jhon Doe", age: 30, city: "New York" };
  //   res.writeHead(200, { "Content-type": "application/json" });
  //   res.end(JSON.stringify(data));

  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-type": "application/javascript" });
  } else if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "Content-type": "text/css" });
  }

  const responseContent = fs.readFileSync(`./public/${req.url}`, "utf-8");
  res.end(responseContent);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
