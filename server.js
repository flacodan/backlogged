import express from 'express';
import ViteExpress from 'vite-express';
import authCtrl from './src/controller.js';


const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
ViteExpress.config({ printViteDevServerHost: true });


const { getAuthData, addAuthData, updateAuthData, deleteAuthData } = authCtrl;
// AUTH ENDPOINTS
app.get("/", getAuthData);
app.post("/user", addAuthData);
app.put("/user/:id", updateAuthData);
app.delete("/user/:id", deleteAuthData);

const { getClientData, addClientData, updateClientData, deleteClientData } = clientCtrl;
// CLIENT ENDPOINTS
app.get("/", getClientData);
app.post("/user", addClientData);
app.put("/user/:id", updateClientData);
app.delete("/user/:id", deleteClientData);



ViteExpress.listen(app, port, () => {console.log(`Server is listening http://localhost:${port}`)});