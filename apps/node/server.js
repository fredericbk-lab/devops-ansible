const express = require("express");
const app = express();

app.get("/", (_, res) => res.send("Node Docker - Déployé par Ansible 🚀"));

app.listen(process.env.PORT || 3000, () => console.log("Node up"));
