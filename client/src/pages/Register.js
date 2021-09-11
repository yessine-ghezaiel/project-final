
import React, {  useState } from 'react';
import Compressor from 'compressorjs'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './registre.css'
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link style={{color:'inherit' }} to='/'>
                Yessine Ghezaiel
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(25),
        
        display: 'flex',
        
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        
        
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    input: {
        display: 'none',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RegisterPage() {
    const classes = useStyles();
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState("")
    const [info, setInfo] = useState({
        firstname: "",
        lastname:"",
        email: '',
        password: '',
        image:''
    })



    console.log(info)
    const handleInfoChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(info))
        

    }

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const myImage = e.target.files[0]
            new Compressor(myImage, {
                quality: 0.8,
                success(result) {
                    const reader = new FileReader()
                    reader.readAsDataURL(result)
                    reader.onloadend = () => {
                        setSelectedImage(reader.result)
                        setInfo({...info, image: reader.result })
                    }
                }
            })
        }
    }
    
        if (auth.isAuth === true ) {
            history.push('/')
        }

    
    return (
        <div className='bg'>

        
        <Container style={{marginLeft:'10%', backgroundColor:'white' }} component="main" maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper} >
                <Avatar style= {{ fontSize:'large' }} className={classes.avatar}>
                    <AccountCircle   />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} STY onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                autoComplete="fname"
                                name="firstname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                style={{backgroundColor:"white"}}
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="lastname"
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoFocus
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleInfoChange}
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
                                onChange={handleInfoChange}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                            {selectedImage && <img name="preview" style={{ height: "120px", width: "80px" }} src={selectedImage || "./images/default.jpg"} alt="preview"></img>}
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>

                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link variant="body2"  to='/login'>
                                Already have an account? Sign in
                            </Link>
                            {/* <Link to='/login' variant="body2">
                                Already have an account? Sign in
                            </Link> */}
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
        </div>
    );
}