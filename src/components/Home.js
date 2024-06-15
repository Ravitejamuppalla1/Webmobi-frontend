import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncUserProfile } from "../actions/usersActions"
import { Typography, Box, CircularProgress,Button } from "@mui/material"
import Swal from "sweetalert2"

const Home = (props) => {
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.users)
  
  useEffect(() => {
    dispatch(asyncUserProfile())
  }, [dispatch])

  if (userProfile.loading) {
    return <CircularProgress />
  }

  if (userProfile.error) {
    return <Typography variant="h6">Error fetching data</Typography>
  }

  const { username, email } = userProfile.data

  const handlelogout = () => {
    localStorage.removeItem("token")
    Swal.fire("Logged out successfully")
    props.history.push("/login")
  }


  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" gutterBottom>
        Welcome, {username}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {email}
      </Typography>
      <Typography variant="body2">
        You are logged in and your profile information is displayed above.
      </Typography>
      <Box mt={2}>

      <Button variant="contained" color="primary" onClick={handlelogout}>
        Logout
      </Button>
      </Box>
    </Box>
  )
}

export default Home
