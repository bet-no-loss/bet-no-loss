import React from 'react';
import SportEventForm from "../SportEventsForm/SportEventForm";

const Admin = () => {
    return (
        <div>
           <h1>Admin page</h1>
            <div className="container">
                <SportEventForm />
            </div>

        </div>
    );
};

export default Admin;