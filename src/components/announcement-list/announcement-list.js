import React, { useState } from 'react';

import AnnouncementDetails from '../announcement-details';
import SearchPanel from '../search-panel';
import AnnouncementAddForm from '../announcement-add-form';
import { v4 as uuidv4 } from 'uuid';

import './announcement-list.scss';

const AnnouncementList = () => {
    const[values, setValues] = useState({
        announcements: [
            {
                id: uuidv4(),
                title: 'Some title',
                description: 'Some description',
                date: (new Date()).toUTCString(),
            }
        ],
        searchString: ''
    });

    const onAnnouncementAdded = (announcement) =>{
        setValues({ ...values, announcements: [ ...values.announcements, announcement ] });
    };

    const onAnnouncementDeleted = (id) =>{
        const idx = values.announcements.findIndex((announcement) => announcement.id === id);

        setValues({ ...values, announcements: [ 
            ...values.announcements.slice(0, idx),
            ...values.announcements.slice(idx + 1),
        ] });
    };

    const onAnnouncementEdited = (editedAnnouncement) =>{
        const idx = values.announcements.findIndex((announcement) => announcement.id === editedAnnouncement.id);

        setValues({ ...values, announcements: [ 
            ...values.announcements.slice(0, idx),
            editedAnnouncement,
            ...values.announcements.slice(idx + 1),
        ] });
    };

    const onSearchChange = (newSearchString) => {
        setValues({ ...values, searchString: newSearchString });
    };

    const search = () => {
        const { announcements, searchString} = values;
        return searchString !== '' ? announcements.filter((announcement) => announcement.title.toLowerCase().indexOf(searchString.toLowerCase()) + 1) : announcements;
    };
    
    const visibleAnnouncements = search();

    const getSimilar = (id) => {
        const item = values.announcements.find(announcement => announcement.id === id);

        const similar = values.announcements.filter(announcement => {
            return item.title.split(" ").some(w => announcement.title.split(" ").some(ww => w === ww)) 
                && item.description.split(" ").some(w => announcement.description.split(" ").some(ww => w === ww))
                && id !== announcement.id ? announcement : null
        })
        return similar.length > 3 ? [similar[0], similar[1], similar[2]] : similar
    };
    return (
        <div className="main">
            <SearchPanel onSearchChange={onSearchChange}/>

            <div className="announcement-list">
                {
                    visibleAnnouncements.map( announcement => {
                        return <AnnouncementDetails
                            key={announcement.id}
                            announcement={announcement} 
                            onDeleted={onAnnouncementDeleted}
                            onEdited={onAnnouncementEdited}
                            similar={getSimilar(announcement.id)}/>
                    })
                }
            </div>
            
            <AnnouncementAddForm onAnnouncementAdded={onAnnouncementAdded}/>
        </div>
    );
};

export default AnnouncementList;