import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiDB from "../../apiDB";
import {isEmptyObject} from "../../helpers/isEmptyObject";
import {addDaysToCurrentDate} from "../../helpers/formatDate";


const initialState = {
  isOpenModal: false,

  trips: null,
  userNameInDB: null,

  isDataLoading: false,

  currentTrip: null,

  isNewTripCreating: false,
  isValidated: false,

  idDeleting: false
}

export const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setIsOpenModal: (state, action) => {
      state.isOpenModal = action.payload
    },

    setTrips: (state, action) => {
      state.trips = action.payload
      state.isDataLoading = false
    },
    setUserNameInDB: (state, action) => {
      state.userNameInDB = action.payload
      state.isDataLoading = false
    },
    setIsDataLoading: (state, action) => {
      state.isDataLoading = action.payload
    },
    setCurrentTrip: (state, action) => {
      state.currentTrip = action.payload
    },

    setIsNewTripCreating: (state, action) => {
      state.isNewTripCreating = action.payload
    },
    setIsValidated: (state, action) => {
      state.isValidated = action.payload
    },

    setIsDeleting: (state, action) => {
      state.idDeleting = action.payload
    },
  },
})


export const {
  setIsOpenModal,
  setTrips,
  setUserNameInDB,
  setIsDataLoading,
  setCurrentTrip,
  setIsNewTripCreating,
  setIsValidated,
  setIsDeleting
} = tripsSlice.actions

export default tripsSlice.reducer


export const getTrips = createAsyncThunk(
  'trips/getTrips',
  async (userId, {dispatch, getState }) => {

    dispatch(setIsDataLoading(true))


    apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(userId)}`)
      .then(function (response) {
        if (response.data && !isEmptyObject(response.data)) {
          const trips = response.data[Object.keys(response.data)[0]]?.trips
          if (trips) {
            dispatch(setTrips(trips))
            dispatch(setCurrentTrip(trips[0]))
          }

          dispatch(setUserNameInDB(Object.keys(response.data)[0]))
        } else {

          const initialData = {
            uid: userId,
            trips: [
              {
                id: Date.now().toString(),
                cityId: '1',
                startDate: addDaysToCurrentDate(1),
                endDate: addDaysToCurrentDate(6)
              },
            ]
          }

          apiDB.post('users.json', JSON.stringify(initialData)
          ).then(function (response) {
            dispatch(setUserNameInDB(response.data.name))
            apiDB.get(`users/${response.data.name}.json`)
              .then(function (response) {
                dispatch(setTrips(response.data.trips))
                dispatch(setCurrentTrip(response.data.trips[0]))
              })
              .catch(function (error) {
                console.log('Не вдалося отримати дані користувача після його створення',error);
              });
          })
            .catch(function (error) {
              console.log('Помилка зСтворення нового користувача у БД',error);
            });
        }
      })
      .catch(function (error) {
        console.log('Не вдалося отримати інформацію про користувача',error);
      });
  }
)



export const createNewTrip = createAsyncThunk(
  'trips/createNewTripInDB',
  (newTripData, {dispatch, getState }) => {
    const currentUserNameInDB = getState().trips.userNameInDB
    const trips = getState().trips.trips

    const existingTrips = trips && trips.length ? trips : []

    dispatch(setIsNewTripCreating(true))


    apiDB.put(`users/${currentUserNameInDB}/trips.json`, JSON.stringify([...existingTrips, newTripData]))
      .then(function (response) {
        console.log('trip створено', response.data);

        dispatch(setTrips(response.data))
        dispatch(setCurrentTrip(response.data[0]))

        dispatch(setIsNewTripCreating(false))
        dispatch(setIsOpenModal(false))
        dispatch(setIsValidated(false))

      })
      .catch(function (error) {
        console.log('Не створився новий тріп',error);
      });
  }
)


// При видаленні  передаємо пусту строку


export const deleteTrip = createAsyncThunk(
  'trips/deleteTripInDB',
  (tripId, {dispatch, getState }) => {
    dispatch(setIsDeleting(true))

    const currentUserNameInDB = getState().trips.userNameInDB
    const trips = getState().trips.trips

    const updatedTrips = trips.filter(el => el.id !== tripId)

    const existingTrips = updatedTrips && updatedTrips.length ? updatedTrips : ''

    apiDB.put(`users/${currentUserNameInDB}/trips.json`, JSON.stringify(existingTrips))
      .then(function (response) {
        console.log('Видалено успішно', response.data);

        dispatch(setTrips(response.data))
        dispatch(setCurrentTrip(response.data[0]))
        dispatch(setIsDeleting(false))

      })
      .catch(function (error) {
        console.log('Помилка видалення',error);
        dispatch(setIsDeleting(false))
      });
  }
)
