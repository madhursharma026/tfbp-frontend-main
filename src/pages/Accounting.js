import AdBanner from "../components/AdBanner";
import React, { useEffect, useState } from "react";
import AutoCompleteService from "../api";
import { useIsMount } from "../customHooks";

function Accounting() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(() => false);
  const [leadButtonStatus, setLeadButtonStatus] = useState(() => true);
  const [treatingButtonStatus, setTreatingButtonStatus] = useState(() => true);
  const [treatingDoneButtonStatus, setTreatingDoneButtonStatus] = useState(() => true);
  const [settlementButtonStatus, setSettlementButtonStatus] = useState(() => true);
  const [suggestClientsName, setsuggestClientsName] = useState(() => "");
  const [suggestAttorneysName, setSuggestAttorneysName] = useState(() => "");
  const [attorneyValue, setAttorneyValue] = useState(() => "");
  const [selectedAttorneyID, setSelectedAttorneyID] = useState(() => null);
  const [radioOpenClose, setRadioOpenClose] = useState(() => "Open")

  const isMount = useIsMount()

  useEffect(() => {
    AutoCompleteService.listPatientsManagement({
      client_id: "",
      attorney_id: "",
      accounting: "True",
    }).then((res) => {
      setTableData(res.response);
      setLoading(true);
    });
  }, []);

  const resultForClientID = async (Id) => {
    await AutoCompleteService.listPatientsManagement({
      client_id: Id,
      attorney_id: "",
      accounting: "True",
    }).then((res) => {
      setTableData(res.response);
      setLoading(true);
    });
  };

  const resultForSelectedAttorneyID = async (Id) => {
    await AutoCompleteService.listPatientsManagement({
      client_id: "",
      attorney_id: Id,
      accounting: "True",
    }).then((res) => {
      setTableData(res.response);
      setLoading(true);
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

  const handleFilterCaseEFCaseStatusApi = async () => {
    if (isMount) return
    // when componentent is rendered
    setLoading(false);
    var tf_case_status = ""

    const buttonArray = [
      leadButtonStatus,
      treatingButtonStatus,
      treatingDoneButtonStatus,
      settlementButtonStatus] // this arrangement is important

    const buttonArrayWithTheirIndixes = buttonArray.map((value, idx) => {
      if (value === true) {
        return (idx + 1).toString()
      }
    });

    const buttonArrayFiltered = buttonArrayWithTheirIndixes.filter((val) => (val != undefined && val != null));

    tf_case_status = buttonArrayFiltered.join(",")

    tf_case_status = encodeURIComponent(tf_case_status)

    await AutoCompleteService.filterTFCaseStatus({
      tf_case_status: tf_case_status,
      open_close: radioOpenClose === "Open" ? "Open" : "",
      accounting: "True",
    })
      .then((res) => {
        setTableData(res.response)
        setLoading(true);
      })
  }

  useEffect(
    () => { handleFilterCaseEFCaseStatusApi() },
    [
      leadButtonStatus,
      treatingButtonStatus,
      treatingDoneButtonStatus,
      settlementButtonStatus,
      radioOpenClose
    ]);

  const gettingAllPatients = async (e) => {
    setLeadButtonStatus(() => true);
    setTreatingButtonStatus(() => true);
    setTreatingDoneButtonStatus(() => true);
    setSettlementButtonStatus(() => true);
    setRadioOpenClose(() => "Open")

    await AutoCompleteService.listPatientsManagement({
      client_id: "",
      attorney_id: "",
      accounting: "True",
    }).then((res) => {
      setTableData(res.response);
    });
  };

  const changeLeadButtonStatus = async (e) => {
    setLeadButtonStatus(() => !leadButtonStatus);
  };

  const changeTreatingButtonStatus = async (e) => {
    setTreatingButtonStatus(() => !treatingButtonStatus);
  };

  const changeTreatingDoneButtonStatus = async (e) => {
    setTreatingDoneButtonStatus(() => !treatingDoneButtonStatus);

  };

  const changeSettlementButtonStatus = async (e) => {
    setSettlementButtonStatus(() => !settlementButtonStatus);
  };

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
                      <input
                        data-bs-toggle="dropdown"
                        type="text"
                        placeholder="Search Patients"
                        className="form-control me-2"
                        name="search_clients"
                        id="search_clients search_clients_dropdown"
                        onChange={(e) => suggestClients(e)}
                        defaultValue={suggestClientsName}
                        autocomplete="off"
                      />
                      <ul
                        class="dropdown-menu p-0"
                        aria-labelledby="search_clients_dropdown"
                      >
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
                        <input
                          data-bs-toggle="dropdown"
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
                        <ul
                          class="dropdown-menu p-0"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <div className="tt-dataset tt-dataset-clients">
                            {suggestAttorneysName &&
                              suggestAttorneysName.map((attorney) => (
                                <li
                                  onClick={() =>
                                    resultForSelectedAttorneyID(attorney.id)
                                  }
                                >
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
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => gettingAllPatients()}
              >
                All Patients
              </p>

              <div className="mb-3 pt-4">
                <label className="me-2">
                  <input
                    name="open_close"
                    value="Open"
                    type="radio"
                    className="me-1"
                    checked={radioOpenClose === "Open"}
                    onChange={(e) => setRadioOpenClose("Open")}
                  />
                  Open
                </label>
                <label>
                  <input
                    name="open_close"
                    value="Close"
                    type="radio"
                    className="me-1"
                    checked={radioOpenClose === "Close"}
                    onChange={(e) => setRadioOpenClose("Close")}
                  />
                  Closed
                </label>
              </div>

              <button
                className="btn m-1 filter-item w-100 p-2"
                style={{
                  textAlign: "left",
                  background: `${leadButtonStatus ? "#0B5ED7" : "#E4E4E4"}`,
                  color: `${leadButtonStatus ? "white" : "blue"}`,
                }}
                onClick={() => changeLeadButtonStatus()}
              >
                New Lead
              </button>
              <button
                className="btn p-2 m-1 filter-item w-100"
                style={{
                  textAlign: "left",
                  background: `${treatingButtonStatus ? "#0B5ED7" : "#E4E4E4"}`,
                  color: `${treatingButtonStatus ? "white" : "blue"}`,
                }}
                onClick={() => changeTreatingButtonStatus()}
              >
                Treating
              </button>

              <button
                className="btn p-2 m-1 filter-item w-100"
                style={{
                  textAlign: "left",
                  background: `${treatingDoneButtonStatus ? "#0B5ED7" : "#E4E4E4"}`,
                  color: `${treatingDoneButtonStatus ? "white" : "blue"}`,
                }}
                onClick={() => changeTreatingDoneButtonStatus()}
              >
                Treating Done
              </button>

              <button
                className="btn p-2 m-1 filter-item w-100"
                style={{
                  textAlign: "left",
                  background: `${settlementButtonStatus ? "#0B5ED7" : "#E4E4E4"}`,
                  color: `${settlementButtonStatus ? "white" : "blue"}`,
                }}
                onClick={() => changeSettlementButtonStatus()}
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
                  {loading ? (
                    <>
                      {tableData.length !== 0 ? (
                        <>
                          {tableData.map((tableData, i) => (
                            <tr style={{ cursor: "pointer" }}>
                              <th>{i + 1}</th>
                              <td>
                                <span
                                  className="text-center"
                                  style={{
                                    background: `${tableData.specialty.color}`,
                                    // background: 'red',
                                    borderRadius: "5px",
                                    display: "block",
                                    color: "white",
                                  }}
                                >
                                  <b className="p-xl-0 p-1">
                                    {tableData.specialty.name[i]}
                                  </b>
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
                      ) : (
                        <>
                          <tr style={{ cursor: "pointer" }}>
                            <td colspan="12" className="text-center">
                              No records to display
                            </td>
                          </tr>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td colspan="12" className="text-center">
                          <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
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
