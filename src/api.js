import axios from "axios";
import React, { useState, useEffect } from "react";

// export const API_URL = "http://localhost:8000";
export const API_URL = "https://tfbp-backend.herokuapp.com/accounts";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-type": "application/json",
      },
    });

    this.client.interceptors.request.use((config) => {
      const userInfo = localStorage.getItem("userInfo");

      if (userInfo && userInfo !== "") {
        const userInfoJson = JSON.parse(userInfo);

        config.headers[
          "Authorization"
        ] = `Bearer ${userInfoJson.providerprofile.user.token}`;
      }
      return config;
    });
  }
}

class AutoCompleteService extends HttpService {
  listPatientsManagement = async ({ client_id, attorney_id, accounting }) => {
    const { data } = await this.client.get(
      `ListPatientsCaseManagement/?client_id=${
        client_id || ""
      }&attorney_id=${attorney_id}&accounting=${accounting}`
    );
    return data;
  };
  clientAutoCompleteSearch = async ({ client_name }) => {
    const { data } = await this.client.get(
      `ClientAutoCompleteSearch/?client_name=${client_name}`
    );
    return data;
  };
  attorneyAutoCompleteSearch = async ({ attorney_name }) => {
    const { data } = await this.client.get(
      `AttorneyAutoCompleteSearch/?attorney_name=${attorney_name}`
    );
    return data;
  };
  filterTFCaseStatus = async ({ tf_case_status, open_close, accounting }) => {
    const { data } = await this.client.get(
      `FilterTFCaseStatus/?tf_case_status=${tf_case_status}&open_close=${open_close}&accounting=${accounting}`
    );
    return data;
  };
}

export default new AutoCompleteService();
