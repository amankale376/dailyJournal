import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Typography
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

function AboutGrid(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
                <Typography variant="h7">
                  <p style={{ padding: 16 }}>{props.content}</p>
                </Typography>
                <Divider />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
export default AboutGrid;
