import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
export default () => {
    return (
        <CircularProgress style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: "-20px",
            marginTop: "-20px",
        }} />
    )
}