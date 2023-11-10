const Task = ({task, toggleImportance}) => {
    const label = task.importance ? 'make important':'make not important'
    return(
        <li>{task.content} - {task.importance ? "Important":"Not important"}
        <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Task