import React, { useState } from "react";
import TaskForm from "../components/TaskForm";

interface Task {
  id?: number;
  name: string;
  durationDays: number;
}

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleSave = (task: Task) => {
    if (task.id) {
      // Editing existing task
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      setEditTask(null);
    } else {
      // Adding a new task
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
  };

  return (
    <div className="p-4">
      {/* Task Form */}
      <TaskForm task={editTask} onSave={handleSave} />

      {/* Tasks List Title */}
      <h3 className="text-lg font-bold mt-6 mb-2">Current Tasks</h3>

      {/* Tasks List */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-2 rounded mb-2 flex justify-between items-center"
          >
            <span>{task.name} - {task.durationDays} days</span>
            <button
              onClick={() => setEditTask(task)}
              className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
