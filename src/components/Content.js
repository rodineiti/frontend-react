import React from 'react';

function Content(props) {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default Content;