// TODO 
const allRoutes = require('express').Router();
const v1Routes = require('./v1');
// if you want to add more versions, import a new folder for v2 routes
allRoutes.use('/v1', v1Routes);
// ... if we want a V2 add like V1 so all url requests should be like this /v2/...

module.exports = allRoutes;