import * as React from "react";
import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
//memberInfo : img, title, author, github, email
export default function MemberCard({ memberInfo }) {
  return (
    <>
      <Grid item xs={2} sx={{ p: 1 }}>
        <Card style={{ width: "200px", height: "370px" }}>
          <CardMedia
            component="img"
            height="210"
            image={memberInfo.img}
            alt="card-media"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {memberInfo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {memberInfo.author}
            </Typography>
          </CardContent>
          <CardActions>
            {
              <IconButton
                sx={{ color: "#000000" }}
                target="_blank"
                href={memberInfo.github}
              >
                <GitHubIcon />
              </IconButton>
            }
            {
              <IconButton
                sx={{ color: "#3366CC" }}
                target="_blank"
                href={memberInfo.email}
              >
                <EmailIcon />
              </IconButton>
            }
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
