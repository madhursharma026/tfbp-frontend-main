import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner';


function Profile() {
    return (
        <>
        <AdBanner />
            <div className="container">
                <div className="row py-5 px-3">
                    <div className="col-lg-4 col-md-4 col-xs-4">
                        <Link to="/#/" style={{ textDecoration: "none", padding: "10px 5px 10px 5px" }}>Account
                            Details</Link> <br /><br />
                        <Link to="/#/" style={{ textDecoration: "none", padding: "10px 5px 10px 5px" }}>Locations</Link>
                        <br /><br />
                        <Link to="/#/"
                            style={{ textDecoration: "none", padding: "10px 5px 10px 5px" }}>Provider Details</Link><br /><br />
                        <Link to="/#/"
                            style={{ textDecoration: "none", padding: "10px 5px 10px 5px" }}>Firm Users</Link> <br /><br />
                        <Link to="/#/" style={{ textDecoration: "none", padding: "10px 5px 10px 5px" }}>Add
                            Users</Link> <br /><br />
                    </div>
                    <div className="col-lg-8 col-md-8 col-xs-8">
                        <div className="d-flex" style={{ float: "right", alignItems: "center" }}>
                            <Link to="/#/" className="btn btn-primary me-3">Add Locations</Link>
                            <Link to="/#/" className="btn btn-primary">Add Doctors</Link>
                        </div>
                        <h4>Listed Locations:</h4>
                        <br />
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <Link to="/#/" style={{ float: "right" }}
                                        className="btn btn-sm btn-link pull-right">
                                        <i className="fa fa-pencil-alt"></i> Edit
                                    </Link>
                                    <div>
                                        , None, None, 54000, Canada
                                    </div>
                                    <div>
                                        <span></span>
                                    </div>
                                    <div>
                                        <span style={{ color: "#CC0000" }}>Chiropractor</span>
                                    </div>
                                    <strong>Doctors:</strong>
                                </li>
                            </ul>
                        </div>
                        <br /><br />
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <Link to="/#/" style={{ float: "right" }}
                                        className="btn btn-sm btn-link pull-right">
                                        <i className="fa fa-pencil-alt"></i> Edit
                                    </Link>
                                    <div>
                                        345 Park Avenu, New York, New York, 10154, United States
                                    </div>
                                    <div>
                                        <span>03112323232 </span>
                                        <span><strong>| Fax: </strong> 1121211 </span>
                                        <span>| a@gmail.com</span>
                                    </div>
                                    <div>
                                        <span style={{ color: "#3300CC" }}>MRI Facility</span>
                                    </div>
                                    <strong>Doctors:</strong>
                                </li>
                            </ul>
                        </div>
                        <br /><br />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
