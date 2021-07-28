const alfy = require('alfy');
const glob = require("glob");

const bunchFolder = process.env.bunchesLocation;
const bunchToggle = (process.env.bunchToggle === 'true') ? true : false;

const bunchCommand = bunchToggle === true ? 'toggle' : 'open';

const bunchSettings = [
    {
        title: "Bunch Settings ...",
        subtitle: "Show Bunch Preference Pane",
        arg: `x-bunch://prefs`
    },
    {
        title: "Refresh Your Bunches",
        subtitle: "Use this if you changed any of your bunch files",
        arg: `x-bunch://setPref?configDir=${bunchFolder}`
    }
];

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
                    arg: `x-bunch://${bunchCommand}?bunch=` + x.toLowerCase()
                }));
            alfy.output(resultList);
        } else {
            var resultList = bunches.map(x => ({
                title: x.toLowerCase(),
                subtitle: 'Action to run this bunch.',
                arg: `x-bunch://${bunchCommand}?bunch=` + x.toLowerCase()
            }));

            // prepend the bunch settings command and return the list
            alfy.output(bunchSettings.concat(resultList));
        }
    });
}
