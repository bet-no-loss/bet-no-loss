import React from 'react';
import SportEventForm from "../SportEventsForm/SportEventForm";

const Admin = () => {
    return (
        <div>
           <h1>Admin page</h1>
            <div className="container">
                <SportEventForm />
            </div>

            {/*Formulaire création event*/}
            <div className="container my-5">

                <div className="card">

                    <h5 className="card-header info-color white-text text-center py-4">
                        <strong>Créer un pari sportif</strong>
                    </h5>


                    <div className="card-body">


                        <form>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Titre</label>
                                <input
                                    type="text"
                                    className="form-control mx-auto w-100"
                                    id="inputAddress"
                                    placeholder="nom des équipes"/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Equipe 1</label>
                                    <input
                                        type="email"
                                        className="form-control mx-auto w-100"
                                        id="inputEmail4"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Equipe 2</label>
                                    <input
                                        type="password"
                                        className="form-control mx-auto w-100"
                                        id="inputPassword4"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Date du match</label>
                                    <input
                                        type="email"
                                        className="form-control mx-auto w-100"
                                        id="inputEmail4"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Nombre</label>
                                    <input
                                        type="password"
                                        className="form-control mx-auto w-100"
                                        id="inputPassword4"
                                    />
                                </div>
                            </div>
                            <button className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Send</button>

                        </form>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default Admin;