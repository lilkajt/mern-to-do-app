import React from 'react'

type TaskProps = {
    tasks: {id: number; text: string; completed: boolean}[];
    onUpdateTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
}
const Task: React.FC<TaskProps> = ({tasks, onDeleteTask, onUpdateTask}) => {
  return (
    <div className="main">
        <div className="list">
            {
                tasks.map( (task) => (
                    <div className="card">
                        {task.text}
                        <button type="button" onClick={() => onUpdateTask(task.id)}>Update</button>
                        <button type="button" onClick={() => onDeleteTask(task.id)}>Delete</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Task