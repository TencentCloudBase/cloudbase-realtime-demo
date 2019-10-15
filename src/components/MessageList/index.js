import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment'

export default ({ list }) => {
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
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>{item.uid.slice(0, 2)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.text}
                  secondary={
                    <React.Fragment>
                      {moment(item.timestamp).format('MM/DD HH:mm:ss')}
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
          })
        }
      </List>
    </div>
  )
}