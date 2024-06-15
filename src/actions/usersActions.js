import axios from "../config/axios";
import Swal from "sweetalert2";

export const CREATE_USER = "CREATE_USER";
export const GET_USERPROFILE = "GET_USERPROFILE";

//Register

export const createUSer = (data) => {
  return {
    type: CREATE_USER,
    payload: data,
  };
};

export const asyncUserRegister = (formData, reset, props) => {
  return (dispatch) => {
    axios
      .post("/register", formData)
      .then((response) => {
        const { data } = response
        if (data.id) {
          dispatch(createUSer(data))
          reset()
          props.history.push("/login")
          Swal.fire("Success", "User registered successfully!", "success")
        } else {
          Swal.fire("Error", "Failed to register user", "error")
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          if (error.response.data.error.includes("Validation error")) {
            Swal.fire("Error", "Invalid email address. Please enter a valid email.", "error")
          } else {
            Swal.fire("Error", error.response.data.error, "error")
          }
        } else {
          Swal.fire("Error", "Failed to register user", "error")
        }
      })
  
  }
}

//Login

export const asyncUserLogin = (formData, reset, props) => {
  return (dispatch) => {
    axios
      .post("/login", formData)
      .then((result) => {
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          if (localStorage.getItem("token") !== "undefined") {
            reset();
            Swal.fire("Successfully logged in");
            props.history.push("/home");
          } else {
            Swal.fire("Invalid Username or Password");
          }
        } else {
          Swal.fire("Invalid Username or Password");
        }
      })

      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.error || "Invalid Username or Password",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
};

//Profile

export const getUserProfile = (data) => {
  return {
    type: GET_USERPROFILE,
    payload: data,
  };
};

export const asyncUserProfile = () => {
  return (dispatch) => {
    axios
      .get("/profile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        dispatch(getUserProfile(result.data));
      });
  };
};
