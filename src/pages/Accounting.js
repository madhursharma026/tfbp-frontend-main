import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../api';

function Accounting() {

    const [tableData, setTableData] = useState([])
    const [suggestClientsName, setsuggestClientsName] = useState("")
    const [suggestAttorneysName, setSuggestAttorneysName] = useState("")

    useEffect(() => {
        // fetch(`${API_URL}/ListPatientsCaseManagement/?client_id=&attorney_id=&accounting=True`).then((result) => {
        fetch(`${API_URL}/ListPatientsCaseManagement/?client_id=&attorney_id=&accounting=True`).then((result) => {
            result.json().then((resp) => {
                setTableData(resp.response)
            })
        })
    }, [])

    function suggestClients(e) {
        fetch(`${API_URL}/ClientAutoCompleteSearch/?client_name=${e.target.value}`).then((result) => {
            result.json().then((resp) => {
                setsuggestClientsName(resp)
            })
        })
    }

    function suggestAttorneys(e) {
        fetch(`${API_URL}/AttorneyAutoCompleteSearch/?attorney_name=${e.target.value}`).then((result) => {
            result.json().then((resp) => {
                setSuggestAttorneysName(resp)
            })
        })
    }

    function uncheckClose(e) {
        if (e.target.checked === false) {
            fetch(`${API_URL}/FilterTFCaseStatus/?tf_case_status=1%2C2%2C3%2C4&open_close=Open&accounting=True`).then((result) => {
                result.json().then((resp) => {
                    setTableData(resp.response)
                })
            })
        } else {
            fetch(`${API_URL}/FilterTFCaseStatus/?tf_case_status=1%2C2%2C3%2C4&open_close=&accounting=True`).then((result) => {
                result.json().then((resp) => {
                    setTableData(resp.response)
                })
            })
        }
    }

    function uncheckOpen(e) {
        if (e.target.checked === false) {
            fetch(`${API_URL}/FilterTFCaseStatus/?tf_case_status=1%2C2%2C3%2C4&open_close=&accounting=True`).then((result) => {
                result.json().then((resp) => {
                    setTableData(resp.response)
                })
            })
        } else {
            fetch(`${API_URL}/FilterTFCaseStatus/?tf_case_status=1%2C2%2C3%2C4&open_close=Close&accounting=True`).then((result) => {
                result.json().then((resp) => {
                    setTableData(resp.response)
                })
            })
        }
    }

    return (
        <>
            <AdBanner />
            <div className="container">
                <div className="mt-3">
                    <div className="d-flex align-items-center float-end">
                        <button type="button" className="btn btn-primary me-2">Add Patient</button>
                        <button className="btn btn-primary me-2">Request Update</button>
                        <button className="btn btn-primary me-2">Attorney Contact</button>
                        <button className="btn btn-primary me-2">Add Law Office</button>
                    </div>
                    <h4>Screen by Attorney Name:</h4>
                    <br />
                    <form method="POST" action="/case_management/">
                        <input type="hidden" name="csrfmiddlewaretoken" value="0bkBhTdlO12te4uiVQgzG8hzzDVzF3Y4jHgct9ZM2yHfgK23g2UKhyBLZlaWSY33" />
                        <div className="mb-3 row gx-2">
                            <div className="col-sm-6 offset-sm-6">
                                <div className="d-flex gap-2 w-100">
                                    <div className="flex-fill">
                                        <input type="text" placeholder="Search Patients" className="form-control me-2" name="search_clients" id="search_clients" onChange={(e) => suggestClients(e)} defaultValue={suggestClientsName} autocomplete="off" />
                                    </div>
                                    <div className="flex-fill">
                                        <input type="text" placeholder="Search Attorneys by Office Name" className="form-control me-2" name="search" id="search_attorneys" onChange={(e) => suggestAttorneys(e)} defaultValue={suggestAttorneysName} autocomplete="off" />
                                    </div>
                                    <div>
                                        <button type="button" id="btnsearch" className="btn btn-primary" style={{ background: "#1C6FB2" }}>
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                    <input type="text" hidden value="True" name="value" />
                                    <input type="hidden" name="client_id" id="client_id" />
                                    <input type="hidden" name="attorney_id" id="attorney_id" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row pt-5">
                        <div className="col-lg-2 col-md-4 col-xs-4 filter-container">
                            <Link to="#" data-id="" className="filter-item-all" style={{ textDecoration: "none" }}>All Patients</Link>

                            <div className="mb-3 pt-4">
                                <label className="me-2">
                                    <input name="open_close" value="Open" type="checkbox" className="me-1" defaultChecked onChange={(e) => uncheckOpen(e)} />Open
                                </label>
                                <label>
                                    <input name="open_close" value="Close" type="checkbox" className="me-1" defaultChecked onChange={(e) => uncheckClose(e)} />Closed
                                </label>
                            </div>

                            <button className="btn btn-primary m-1 filter-item w-100" style={{ textAlign: "left" }}>New Lead</button>

                            <button className="btn btn-primary m-1 filter-item w-100" style={{ textAlign: "left" }}>Treating</button>

                            <button className="btn btn-primary m-1 filter-item w-100" style={{ textAlign: "left" }}>Treatment Done</button>

                            <button className="btn btn-primary m-1 filter-item w-100" style={{ textAlign: "left" }}>Settlement</button>

                        </div>
                        <div className="col-lg-10 col-md-8 col-xs-8">
                            <table className="table table-striped table-hover table-borderless table-th-norm" style={{ justifyContent: "center" }} id="table-data">
                                <thead>
                                    <tr className="text-secondary">
                                        <td></td>
                                        <td></td>
                                        <td>Patient</td>
                                        <td>Original</td>
                                        <td>Payments</td>
                                        <td>Reductions</td>
                                        <td>Lien</td>
                                        <td>Total</td>
                                        <td>Check #</td>
                                        <td>Received</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableData.map((tableData, i) =>
                                            <tr style={{ cursor: "pointer" }}>
                                                <th>{i}</th>
                                                <td><span className='text-center' style={{ background: `${tableData.color}`, borderRadius: "5px", display: "block", color: "white" }}><b className='p-xl-0 p-1'>{tableData.name[i]}</b></span></td>
                                                <td>{tableData.client_name}</td>
                                                <td>${tableData.original}</td>
                                                <td>${tableData.payments}</td>
                                                <td>${tableData.reductions}</td>
                                                <td>${tableData.liens}</td>
                                                <td>${tableData.final}</td>
                                                <td>{tableData.check_number}</td>
                                                <td>{tableData.payment_received_date}</td>
                                            </tr>
                                        )
                                    }
                                    {/* <tr style={{ cursor: "pointer" }}>
                                        <th>1</th>
                                        <td><span className='text-center' style={{ background: "red", borderRadius: "5px", display: "block", color: "white" }}><b className='p-xl-0 p-1'>C</b></span></td>
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
                                        <td><span className='text-center' style={{ background: "blue", borderRadius: "5px", display: "block", color: "white" }}><b className='p-xl-0 p-1'>M</b></span></td>
                                        <td>Mosh, Josh</td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td>$0.00</td>
                                        <td></td>
                                        <td>_/_/_</td>
                                    </tr> */}
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
