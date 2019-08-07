const express = require('express');
const dbService = require('../services/dbService');
const router = express.Router();

router.get('/players', async (req, res) => {
  try {
    res.send({
      status: 'OK',
      data: await dbService.getActivePlayers()
    });
  } catch (error) {
    res.status(error.status || 500).send(error);
  }
});

router.get('/players/add', async (req, res) => {
  try {
    const addedPlayer = await dbService.addPlayer(req.query.name, req.query.userID);
    res.send({
      status: 'CREATED',
      userID: addedPlayer.rowID
    });
  } catch (error) {
    res.status(error.status || 500).send(error);
  }
});

router.delete('/players/delete', async (req, res) => {
  try {
    await dbService.deletePlayer(req.query.userID);
    res.send({
      status: 'DELETED'
    });
  } catch (error){
    res.status(error.status || 500).send(error);
  }
});

module.exports = router;
