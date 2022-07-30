const express = require("express");
const planetsController = require("./planets.controller");

const { httpGetAllPlanets } = planetsController;

const planetRouter = express.Router();

planetRouter.get("/planets", httpGetAllPlanets);

module.exports = planetRouter;
