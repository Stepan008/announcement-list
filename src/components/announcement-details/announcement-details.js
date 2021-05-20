import React, { useState} from 'react';

import './announcement-details.scss';

const AnnouncementDetails = ({announcement, similar, onDeleted, onEdited}) => {
    const[opened, setOpened] = useState(false);
    const[edit, setEdit] = useState(false);
    const[values,setValues] = useState({
        title: '',
        description: ''
    });

    const showDetails = () => {
        return (
            <React.Fragment>
                <div className="announcement-field">
                    <span>Description:</span>
                    <span>{announcement.description}</span>
                </div>
                <div className="announcement-field">
                    <span>Date:</span>
                    <span className="date-field">{announcement.date}</span>
                </div>
                <div className="see-also border-top border-info">
                    <span className="see-also">See also</span>
                    <ul>
                        {
                            similar.map( item => <li className="border border-info" key={item.id}>{item.title}</li>)
                        }
                    </ul>
                </div>
            </React.Fragment>
        )
    };
    
    const showEditForm = () => {
        return (
            <form className="item-edit-form d-flex" onSubmit={onSubmit}>
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
                    Edit
                </button>
            </form>
        );
    };

    const onAnnouncementClick = () => {
        setOpened(!opened);
    };

    const onEditClick = () => {
        setEdit(!edit);
        setValues({
            title: announcement.title,
            description: announcement.description
        });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onEdited({
            id: announcement.id,
            title: values.title,
            description: values.description,
            date: announcement.date
        });
        
        setEdit(!edit);
        setValues({
            title: '',
            description: ''
        });
    };

    return (
        <div className="announcement-details border border-info text-info">
            <div className="announcement-field title">
                <span onClick={onAnnouncementClick}>{announcement.title}</span>
                <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={() => onDeleted(announcement.id)}>
                    <i className="fa fa-trash-o" />
                </button>

                <button type="button"
                    className="btn btn-outline-warning btn-sm float-right"
                    onClick={() => onEditClick()}>
                    <i className="fa fa-pencil"/>
                </button>
            </div>

            {
                opened ? showDetails() : null
            }

            {
                edit ? showEditForm(): null
            }
            
        </div>
        
    );
};

export default AnnouncementDetails;