import axios from "axios";
import React, {useState, useEffect} from "react";





export const API_URL ='http://localhost:8000'
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  }
});