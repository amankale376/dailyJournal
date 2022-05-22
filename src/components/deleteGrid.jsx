import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Axios from "axios";
import { Avatar } from "@material-ui/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightButton: {
    marginTop: "2rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

function DeleteGrid(props) {
  console.log({ props });
  let comments = false;
  if (props?.comments?.length > 0) {
    comments = true;
  }
  const classes = useStyles();

  const deleteBlog = (id) => {
    Axios.post("https://localhost:3001/deletePost", {
      postId: id,
    }).then((response) => {
      if (response.data === "ok") {
        window.location.reload();
      }
    });
  };

  return (
    <>
      <div className="bodyGrid">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container justify="space-between">
                  <Grid>
                    <Typography variant="h9">
                      {new Date(props.date).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid>
                    {" "}
                    <Typography variant="h8">
                      <div>
                        <p>{`Posted by @` + props?.user?.username}</p>
                      </div>
                    </Typography>{" "}
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={10} className={classes.grids}>
                    <Typography variant="h9">{props.createdAt}</Typography>

                    <Typography
                      variant="h4"
                      color="primary"
                      multiLine="true"
                      gutterBottom
                    >
                      <p style={{ color: "black" }} className="grid-heading">
                        {props.title}
                      </p>
                    </Typography>
                    <Divider />
                    <Typography variant="h7">
                      <p className="grid-content">{props.content}</p>
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.rightButton}>
                    <IconButton aria-label="delete" className={classes.margin}>
                      {props.foundPost && (
                        <DeleteIcon
                          fontSize="large"
                          onClick={() => deleteBlog(props._id)}
                        />
                      )}
                    </IconButton>
                  </Grid>
                </Grid>
                {comments ? (
                  <>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={"v"}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Comments</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid>
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
                                      H
                                    </Avatar>
                                  </Grid>
                                  <Grid p={2} item>
                                    <Typography variant="h6">
                                      {i?.commentorUsername}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  style={{ padding: 4, marginLeft: 50 }}
                                >
                                  <Typography>{i?.comment}</Typography>
                                </Grid>
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
export default DeleteGrid;
