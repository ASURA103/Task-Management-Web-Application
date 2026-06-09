import Task from "../../config/schema/taskSchema.js";
import {
  createTaskValidator,
  updateTaskValidator,
  taskQueryValidator,
} from "../../config/validators/validators.js";

// ---------------- CREATE TASK ----------------
export const createTask = async (req, res) => {
  const body = req.body;

  try {
    const result = createTaskValidator.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors.map((e) => e.message),
      });
    }

    const task = await Task.create({
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      dueDate: body.dueDate,
      tags: body.tags,
      userId: req.userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log("error in createTask", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- GET TASKS (ACTIVE) ----------------
export const getTasks = async (req, res) => {
  const query = req.query;

  try {
    const result = taskQueryValidator.safeParse(query);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors.map((e) => e.message),
      });
    }

    const { search, status, priority, sortBy, page = 1, limit = 10 } = query;

    let filter = {
      userId: req.userId,
      deletedAt: null,
    };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // 🔥 PREFIX + CASE INSENSITIVE SEARCH
    if (search) {
      filter.title = {
        $regex: `^${search}`,
        $options: "i",
      };
    }

    // SORTING
    let sort = { isPinned: -1, createdAt: -1 };

    if (sortBy === "oldest") sort = { isPinned: -1, createdAt: 1 };
    if (sortBy === "priority") sort = { isPinned: -1, priority: -1 };
    if (sortBy === "dueDate") sort = { isPinned: -1, dueDate: 1 };

    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limit);

    return res.status(200).json({
      message: "Tasks fetched successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("error in getTasks", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- UPDATE TASK ----------------
export const updateTask = async (req, res) => {
  const body = req.body;

  try {
    const result = updateTaskValidator.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors.map((e) => e.message),
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
        deletedAt: null,
      },
      body,
      { new: true },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.log("error in updateTask", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- DELETE TASK (MOVE TO TRASH) ----------------
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
        deletedAt: null,
      },
      {
        deletedAt: new Date(),
      },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task moved to trash",
    });
  } catch (error) {
    console.log("error in deleteTask", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- TOGGLE PIN ----------------
export const togglePinTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
      deletedAt: null,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.isPinned = !task.isPinned;
    await task.save();

    return res.status(200).json({
      message: task.isPinned ? "Task pinned" : "Task unpinned",
      task,
    });
  } catch (error) {
    console.log("error in togglePinTask", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- GET TRASH TASKS ----------------
export const getTrashTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
      deletedAt: { $ne: null },
    }).sort({ deletedAt: -1 });

    return res.status(200).json({
      message: "Trash tasks fetched successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- RESTORE TASK ----------------
export const restoreTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
        deletedAt: { $ne: null },
      },
      {
        deletedAt: null,
      },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found in trash",
      });
    }

    return res.status(200).json({
      message: "Task restored successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- PERMANENT DELETE ----------------
export const permanentDeleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
      deletedAt: { $ne: null },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found in trash",
      });
    }

    return res.status(200).json({
      message: "Task permanently deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
