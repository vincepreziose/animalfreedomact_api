const express = require('express');
const Lab = require('../models/lab');

const getLabs = async (req, res, next) => {
  try {
    const labs = await Lab.query();

    res.status(200).json({labs: labs});
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  getLabs
}