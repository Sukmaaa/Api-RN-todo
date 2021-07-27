const {todo} = require("../../models");

exports.getTodos = async (req, res) => {
  try {
    const todos = await todo.findAll({ order: [["createdAt", "ASC"]] });

    res.status(200).json({
      status: 200,
      message: "Successfully",
      data: todos,
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

    const todo = await todo.findOne({
      where: {
        id,
      },
    });

    if (todo) {
      res.status(200).json({
        status: 200,
        message: `Successfully`,
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
      status: 500,
      message: "Get todo by id failed", error
    });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { title, status } = req.body;

    const todo = await todo.create({
      title,
      status,
    });

    const dataTodos = await todo.findAll({
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({
      status: "Successfully",
      message: "Add todo success",
      data: {
        recentlyAddedData: todo,
        dataTodos,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Add todo failed", error });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await todo.destroy({
      where: {
        id,
      },
    });

      const dataTodos = await todo.findAll({
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json({
        status: "Successfully",
        message: `Delete todo by id: ${id} success`,
        data: {
          deletedTodo,
          dataTodos,
        },
      });
  } catch (error) {
    res.status(500).json({ 
      status: "Failed", 
      message: "Delete todo by id failed", error });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const updateTodo = await todo.update({
      where: {
        id,
      },
    });


      // Mengambil semua data todo setelah dilakukan peng-update-an
      const dataTodos = await todo.findAll({
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json({
        status: 200,
        message: `Successfully`,
        data: {
          updateTodo,
          dataTodos,
        },
      });

  } catch (error) {
    res.status(500).json({ 
      status: 500, 
      message: "Patched todo by id failed", error });
  }
};
