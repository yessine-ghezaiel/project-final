import  React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {addPost} from '../redux/actions/postActions'
import Compressor from 'compressorjs'
import { Button, makeStyles, TextareaAutosize} from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
    },
}));



const AddPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState("")
    const [newPost, setNewPost] = useState({
        title:'',
        description:'',
        image:''
    })
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
                        setNewPost({ ...newPost,image: reader.result })
                    }

                }
            })
        }
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(addPost(newPost))
        setNewPost({
            title:'',
            description:''
        })
    }
    return (
        <div className={classes.root}>
            <form  style={{ marginLeft:'-10%',width: "110%" }} onSubmit={handleSubmit}>
                {/* a essayer sans selectedImage loula */}
                {selectedImage && <img name="preview" style={{ height: "100px" }} src={selectedImage || ""} alt="preview"></img>}
                <br />
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
                    placeholder="Post title" value={newPost.title}
                    style={{ height: "40px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />

                <TextareaAutosize aria-label="Post description"
                    placeholder="Post Description" value={newPost.description}
                    style={{ height: "100px", width: "100%", boxShadow: "5px 5px grey" }}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Post
                </Button>            
            </form>
        </div>
    )
}

export default AddPost
