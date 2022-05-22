import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  TextField,
} from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import Axios from "axios";
import Divider from "@material-ui/core/Divider";
import jsonwebtoken from "jsonwebtoken";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

function Grids(props) {
  const token = localStorage.getItem("token");
  let loggedUser;
  try {
    loggedUser = jsonwebtoken.verify(token, process.env.REACT_APP_JWT_SECRET);
  } catch (e) {
    loggedUser = null;
  }
  let comments = false;
  if (props?.comments?.length > 0) {
    comments = true;
  }
  const classes = useStyles();
  const [comment, setComment] = React.useState("");
  function submitPost() {
    Axios.post(
      "http://localhost:3001/createComment",
      {
        post: props.id,
        comment,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response?.data?.success === true) {
          window.location.reload();
        }
      })
      .catch((e) => {
        if (e?.response?.data?.message === "Unauthorized") {
          alert("Please check your login credentials");
        } else {
          alert(e?.response?.data?.message);
        }
      });
  }

  return (
    <>

      <div className="bodyGrid">
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container justify="space-between">
                  {props.date?
                  <Grid>
                    <Typography variant="h9">
                      {new Date(props.date).toLocaleString()}
                    </Typography>
                  </Grid>
                  :<></>}
                  {props?.user?.username?
                  <Grid>
                    {" "}
                    <Typography variant="h8">
                      <div>
                        <p>{`Posted by @` + props?.user?.username}</p>
                      </div>
                    </Typography>{" "}
                  </Grid>
                  :<></>}
                </Grid>
                <Divider />
                <Typography variant="h4" color="primary" gutterBottom>
                  <p style={{ color: "black" }} className="grid-heading">
                    {props.title}
                  </p>
                </Typography>
                <Typography variant="h7">
                  <p style={{ padding: 16 }}>{props.content}</p>
                </Typography>
                <Divider />
                {loggedUser && props?.user?.username ? (
                  <>
                    <Grid container type="row">
                      <Grid xs={10}>
                        <TextField
                          id="comment"
                          label="Add a comment"
                          type="text"
                          autoComplete="false"
                          helperText=""
                          fullWidth="true"
                          gutterbelow
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                          value={comment}
                        />
                      </Grid>
                      <Grid>
                        <Button onClick={submitPost}>Submit</Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                {comments ? (
                  <>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={"+"}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comments</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid xs={12}>
                          {props?.comments?.map((i) => {
                            return (
                              <>
                                <Grid
                                  item
                                  container
                                  type="row"
                                  spacing={2}
                                  alignItems="center"
                                  style={{ padding: 4, marginLeft: 8 }}
                                >
                                  <Grid p={2}>
                                    <Avatar
                                      style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 2,
                                      }}
                                    >
                                      {i?.commentorUsername
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                    </Avatar>
                                  </Grid>
                                  <Grid p={2} item>
                                    <Typography variant="h6">
                                      @{i?.commentorUsername}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  style={{ padding: 4, marginLeft: 50 }}
                                >
                                  <Typography>{i?.comment}</Typography>
                                </Grid>
                                <Divider />
                              </>
                            );
                          })}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </>
                ) : (
                  <></>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
export default Grids;
