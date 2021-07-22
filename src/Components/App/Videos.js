import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Pagination, Rating} from '@material-ui/lab';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    paper: {
      position: 'absolute',
      width: 1000,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
    }
  }));

const cleanDesc = (desc) => {
    if (desc.length > 100) {
      return desc.substring(0,100) + "..."
    } else {
      return desc
    }
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Content = () => {
    const classes = useStyles();
    const history = useHistory();
    const [modalStyle] = React.useState(getModalStyle);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const [myRatings, setMyRatings] = useState({});

    const handlePageChange = (event, value) => {
      setPage(value)
      console.log(page)
    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("/api/videos?limit=20&page=" + (page-1),
        {
            credentials: 'include',
            mode: "cors"
        })
            .then(res => {
              if (res.status === 401) {
                localStorage.setItem("authed", false);
                history.push('/login')
              }
              return res.json()
            })
            .then(
                (result) => {
                    setItems(result);
                    setIsLoaded(true);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
      )
    }, [page])

    const openVideo = (video) => {
      getRating(video);
      setSelected(video);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setSelected(null);
    };

    const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setError("");
      setSuccess("");
    };

    const handleRating = (event, newValue) => {
      fetch("/api/videos/" + selected.id + "/rate?rating=" + newValue,
        {
          method: 'POST',
          credentials: 'include',
          mode: "cors"
        })
            .then(
                (result) => {
                    if (result.status === 200) {
                      setSuccess("Rated video")
                      setTimeout(handleAlertClose, 1500)
                      myRatings[selected.id] = newValue
                      setMyRatings(myRatings)
                    } else {
                      setError("Something went wrong. Please try again")
                      setTimeout(handleAlertClose, 1500)
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setError(error);
                }
      )
    }

    const getRating = (video) => {
      fetch("/api/videos/" + video.id + "/rate",
        {
            credentials: 'include',
            mode: "cors"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    myRatings[result.id] = result.rating;
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    setTimeout(handleAlertClose, 2000)
                }
      )
    }

    const videoModal = selected !== null ? (
      <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{selected.title}</h2>
      <Rating name="size-large" defaultValue={myRatings[selected.id]} size="large" onChange={handleRating} />
      <iframe id="content"
        src={selected.contentUrl}
        height="450"
        width="800"
        allowFullScreen
        frameBorder = "0"
      />
      <p id="simple-modal-description">
        {selected.description}
      </p>
    </div>
    ) : (<div></div>)

    if (error) {
        return (<div>Error: {error.message}</div>);
    } else if (!isLoaded) {
        return (<div>Loading...</div>);
    } else {
        return (
            <div>
               <Snackbar open={success !== ""} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleAlertClose} severity="success">
                  {success}
                </Alert>
              </Snackbar>
              <Snackbar open={error !== ""} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleAlertClose} severity="error">
                  {error}
                </Alert>
              </Snackbar>
              <Pagination classes={{ul: classes.ul}} count={25} shape="rounded" onChange={handlePageChange} />
               <h1>Content</h1>
               <Grid container spacing={1}>
                {items.map(item => (
                  <Grid item xs={3}>
                    <Card className={classes.root}  onClick={() => {openVideo(item)}}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={item.previewUrl}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {cleanDesc(item.description)}
                        </Typography>
                        <Typography>
                          {"Rating: " + item.rating}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                ))
                }
                </Grid>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {videoModal}
              </Modal>
            </div>
         );
    }
}
 
export default Content;