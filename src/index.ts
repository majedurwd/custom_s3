import express, { Request, Response } from 'express';
import { default as fileUploader } from './middlewares/uploader'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.post('/api/upload', fileUploader('single', 'img'), (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.file);
  res.send('File uploaded successfully');
})

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
