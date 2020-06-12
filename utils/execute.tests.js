const npm = require("npm");

npm.load(() => npm.run("cy:run"));

npm.load(() => npm.run("save:results"));