const express = require('express');
const router = express.Router();
const userDao = require('../dao/user-dao');
const createAbl = require('../abl/user/createAbl');
const listAbl = require('../abl/user/listAbl');
const deleteAbl = require('../abl/user/deleteAbl');
const getAbl = require('../abl/user/getAbl');
const updateAbl = require('../abl/user/updateAbl');
const loginAbl = require('../abl/user/loginAbl');

router.post('/create', async (req, res) => {
    try {
        console.log('Received data for create:', req.body);
        const user = await userDao.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const users = await userDao.list();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/delete', async (req, res) => {
    try {
        console.log('Received data for delete:', req.body);
        const success = await userDao.remove(req.body.id);
        if (success) {
            res.status(200).send('User deleted successfully');
        } else {
            res.status(400).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get', async (req, res) => {
    try {
        const user = await userDao.get(req.query.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        console.log('Received data for update:', req.body);
        const user = await userDao.update(req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log('Received data for login:', req.body);
        const user = await userDao.findByEmail(req.body.email);
        if (user && user.password === req.body.password) {
            res.status(200).json(user);
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
