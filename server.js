import express from 'express';
import ViteExpress from 'vite-express';


const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
ViteExpress.config({ printViteDevServerHost: true });


// app.get('/dbLength', (req, res) => {
//     res.status(200).send(db.length);
// });



ViteExpress.listen(app, port, () => {console.log(`Server is listening http://localhost:${port}`)});