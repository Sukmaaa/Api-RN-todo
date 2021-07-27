const { todo } = require("../../models");

exports.getTodos = async (req, res) => {
    try {
        const todos = await todo.findAll({
            order: [["createdAt", "ASC"]]
        })

        res.status(200).json({
            status: 200,
            message: "Succesfuly Get all todos",
            data: todos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })

    }
};

exports.getTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const resultTodo = await todo.findOne({
            where: {
                id,
            },
        });

        res.status(200).json({
            status: 200,
            message: `Successfuly Get todo by id = ${id}`,
            data: resultTodo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })

    }
};

exports.addTodo = async (req, res) => {
    try {
        const { title, status } = req.body;

        const todos = await todo.findAll({
            order: [["createdAt", "ASC"]]
        })

        const addTodo = await todo.create({
            title,
            status
        });

        res.status(200).json({
            status: 200,
            message: "Successfully add todo",
            data: {
                addTodo,
                afterUpdate: todos,
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTodo = await todo.destroy({
            where: {
                id,
            }
        })

        if (!deleteTodo) {
            return res.status(404).json({
                status: 404,
                message: 'Todo not found',
            });
        };

        const todosUpdated = await todo.findAll({
            order: [["createdAt", "ASC"]],
          });

        res.status(200).json({
            status: 200,
            message: 'successfully deleted',
            data: {
                deleteTodo,
                todosUpdated
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const updateTodo = await todo.update({
            title: req.body.title,
            status: req.body.status
        }, {
            where: {
                id,
            },
        });

        const todosUpdated = await todo.findAll({
            order: [["createdAt", "ASC"]],
          });

        res.status(200).json({
            status: 200,
            message: "Succesfully Update",
            data: {
                updateTodo,
                todosUpdated
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
};
