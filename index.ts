import App from "./server";
const port = process.env.PORT;

console.log(process.env.DATABASE_URL);

const server = new App().app;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
