import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';

const Contact = ({ name, number, onDelete }) => (
    <li className={styles.item}>
        <p>{name}: {number}</p>
        <button className={styles.button} onClick={onDelete}>Delete</button>
    </li>
);

Contact.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Contact;
