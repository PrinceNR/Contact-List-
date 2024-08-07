import express from 'express';
import { addContact, getContacts,editContact,deleteContact } from '../controller/contactController.js';

const router = express.Router();


router.get('/contacts', getContacts);
router.post('/add', addContact);
router.delete('/remove/:id', deleteContact);
router.put('/edit/:id', editContact);


export default router;       