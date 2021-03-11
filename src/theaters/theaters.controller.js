const TheatersService = require("./theaters.service");
const treeize = require("../utils/treeize");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
    let theatersList = await TheatersService.getAllTheaters(); 
    theatersList = treeize(theatersList);
    if(theatersList instanceof Error) return next({ message: theatersList.message })
    res.json({ data: theatersList });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
}