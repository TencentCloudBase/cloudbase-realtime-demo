import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Loading from '../Loading'
import { useCloudFile, useDatabaseWatch } from '../../hooks'

export default () => {
  const { snapshot, connecting } = useDatabaseWatch('messages')
  const list = snapshot ? snapshot.docs : []

  if (connecting) {
    return <Loading />
  } else {
    return (
      <div style={{
        height: '100%',
        paddingBottom: '52px',
        boxSizing: 'border-box'
      }}>
        <List>
          {
            list.map((item, index) => {
              return (
                <Item key={index} item={item} />
              )
            })
          }
        </List>
      </div>
    )
  }

}

const Item = ({ item }) => {
  return <ListItem>
    <ListItemAvatar>
      <Avatar>{item.uid.slice(0, 2)}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={item.text || <Img fileid={item.image} />}
      secondary={
        <React.Fragment>
          {moment(item.timestamp).format('MM/DD HH:mm:ss')}
        </React.Fragment>
      }
    />
  </ListItem>
}

// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles({
  bottom: {
    color: '#6798e5',
    animationDuration: '550ms'
  },
});

const Img = ({ fileid }) => {
  const { url } = useCloudFile(fileid)
  const [loaded, setLoaded] = useState(false)
  const classes = useStylesFacebook();
  if (url) {
    const img = new Image()
    img.src = url
    img.onload = () => {
      setLoaded(true)
    }
    img.onprogress = (event) => {
      console.log(event)
    }
  }
  if (url && loaded) {
    return <img src={url} alt="" style={{ maxWidth: '100%', maxHeight: '200px' }} />
  } else {
    return <CircularProgress variant="indeterminate" disableShrink size={24} thickness={4} className={classes.bottom} />
  }
}