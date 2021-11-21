import { useState } from 'react'

import { filter, isEmpty, map } from 'lodash'
// import { useSnackbar } from 'notistack'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import '../styles/tasklist.scss'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

  // const { enqueueSnackbar } = useSnackbar()

  function handleCreateNewTask() {
    if (isEmpty(newTaskTitle)) {
      // enqueueSnackbar('Informe uma task.', { variant: 'warning' })
      return
    }

    setTasks(prevState => [
      ...prevState,
      { id: Math.random(), isComplete: false, title: newTaskTitle }
    ])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(prevState => map(prevState, task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete
        return task
      }
      return task
    }))
  }

  function handleRemoveTask(id: number) {
    setTasks(prevState => filter(prevState, task => task.id !== id))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateNewTask()
              }
            }}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {map(tasks, task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}