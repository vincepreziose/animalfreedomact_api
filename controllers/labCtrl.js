const express = require('express');
const router = express.Router();

const getLabs = async (req, res, next) => {
  try {
    // const results = await Lab.getLabs();
    res.status(200).json({message: 'Yo'});
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  getLabs
}