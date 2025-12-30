import React, { useState, useEffect } from "react";

interface Task {
  id?: number;
  name: string;
  durationDays: number;
}

interface TaskFormProps {
  task?: Task | null;
  onSave: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [name, setName] = useState<string>(task?.name || "");
  const [duration, setDuration] = useState<number>(task?.durationDays || 0);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDuration(task.durationDays);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || duration < 0) {
      alert("Please fill in all fields correctly");
      return;
    }

    onSave({
      ...task,
      name,
      durationDays: duration,
    });

    if (!task) {
      setName("");
      setDuration(0);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add New Task"}</h2>

      {/* Task Name */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Task Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter task name"
        />
      </div>

      {/* Task Duration */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Task Duration (days)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter number of days"
          min={0}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
};

export default TaskForm;
