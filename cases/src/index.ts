import { app } from "./app";

// Start function to make the necessary connections and set
// configurations depending on the env

const start = async () => {
  console.log("Starting up cases service...");

  app.listen(3000, () => console.log("Listening on port 3000"));
};

start();
