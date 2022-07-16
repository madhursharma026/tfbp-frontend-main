import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner';


function Accounting() {
    return (
        <>
            <AdBanner />
            <div className="container">
                <div class="mt-3">
                    <div class="d-flex align-items-center float-end">
                        <button type="button" class="btn btn-primary me-2">Add Patient</button>
                        <button class="btn btn-primary me-2">Request Update</button>
                        <button class="btn btn-primary me-2">Attorney Contact</button>
                        <button class="btn btn-primary me-2">Add Law Office</button>
                    </div>
                    <h4>Screen by Attorney Name:</h4>
                    <br />
                    <form method="POST" action="/case_management/">
                        <input type="hidden" name="csrfmiddlewaretoken" value="0bkBhTdlO12te4uiVQgzG8hzzDVzF3Y4jHgct9ZM2yHfgK23g2UKhyBLZlaWSY33" />
                        <div class="mb-3 row gx-2">
                            <div class="col-sm-6 offset-sm-6">
                                <div class="d-flex gap-2 w-100">
                                    <div class="flex-fill">
                                        <input type="text" placeholder="Search Patients" class="form-control me-2" name="search_clients" id="search_clients" autocomplete="off" />
                                    </div>
                                    <div class="flex-fill">
                                        <input type="text" placeholder="Search Attorneys by Office Name" class="form-control me-2" name="search" id="search_attorneys" autocomplete="off" />
                                    </div>
                                    <div>
                                        <button type="button" id="btnsearch" class="btn btn-primary" style={{ background: "#1C6FB2" }}>
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                    <input type="text" hidden value="True" name="value" />
                                    <input type="hidden" name="client_id" id="client_id" />
                                    <input type="hidden" name="attorney_id" id="attorney_id" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-xs-4 filter-container">
                            <a href="#" data-id="" class="filter-item-all">All Patients</a>

                            <div class="mb-3">
                                <label class="me-2">
                                    <input name="open_close" value="Open" type="checkbox" class="me-1" onchange="filterTFCaseStatusRefresh(event)" checked />Open
                                </label>
                                <label>
                                    <input name="open_close" value="Close" type="checkbox" class="me-1" onchange="filterTFCaseStatusRefresh(event)" checked />Closed
                                </label>
                            </div>

                            <button class="btn btn-primary m-1 filter-item w-100">New Lead</button>

                            <button class="btn btn-primary m-1 filter-item w-100">Treating</button>

                            <button class="btn btn-primary m-1 filter-item w-100">Treatment Done</button>

                            <button class="btn btn-primary m-1 filter-item w-100">Settlement</button>

                        </div>
                        <div class="col-lg-10 col-md-8 col-xs-8">
                            <table class="table table-striped table-hover table-borderless table-th-norm" style={{ justifyContent: "center" }} id="table-data">
                                <thead>
                                    <tr class="text-secondary">
                                        <th></th>
                                        <th></th>
                                        <th>Patient</th>
                                        <th>Original</th>
                                        <th>Payments</th>
                                        <th>Reductions</th>
                                        <th>Lien</th>
                                        <th>Total</th>
                                        <th>Check #</th>
                                        <th>Received</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ cursor: "pointer" }}>
                                        <th>1</th>
                                        <td className='text-center' style={{ background: "red", borderRadius: "10px", display:"block" }}><b style={{ textAlign: "center", borderRadius: "10px", color: "white" }}>C</b></td>
                                        <td>Mosh, Josh</td>
                                        <td>$1,500.00</td>
                                        <td>$250.00</td>
                                        <td>$0.00</td>
                                        <td>$1250.00</td>
                                        <td>$1500.00</td>
                                        <td>tg-890</td>
                                        <td>2022-01-07</td>
                                    </tr>
                                    <tr style={{ cursor: "pointer" }}>
                                        <th>2</th>
                                        <td className='text-center' style={{ background: "blue", borderRadius: "10px", display:"block" }}><b style={{ textAlign: "center", borderRadius: "10px", color: "white" }}>M</b></td>
                                        <td>Mosh, Josh</td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td></td>
                                        <td>_/_/_</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Accounting;
