import { Link } from "react-router-dom";
import AdBanner from "../components/AdBanner";
import React, { useEffect, useState } from "react";
import AutoCompleteService from "../api";

function Accounting() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leadButtonStatus, setLeadButtonStatus] = useState(false);
  const [treatingButtonStatus, setTreatingButtonStatus] = useState(false);
  const [treatingDoneButtonStatus, setTreatingDoneButtonStatus] = useState(false);
  const [settlementButtonStatus, setSettlementButtonStatus] = useState(false);
  const [leadButtonColor, setLeadButtonColor] = useState("white");
  const [leadButtonBg, setLeadButtonBg] = useState("#0B5ED7");
  const [treatingButtonColor, setTreatingButtonColor] = useState("white");
  const [treatingButtonBg, setTreatingButtonBg] = useState("#0B5ED7");
  const [settlementButtonColor, setSettlementButtonColor] = useState("white");
  const [settlementButtonBg, setSettlementButtonBg] = useState("#0B5ED7");
  const [TreatingDoneButtonColor, setTreatingDoneButtonColor] = useState("white");
  const [TreatingDoneButtonBg, setTreatingDoneButtonBg] = useState("#0B5ED7");
  const [suggestClientsName, setsuggestClientsName] = useState("");
  const [suggestAttorneysName, setSuggestAttorneysName] = useState("");
  const [attorneyValue, setAttorneyValue] = useState("");
  const [selectedAttorneyID, setSelectedAttorneyID] = useState(null);

  useEffect(async () => {
    await AutoCompleteService.listPatientsManagement({
      client_id: "",
      attorney_id: "",
      accounting: "True",
    }).then((res) => {
      setTableData(res.response);
      setLoading(true)
    });
  }, []);


  const resultForClientID = async (Id) => {
    await AutoCompleteService.listPatientsManagement({
      client_id: Id,
      attorney_id: "",
      accounting: "True",
    }).then((res) => {
      setTableData(res.response);
      setLoading(true)
    });
  };

  const resultForSelectedAttorneyID = async (Id) => {
    await AutoCompleteService.listPatientsManagement({
      client_id: "",
      attorney_id: Id,
      accounting: "True",
    }).then((res) => {
      setTableData(res.response);
      setLoading(true)
    });
  };

  useEffect(() => {
    if (selectedAttorneyID) {
      const temp = suggestAttorneysName.filter(
        (attorney) => attorney.id === selectedAttorneyID
      );

      if (temp.length > 0) {
        setAttorneyValue(temp[0].attorneyprofile.office_name);
        setSuggestAttorneysName(null);
      }
    }
  }, [selectedAttorneyID]);

  const suggestClients = async (e) => {
    const client_name = e.target.value;

    await AutoCompleteService.clientAutoCompleteSearch({
      client_name: client_name,
    }).then((res) => {
      setsuggestClientsName(res);
    });
  };

  const suggestAttorneys = async (e) => {
    const value = e.target.value;
    setAttorneyValue(value);

    await AutoCompleteService.attorneyAutoCompleteSearch({
      attorney_name: value,
    }).then((res) => {
      setSuggestAttorneysName(res);
    });
  };

  const uncheckClose = async (e) => {
    if (e.target.checked === false) {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3%2C4",
        open_close: "Open",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
      });
    } else {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
      });
    }
  };

  const uncheckOpen = async (e) => {
    if (e.target.checked === false) {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3%2C4",
        open_close: "Close",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
      });
    } else {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
      });
    }
  };

  const gettingAllPatients = async (e) => {
    setLeadButtonColor("white")
    setLeadButtonBg("#0B5ED7")
    setTreatingButtonColor("white")
    setTreatingButtonBg("#0B5ED7")
    setSettlementButtonColor("white")
    setSettlementButtonBg("#0B5ED7")
    setTreatingDoneButtonColor("white")
    setTreatingDoneButtonBg("#0B5ED7")
    await AutoCompleteService.listPatientsManagement({
      client_id: "",
      attorney_id: "",
      accounting: "True",
    }).then((res) => {
      setTableData(res.response);
      // console.log(res.response);
    });
  }

  const changeLeadButtonStatus = async (e) => {
    setLeadButtonStatus(!leadButtonStatus)
    if (leadButtonStatus === true) {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "2%2C3%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
        setLeadButtonBg("#0B5ED7")
        setLeadButtonColor("white")
      });
    } else {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
        setLeadButtonBg("#E4E4E4")
        setLeadButtonColor("blue")
      });
    }
  }

  const changeTreatingButtonStatus = async (e) => {
    setTreatingButtonStatus(!treatingButtonStatus)
    if (treatingButtonStatus === true) {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C3%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
        setTreatingButtonBg("#0B5ED7")
        setTreatingButtonColor("white")
      });
    } else {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
        setTreatingButtonBg("#E4E4E4")
        setTreatingButtonColor("blue")
      });
    }
  }

  const changeTreatingDoneButtonStatus = async (e) => {
    setTreatingDoneButtonStatus(!treatingDoneButtonStatus)
    if (treatingDoneButtonStatus === true) {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
        setTreatingDoneButtonBg("#0B5ED7")
        setTreatingDoneButtonColor("white")
      });
    } else {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
        setTreatingDoneButtonBg("#E4E4E4")
        setTreatingDoneButtonColor("blue")
      });
    }
  }

  const changeSettlementButtonStatus = async (e) => {
    setSettlementButtonStatus(!settlementButtonStatus)
    if (settlementButtonStatus === true) {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
        setSettlementButtonBg("#0B5ED7")
        setSettlementButtonColor("white")
      });
    } else {
      await AutoCompleteService.filterTFCaseStatus({
        tf_case_status: "1%2C2%2C3%2C4",
        open_close: "",
        accounting: "True",
      }).then((res) => {
        setTableData(res.response);
        setSettlementButtonBg("#E4E4E4")
        setSettlementButtonColor("blue")
      });
    }
  }


  return (
    <>
      <AdBanner />
      <div className="container">
        <div className="mt-3">
          <div className="d-flex align-items-center float-end">
            <button type="button" className="btn btn-primary me-2">
              Add Patient
            </button>
            <button className="btn btn-primary me-2">Request Update</button>
            <button className="btn btn-primary me-2">Attorney Contact</button>
            <button className="btn btn-primary me-2">Add Law Office</button>
          </div>
          <h4>Screen by Attorney Name:</h4>
          <br />
          <form method="POST" action="/case_management/">
            <input
              type="hidden"
              name="csrfmiddlewaretoken"
              value="0bkBhTdlO12te4uiVQgzG8hzzDVzF3Y4jHgct9ZM2yHfgK23g2UKhyBLZlaWSY33"
            />
            <div className="mb-3 row gx-2">
              <div className="col-sm-6 offset-sm-6">
                <div className="d-flex gap-2 w-100">
                  <div className="flex-fill">
                    <div class="dropdown">
                      <input data-bs-toggle="dropdown"
                        type="text"
                        placeholder="Search Patients"
                        className="form-control me-2"
                        name="search_clients"
                        id="search_clients search_clients_dropdown"
                        onChange={(e) => suggestClients(e)}
                        defaultValue={suggestClientsName}
                        autocomplete="off"
                      />
                      <ul class="dropdown-menu p-0" aria-labelledby="search_clients_dropdown">
                        <div className="tt-dataset tt-dataset-clients">
                          {suggestClientsName &&
                            suggestClientsName.map((client) => (
                              <li onClick={() => resultForClientID(client.id)}>
                                {suggestClientsName && (
                                  <div className="tt-suggestion tt-selectable">
                                    {client.first_name} {client.last_name}
                                  </div>
                                )}
                              </li>
                            ))}
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className="flex-fill">
                    <span
                      className="twitter-typeahead"
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <div class="dropdown">
                        <input data-bs-toggle="dropdown"
                          type="text"
                          placeholder="Search Attorneys by Office Name"
                          className="form-control me-2"
                          name="search"
                          id="search_attorneys dropdownMenuButton1"
                          onChange={(e) => suggestAttorneys(e)}
                          value={attorneyValue}
                          defaultValue={suggestAttorneysName}
                          autocomplete="off"
                        />
                        <ul class="dropdown-menu p-0" aria-labelledby="dropdownMenuButton1">
                          <div className="tt-dataset tt-dataset-clients">
                            {suggestAttorneysName &&
                              suggestAttorneysName.map((attorney) => (
                                <li onClick={() => resultForSelectedAttorneyID(attorney.id)}>
                                  {suggestAttorneysName && (
                                    <div className="tt-suggestion tt-selectable">
                                      {attorney.attorneyprofile.office_name}
                                    </div>
                                  )}
                                </li>
                              ))}
                          </div>
                        </ul>
                      </div>
                    </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      id="btnsearch"
                      className="btn btn-primary"
                      style={{ background: "#1C6FB2" }}
                    >
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
              <p
                className="filter-item-all text-primary"
                style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => gettingAllPatients()}
              >
                All Patients
              </p>

              <div className="mb-3 pt-4">
                <label className="me-2">
                  <input
                    name="open_close"
                    value="Open"
                    type="checkbox"
                    className="me-1"
                    defaultChecked
                    onChange={(e) => uncheckOpen(e)}
                  />
                  Open
                </label>
                <label>
                  <input
                    name="open_close"
                    value="Close"
                    type="checkbox"
                    className="me-1"
                    defaultChecked
                    onChange={(e) => uncheckClose(e)}
                  />
                  Closed
                </label>
              </div>

              <button
                className="btn m-1 filter-item w-100 p-2"
                style={{ textAlign: "left", background: `${leadButtonBg}`, color: `${leadButtonColor}` }} onClick={() => changeLeadButtonStatus()}
              >
                New Lead
              </button>
              <button
                className="btn p-2 m-1 filter-item w-100"
                style={{ textAlign: "left", background: `${treatingButtonBg}`, color: `${treatingButtonColor}` }} onClick={() => changeTreatingButtonStatus()}
              >
                Treating
              </button>

              <button
                className="btn p-2 m-1 filter-item w-100"
                style={{ textAlign: "left", background: `${TreatingDoneButtonBg}`, color: `${TreatingDoneButtonColor}` }} onClick={() => changeTreatingDoneButtonStatus()}
              >
                Treating Done
              </button>

              <button
                className="btn p-2 m-1 filter-item w-100"
                style={{ textAlign: "left", background: `${settlementButtonBg}`, color: `${settlementButtonColor}` }} onClick={() => changeSettlementButtonStatus()}
              >
                Settlement
              </button>
            </div>
            <div className="col-lg-10 col-md-8 col-xs-8">
              <table
                className="table table-striped table-hover table-borderless table-th-norm"
                style={{ justifyContent: "center" }}
                id="table-data"
              >
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

                  {loading ?
                    <>
                      {(tableData.length !== 0) ?
                        <>
                          {tableData.map((tableData, i) => (
                            <tr style={{ cursor: "pointer" }}>
                              <th>{i + 1}</th>
                              <td>
                                <span
                                  className="text-center"
                                  style={{
                                    // background: `#${tableData.specialty.color}`,
                                    background: 'red',
                                    borderRadius: "5px",
                                    display: "block",
                                    color: "white"
                                  }}
                                >
                                  <b className="p-xl-0 p-1">{tableData.specialty.name[i]}</b>
                                </span>
                              </td>
                              <td>{tableData.client_name}</td>
                              <td>${tableData.original}</td>
                              <td>${tableData.payments}</td>
                              <td>${tableData.reductions}</td>
                              <td>${tableData.liens}</td>
                              <td>${tableData.final}</td>
                              <td>{tableData.check_number}</td>
                              <td>{tableData.payment_received_date}</td>
                            </tr>
                          ))}
                        </>
                        :
                        <>
                          <tr style={{ cursor: "pointer" }}>
                            <td colspan="12" className="text-center">
                              No records to display
                            </td>
                          </tr>
                        </>
                      }
                    </>
                    :
                    <>
                      <tr>
                        <td colspan="12" className="text-center">
                          <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    </>
                  }
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
