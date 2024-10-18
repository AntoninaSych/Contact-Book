import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

const ContactList = () => {
    const contacts = useSelector(selectFilteredContacts);
    const dispatch = useDispatch();

    if (contacts.length === 0) {
        return <p>No contacts available.</p>;
    }

    return (
        <ul className={styles.list}>
            {contacts.map(({ id, name, number }) => (
                <Contact
                    key={id}
                    name={name}
                    number={number}
                    onDelete={() => dispatch(deleteContact(id))}
                />
            ))}
        </ul>
    );
};

export default ContactList;
