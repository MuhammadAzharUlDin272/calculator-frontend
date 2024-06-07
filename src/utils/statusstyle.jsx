import React from 'react';

const statusStyles = {
    active: {
        backgroundColor: '#EDEDFE', // Green
        color: '#605DEC',
        borderRadius:25,
        padding:10,
        textAlign:'center'
    },
    pending: {
        backgroundColor: '#FFEB3B', // Yellow
        color: 'black',
    },
    cancelled: {
        backgroundColor: '#F44336', // Red
        color: 'white',
    },
    confirmed: {
        backgroundColor: '#2196F3', // Blue
        color: 'white',
    }
};

const StatusBadge = ({ status }) => {
    const style = statusStyles[status.toLowerCase()] || {
        backgroundColor: 'gray', // Default case
        color: 'white'
    };

    return (
        <span style={{
            padding: '10px',
            borderRadius: '10px',
            width:"100%",
            ...style
        }}>
            {status}
        </span>
    );
};

export default StatusBadge;
