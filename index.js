const alfy = require('alfy');
const glob = require("glob");

const bunchFolder = process.env.bunchesLocation;

// Check the config
if (!bunchFolder) {
    alfy.error("Missing configuration. Run bn-config with the full path to your bunches folder.");
}
else {
    //Load the bunches and let the user pick
    glob(bunchFolder + "/**/*.bunch", function (er, files) {
        var bunches = []

        files.forEach(function (value, index) {
            if (value.length > bunchFolder.length + 6) {
                var bunchName = value.substr(bunchFolder.length + 1, value.length - bunchFolder.length - 7)
                bunches.push(bunchName);
            }
        });

        if (alfy.input) {
            var resultList = alfy
                .inputMatches(bunches)
                .map(x => ({
                    title: x.toLowerCase(),
                    subtitle: 'Action to run this bunch.',
                    arg: 'x-bunch://open?bunch=' + x.toLowerCase()
                }));
            alfy.output(resultList);
        } else {
            var resultList = bunches.map(x => ({
                title: x.toLowerCase(),
                subtitle: 'Action to run this bunch.',
                arg: 'x-bunch://open?bunch=' + x.toLowerCase()
            }));
            alfy.output(resultList);
        }
    });
}
