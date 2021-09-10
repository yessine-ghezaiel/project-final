import React, { useEffect, useState } from "react";
import { login } from "../redux/actions/authActions";
import Compressor from "compressorjs";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "./registre.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(35),

    display: "flex",

    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "60%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  input: {
    display: "none",
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
}));

const LoginPage = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(info));
  };
  const history = useHistory()
    useEffect(() => {
        if (auth.isAuth)
            history.push('/')
    }, [auth.isAuth])

  return (
    <div className="log">
      <Container
        style={{ backgroundColor: "transparent", color: "white" }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar style={{ fontSize: "large" }} className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "white" }}>
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className="inputs"
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  // onChange={handleInfoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className="inputs"
                  onChange={(e) =>
                    setInfo({ ...info, password: e.target.value })
                  }
                  // onChange={handleInfoChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
            >
              Sign In
            </Button>
            <Button
              type="reset"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset
            </Button>
          </form>
        </div>
      </Container>

      {/* <form className="flex-column-center" onSubmit={handleSubmit}>
            <input type="email" placeholder="account@domain.ext" onChange={(e) => setInfo({ ...info, email: e.target.value })}></input>
            <input type="password" placeholder="*********" onChange={(e) => setInfo({ ...info, password: e.target.value })}></input>
            <button type="submit" style={{ alignSelf: 'flex-end', color: "black" }}>Submit</button>
            <button type="reset" style={{ alignSelf: 'flex-end', color: "black" }}>Reset</button>
        </form> */}
    </div>
  );
};

export default LoginPage;
