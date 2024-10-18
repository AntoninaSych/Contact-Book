import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps'; // Імпорт з contactsOps.js
import { selectContacts } from '../../redux/contactsSlice';
import { useFormik } from 'formik';
import styles from './ContactsForm.module.css';

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    } else if (values.name.length < 2) {
        errors.name = 'Must be at least 2 characters';
    }

    if (!values.number) {
        errors.number = 'Phone number is required';
    } else if (!/^[0-9]+$/.test(values.number)) {
        errors.number = 'Phone number must contain only digits';
    } else if (values.number.length < 7) {
        errors.number = 'Phone number must be at least 7 digits';
    }

    return errors;
};

const ContactsForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const formik = useFormik({
        initialValues: {
            name: '',
            number: '',
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            const newContact = { ...values };

            if (contacts.some(contact => contact.name === values.name)) {
                alert(`${values.name} is already in contacts.`);
                return;
            }

            dispatch(addContact(newContact));
            resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
                <div className={styles.error}>{formik.errors.name}</div>
            ) : null}

            <input
                id="number"
                name="number"
                type="tel"
                placeholder="Phone Number"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
            />
            {formik.touched.number && formik.errors.number ? (
                <div className={styles.error}>{formik.errors.number}</div>
            ) : null}

            <button type="submit" className={styles.button}>
                Add Contact
            </button>
        </form>
    );
};

export default ContactsForm;
