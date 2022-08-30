import axios from "axios";
import { GLOBALS } from "../constants/config";

export async function getVolunteersRequest() {
  try {
    const response = await axios.get(
      `${GLOBALS.BASE_URL}/volunteers/fetchAllRequests`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function getMyVolunteerRequests(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/volunteers/fetchMyVolunteerRequests`,
      record
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function applyForVolunteerRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/volunteers/applyForVolunteerRequest`,
      record
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}