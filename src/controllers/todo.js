const db = require("../../models");

exports.getTodos = async (req, res) => {
  try {
    const result = await db.Todo.findAll({ order: [["createdAt", "ASC"]] });

    res.status(200).json({
      status: 200,
      message: "Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      status: 500, 
      message: "Get all todos failed", error });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await db.Todo.findOne({
      where: {
        id,
      },
    });

    if (todo) {
      res.status(200).json({
        status: "Success",
        message: `Get todo by id: ${id} success`,
        data: todo,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: `Failed id doesn't exist`,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Get todo by id failed", error
    });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { title, status } = req.body;

    const todo = await db.Todo.create({
      title,
      status,
    });

    const dataTodos = await db.Todo.findAll({
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({
      status: 200,
      message: "Add todo success",
      data: {
        recentlyAddedData: todo,
        dataTodos,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      status: 500, 
      message: "Add todo failed", error });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await db.Todo.findOne({
      where: {
        id,
      },
    });

    if (deletedTodo) {
      await db.Todo.destroy({
        where: {
          id,
        },
      });

      const dataTodos = await db.Todo.findAll({
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json({
        status: 200,
        message: `Successfully`,
        data: {
          deletedTodo,
          dataTodos,
        },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: `Failed id doesn't exist`,
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 500, 
      message: "Delete todo by id failed", error });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const patchedTodo = await db.Todo.findOne({
      where: {
        id,
      },
    });

    if (patchedTodo) {
      await db.Todo.update(
        { title: req.body.title, status: req.body.status },
        {
          where: {
            id,
          },
        }
      );

      const todoAfterUpdated = await db.Todo.findOne({
        where: {
          id,
        },
      });

      const dataTodos = await db.Todo.findAll({
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json({
        status: 200,
        message: "Successfully",
        data: {
          todoBeforeUpdated: patchedTodo,
          todoAfterUpdated,
          dataTodos,
        },
      });
    } else {
      res.status(400).json({
        status:400,
        message: `Failed id doesn't exist`,
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 500, 
      message: "Patched todo by id failed", error });
  }
};
