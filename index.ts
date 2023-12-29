import App from "./server";
const port = process.env.PORT;

const server = new App().app;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
