import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const PORT = 3001;
const COMMENTS_FILE = './src/backend/comments.json';

app.use(cors());
app.use(express.json());

async function readComments() {
	const data = await fs.readFile(COMMENTS_FILE, 'utf-8');
	return JSON.parse(data);
}

async function writeComments(comments) {
	await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

app.get('/comments/:locationId', async (req, res) => {
	const comments = await readComments();
	const locationComments = comments.filter(
		(comment) => comment.locationId === Number(req.params.locationId)
	);

	res.json(locationComments);
});

app.post('/comments', async (req, res) => {
	const { locationId, name, text } = req.body;

	if (!locationId || !name || !text) {
		return res.status(400).json({
			message: 'locationId, name and text are required'
		});
	}

	const comments = await readComments();

	const newComment = {
		id: Date.now(),
		locationId: Number(locationId),
		name,
		text,
		createdAt: new Date().toISOString()
	};

	comments.push(newComment);
	await writeComments(comments);

	res.status(201).json(newComment);
});

app.listen(PORT, () => {
	console.log(`Backend server running on http://localhost:${PORT}`);
});