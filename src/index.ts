import express, { Request, Response } from 'express';
import {
	upload,
	uploadHandler,
	authenticator,
	appErrorHandler,
	customUploadHandler,
} from "./middlewares";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello World');
});

// app.post(
// 	"/api/upload",
// 	authenticator,
// 	uploadHandler(upload.single("img")),
// 	(req: Request, res: Response) => {
// 		console.log(req.body);
// 		console.log(req.file);
// 		res.send("File uploaded successfully");
// 	},
// );

app.post(
	"/api/upload",
	authenticator,
	customUploadHandler({
		mimeTypes: ["image/jpeg", "image/png"],
		maxFileSize: 10 * 1024 * 1024,
		type: "single",
	}),
	(req: Request, res: Response) => {
		console.log(req.body);
		console.log(req.file);
		res.send("File uploaded successfully");
	},
);

app.use(express.urlencoded({ extended: true }));
app.use(appErrorHandler);

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
