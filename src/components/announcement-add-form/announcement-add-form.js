import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './announcement-add-form.scss';

const AnnouncementAddForm = ({ onAnnouncementAdded }) => {
    const[values,setValues] = useState({
        title: '',
        description: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onAnnouncementAdded({
            id: uuidv4(),
            title: values.title,
            description: values.description,
            date: (new Date()).toUTCString()
        });
        
        setValues({
            title: '',
            description: '',
            date: ''
        });
    };

    return(
        <form className="item-add-form d-flex" onSubmit={onSubmit}>
            <input type="text" 
                className="form-control"
                onChange={handleChange("title")}
                placeholder="title"
                value={values.title}
            />
            <input type="text" 
                className="form-control"
                onChange={handleChange("description")}
                placeholder="description"
                value={values.description}
            />
            <button className="btn btn-outline-warning">
                Add
            </button>
        </form>
    );
};

export default AnnouncementAddForm;