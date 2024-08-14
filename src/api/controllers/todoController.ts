import { Request, Response } from 'express'
import Todo from '../models/Todo'

class TodoController {
    // Pegando todas as Tarefas
    async getAllTodos(req: Request, res: Response) {
        try {
            const todos = await Todo.find()
            return res.json(todos).status(200)

        } catch (error) {
            console.log(error)
            return res.status(500).send('Servidor falhou')
        }
    }

    // Criando a Tarefa
    async createTodo(req: Request, res: Response) {
        try {
            const { task } = req.body;

            if (!task) {
                return res.status(400).send('Task está vazio. Preencha todos os campos!')
            }

            const todo = new Todo({
                task
            })

            await todo.save() // Salvando no banco MongoDB
            return res.status(200).json(todo)

        } catch (error) {
            console.log(error)
            return res.status(500).send('Servidor falhou')
        }
    }

    // Atualizando as Tarefas
    async updateFinishedTodo(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { finished } = req.body

            await Todo.findByIdAndUpdate(id, {
                finished
            })

            const todo = await Todo.findById(id)
            return res.status(200).json(todo)

        } catch (error) {
            console.log(error)
            return res.status(500).send('Servidor falhou')
        }
    }

    // Deletando Tarefas
    async removeTodoById(req: Request, res: Response) {
        try {
            const { id } = req.params
            await Todo.findByIdAndDelete(id)

            return res.status(204).send()

        } catch (error) {
            console.log(error)
            return res.status(500).send('Servidor falhou')
        }
    }
}

export default new TodoController()