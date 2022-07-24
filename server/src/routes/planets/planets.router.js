const express = require("express");
const planetsController = require("./planets.controller");

const { getAllPlanets } = planetsController;

const planetRouter = express.Router();

planetRouter.get("/planets", getAllPlanets);

module.exports = planetRouter;
