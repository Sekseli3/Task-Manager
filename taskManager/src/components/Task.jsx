const Task = ({task, toggleImportance, deleteTask}) => {
    const label = task.important ? 'make not important':'make important'
    const deleteLabel = 'delete'
    return(
        <li>{task.content} - {task.important ? "Important  ":"Not important    "}
        <button onClick={toggleImportance}>{ label}</button>
        <button onClick={deleteTask}>{deleteLabel}</button>
        </li>
    )
}

export default Task