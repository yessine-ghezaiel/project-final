import  React,{useState} from 'react'
import Compressor from 'compressorjs'
import Icon from '@material-ui/core/Icon';
import { addCarDealer } from '../redux/actions/carDealerActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import './add.css'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        marginBottom:theme.spacing(5),
        
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



const AddCardealer = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState("")
    const [selectedImage_name, setSelectedImage_name] = useState("")
    const [newCarDealer, setNewCarDealer] = useState({

        title:'',
        description:'',
        email:'',
        phoneNumber:'',
        adresse:'',
        src_maps:'',
        region:'',
        image:'',
    })
    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const myImage = e.target.files[0]
            const name_i=e.target.files[0].name
            console.log(name_i)
            setSelectedImage_name(e.target.files[0].name)
            new Compressor(myImage, {
                quality: 0.8,
                success(result) {
                    const reader = new FileReader()

                    reader.readAsDataURL(result)
                    console.log(reader.result)
                    reader.onloadend = () => {
                        setSelectedImage(reader.result)
                        setNewCarDealer({ ...newCarDealer, image: reader.result })
                    }
                }
            })
        }
    }
    
    console.log(newCarDealer);
    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(addCarDealer(newCarDealer));
        
        setNewCarDealer({

            title:'',
            description:'',
            email:'',
            phoneNumber:'',
            adresse:'',
            src_maps:'',
            region:'',
            image:'',
        })
        setSelectedImage_name('')
    }
    return (
        <div className='bg' style={{overflow:'auto'}}>




            <Container style={{ backgroundColor:'white' }} component="main" maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper} >
                    <Avatar style= {{ fontSize:'large' }} className={classes.avatar}>
                        <DriveEtaIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add New Cardealer
                    </Typography>
                    <form className={classes.form} STY onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="title"
                                    name="title"
                                    variant="outlined"
                                    value={newCarDealer.title}
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    style={{backgroundColor:"white"}}
                                    onChange={(e) => setNewCarDealer({ ...newCarDealer, title: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="description"
                                    name="description"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    autoFocus
                                    value={newCarDealer.description}
                                    onChange={(e) => setNewCarDealer({ ...newCarDealer, description: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type='email'
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={newCarDealer.email}
                                    onChange={(e) => setNewCarDealer({ ...newCarDealer, email: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="src_maps"
                                    label="Src Google Maps"
                                    value={newCarDealer.src_maps}
                                    id="src_maps"
                                
                                    onChange={(e) => setNewCarDealer({ ...newCarDealer, src_maps: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                

                                <TextField
                                    
                                    variant="outlined"
                                    
                                    fullWidth
                                    name="phoneNumber"
                                    label="Phone Number"
                                    value={newCarDealer.phoneNumber}
                                    id="phoneNumber"
                                    onChange={(e) => setNewCarDealer({ ...newCarDealer, phoneNumber: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="adresse"
                                    label="address"
                                    
                                    id="adresse"
                                    value={newCarDealer.adresse}
                                    onChange={(e) => setNewCarDealer({ ...newCarDealer, adresse: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="region"
                                    label="Region"
                                    
                                    id="region"
                                    value={newCarDealer.region}
                                    onChange={(e) => setNewCarDealer({ ...newCarDealer, region: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                                {/* {selectedImage && <img name="preview" style={{ height: "120px", width: "80px" }} src={selectedImage || "./images/default.jpg"} alt="preview"></img>} */}
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    type="file"
                                    
                                    onChange={handleImageChange}
                                    
                                />
                                <label htmlFor="contained-button-file">
                                <p>{selectedImage_name}</p>
                                    <Button variant="contained" color="primary" component="span"  >
                                        Upload
                                    </Button>
                                </label>

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add Cardealer
                        </Button>
                       
                    </form>
                </div>
            </Container>





















            {/* <form className="flex-column-center" style={{ width: "50vw" }} onSubmit={handleSubmit}>
                {/* a essayer sans selectedImage loula */}
                {/* {selectedImage && <img name="preview" style={{ height: "200px" }} src={selectedImage || "./images/default.jpg"} alt="preview"></img>}
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>

                <TextareaAutosize aria-label="Post title"
                    placeholder="Cardealer title"
                    style={{ height: "40px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewCarDealer({ ...newCarDealer, title: e.target.value })}
                />

                <TextareaAutosize aria-label="Post description"
                    placeholder="Cardealer Description"
                    style={{ height: "100px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewCarDealer({ ...newCarDealer, description: e.target.value })}
                />

                <TextareaAutosize aria-label='email'
                    placeholder="email"
                    style={{ height: "40px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewCarDealer({ ...newCarDealer, email: e.target.value })}
                />

                <TextareaAutosize aria-label="Phone Number"
                    placeholder="Phone Number"
                    style={{ height: "40px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewCarDealer({ ...newCarDealer, phoneNumber: e.target.value })}
                />

                <TextareaAutosize aria-label="Post title"
                    placeholder="Src Google Maps"
                    style={{ height: "40px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewCarDealer({ ...newCarDealer, src_maps: e.target.value })}
                />

                <TextareaAutosize aria-label="Post title"
                    placeholder="Cardealer Adress"
                    style={{ height: "40px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewCarDealer({ ...newCarDealer, adresse: e.target.value })}
                />
                
                <TextareaAutosize aria-label="Post title"
                    placeholder="Region"
                    style={{ height: "40px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewCarDealer({ ...newCarDealer, region: e.target.value })}
                />
                <Button
                    type='submit'
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // endIcon={<Icon>send</Icon>}
                >
                    Add Cardealer
                </Button>            
            </form> */} 
        </div>
    )
}

export default AddCardealer
