import Todo from '../model/todo.js';

/**
 * @desc    Get all todos for the logged-in user
 * @route   GET /api/todos
 * @access  Private
 */
export const getTodos = async (req, res) => {
    try {
        // Assuming you have authentication middleware that adds the user to the request
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Create a new todo
 * @route   POST /api/todos
 * @access  Private
 */
export const createTodo = async (req, res) => {
    try {
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({ message: 'Task is required' });
        }

        const todo = new Todo({
            userId: req.user.id, // from auth middleware
            task,
        });

        const createdTodo = await todo.save();
        res.status(201).json(createdTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Update a todo (e.g., mark as complete)
 * @route   PUT /api/todos/:id
 * @access  Private
 */
export const updateTodo = async (req, res) => {
    try {
        const { task, completed } = req.body;
        const todo = await Todo.findById(req.params.id);

        if (todo && todo.userId.toString() === req.user.id) {
            todo.task = task ?? todo.task;
            todo.completed = completed ?? todo.completed;
            const updatedTodo = await todo.save();
            res.json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo not found or user not authorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Delete a todo
 * @route   DELETE /api/todos/:id
 * @access  Private
 */
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (todo && todo.userId.toString() === req.user.id) {
            await todo.deleteOne();
            res.json({ message: 'Todo removed' });
        } else {
            res.status(404).json({ message: 'Todo not found or user not authorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};