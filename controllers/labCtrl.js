const express = require('express');
const Lab = require('../models/lab');

const getLabsFull = async (req, res, next) => {
  try {
    const labs = await Lab.getLabsFull();

    res.status(200).send(labs);

  } catch (e) {
    next(e);
  }
}

module.exports = {
  getLabsFull
}