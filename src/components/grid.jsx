import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";

import Divider from "@material-ui/core/Divider";
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
var comments = [
  {
    id: 1,
    name: "honey",
    comment: "very cool",
  },
  { id: 2, name: "aman", comment: "not that cool" },
  { id: 2, name: "kaale", comment: "not :" },
];

function Grids(props) {
  const classes = useStyles();

  return (
    <>
      <div className="bodyGrid">
        <div className={classes.root}>
          <Grid container>
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

                <Divider />

                <Typography variant="h4" color="primary" gutterBottom>
                  <p style={{ color: "black" }} className="grid-heading">
                    {props.title}
                  </p>
                </Typography>
                <Divider />
                <Typography variant="h7">
                  <p style={{ padding: 16 }}>{props.content}</p>
                </Typography>

                <Accordion>
                  <AccordionSummary
                    expandIcon={"v"}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Comments</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid xs={12}>
                      {comments.map((i) => {
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
                                <Typography variant="h6">{i?.name}</Typography>
                              </Grid>
                            </Grid>
                            <Grid item style={{ padding: 4, marginLeft: 50 }}>
                              <Typography>{i?.comment}</Typography>
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Divider />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
export default Grids;
