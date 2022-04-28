import dotenv from 'dotenv'
import { env, getJsonFromFile } from './env/parseEnv'
import {
    GlobalConfig,
    HostsConfig,
    PagesConfig,
    PageElementMappings, //NEW
} from './env/global';
import * as fs from "fs"; //NEW

dotenv.config({path: env('COMMON_CONFIG_FILE')})
// NOTE: this is the hostS URLs.  NOT a sigle host.
const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));
//console.log(`hostsConfi = ${JSON.stringify(hostsConfig)}`)
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH'));
//console.log(`pagesConfig = ${JSON.stringify(pagesConfig)}`)

// get all the pages under /config/mappings folder. The pages contains the elements on the pages.
// This will help speed up the element retrieval process since all elements of all pages already loaded in this
// "mappingFiles" array.
const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`); //NEW

// NEW, the whole block is NEW
// Loop through each of the pages specified in JSON files under the /config/mappings folder.
// the content of the pageElementMappings is an array of 
// <"name of page derived from the pageobject.ts",<elementName (passed down from Gherkin), ElementCSSPath>>
const pageElementMappings: PageElementMappings = mappingFiles.reduce(
    (pageElementConfigAcc, file) => {
        // Strip off the "json" extensions and use the filename as the key
        // it means that you need to name the file as the name of the page(s).
        // for example:  the "home" page must be named "home.json"... not sure of the name support spaces?
        // the step below is to get the names of all pages under folder "mappings"
        const key = file.replace('.json', '');
        //console.log("CONTENT OF THE KEY = " + key);
        //console.log(`CONTENT OF THE pageElementConfigAcc =  ${JSON.stringify(pageElementConfigAcc)}`);
        // extract the element from the pages
        const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
        //console.log(`CONTENT OF THE elementMappings =  ${JSON.stringify(elementMappings)}`);
        return { ...pageElementConfigAcc, [key]: elementMappings };
    },
    {}
);
//console.log(`CONTENT OF THE pageElementMappings =  ${JSON.stringify(pageElementMappings)}`);

// this "global" object will be passed along to each scenario's context
const worldParameters: GlobalConfig = {
    hostsConfig,  // based URL
    pagesConfig,  // route after based URL
    pageElementMappings,//NEW, all of the elements on ALL pages
};

//console.log(`CONTENT OF THE worldParameters =  ${JSON.stringify(worldParameters)}`);

const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                -f json:./reports/report.json \
                --world-parameters ${JSON.stringify(worldParameters)} \
                --format progress-bar`;

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

export { dev, smoke, regression}