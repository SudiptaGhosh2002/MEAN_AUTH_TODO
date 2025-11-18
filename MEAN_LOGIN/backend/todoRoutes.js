import express from 'express';

const router = express.Router();

// You can add your todo routes here. For example:
// router.get('/', getTodos);
// router.post('/', createTodo);

router.get('/', (req, res) => res.json({ message: 'Todo routes are working!' }));

export default router;