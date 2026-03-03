import express, { Request, Response } from 'express';
import { appErrorHandler } from "./middlewares";
import router from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.static('public'));

// Routes

// Health check
app.get("/api/health", async (_req, res) => {
	return res.json({ message: "✅ Welcome to Geotasky api server" });
});

// Default route
app.get("/", async (_req, res) => {
	return res.json({ message: "✅ Welcome to Geotasky api server" });
});

app.use("/api", router);

app.use((req: Request, res: Response) => {
	return res.status(404).json({
		code: 404,
		success: false,
		message: `Can't find ${req.originalUrl} on the server`,
	});
});


app.use(express.urlencoded({ extended: true }));
app.use(appErrorHandler);

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
