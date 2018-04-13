import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import { Typography, IconButton } from 'material-ui';
import { Clear } from 'material-ui-icons';

const InfoPanel =
  compose()
    (props => {
      return (
        <div id="infoPanelID" style={{ float: 'right', width: '300px'}}>
          <Card>
            <CardHeader
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
              action={
              <IconButton>
                <Clear />
              </IconButton>
            }
            />
            <CardMedia
              image="/static/images/cards/paella.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
            </CardContent>
          </Card>
        </div>
      )
    }
    )

export default InfoPanel;