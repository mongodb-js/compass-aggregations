#! /usr/bin/env node --experimental-modules

var ObjectId = require('bson').ObjectId;
var doc = {
  _id: new ObjectId('59a06674c8df9f3cd2ee7d52'),
  name: 'Mercury',
  type: 'Terrestrial planet',
  orderFromSun: 1,
  radius: {
    value: 4879,
    units: 'km'
  },
  mass: {
    value: 3.3e23,
    units: 'kg'
  },
  sma: {
    value: 57910000,
    units: 'km'
  },
  orbitalPeriod: {
    value: 0.24,
    units: 'years'
  },
  eccentricity: 0.2056,
  meanOrbitalVelocity: {
    value: 47.36,
    units: 'km/sec'
  },
  rotationPeriod: {
    value: 58.65,
    units: 'days'
  },
  inclinationOfAxis: {
    value: 0,
    units: 'degrees'
  },
  meanTemperature: 125,
  gravity: {
    value: 3.24,
    units: 'm/s^2'
  },
  escapeVelocity: {
    value: 4.25,
    units: 'km/sec'
  },
  meanDensity: 5.43,
  atmosphericComposition: '',
  numberOfMoons: 0,
  hasRings: false,
  hasMagneticField: true
};

const parse = require('./index.js');
async function main() {
  const result = await parse([doc]);
  console.log(result);
}

main();

