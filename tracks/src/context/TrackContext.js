import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import moment from "moment";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/tracks");
    dispatch({ type: "fetch_tracks", payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

const createTrack = (dispatch) => async (locations) => {
  try {
    await trackerApi.post("/tracks", {
      name: moment().format("MMMM Do YYYY, h:mm:ss a"),
      locations,
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteTrack = (dispatch) => async (id) => {
  try {
    await trackerApi.delete(`/tracks/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack, deleteTrack },
  []
);
