import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';

import { required, validateDate } from '../validations';
import { TaskContext } from '../contexts/TaskContext';

import "react-datepicker/dist/react-datepicker.css";


export const AddTaskForm = () => {
    const { addTask } = useContext(TaskContext);

    const [description, setDescription] = useState(``);
    const [dueDate, setDueDate] = useState(new Date());
    const [isPriority, setPriority] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!required.rule(description)) {
            alert(required.message);
            return;
        }

        if (!validateDate.rule(dueDate)) {
            alert(validateDate.message);
            return;
        }

        addTask({ description, dueDate, isPriority });

        setDescription(``);
        setDueDate(new Date());
        setPriority(false);
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Add New Task</legend>
                <div className="form-control">
                    <label>Task</label>
                    <input type="text"
                           placeholder="Add Task"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Date & Time</label>
                    <DatePicker dateFormat="dd/MM/yyyy"
                                selected={dueDate} 
                                onChange={(date) => setDueDate(date)} 
                    />
                </div>
                <div className="form-control form-control-check">
                    <label>Is it a priority?</label>
                    <input type="checkbox"
                           checked={isPriority}
                           onChange={(e) => setPriority(e.currentTarget.checked)}
                    />
                </div>
            </fieldset>
            <input className="btn btn-block" type="submit" value="Save Task" />
        </form>
    );
};
