import { Page } from 'playwright';
import {GlobalConfig,PageId} from '../../env/global';

export const navigateToPage = async (
    page: Page,
    pageId: PageId,  // the pageId is a var passed from Gherkin layer
    { pagesConfig, hostsConfig }: GlobalConfig
): Promise<void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost',
    } = process.env;

    const hostPath = hostsConfig[`${hostName}`];
    console.log("Current hostPath = ", hostPath);

    const url = new URL(hostPath);
    console.log("Current URL = " , url);

    const pageConfigItem = pagesConfig[pageId];

    //console.log("THIS IS pageConfigItem =  " , JSON.stringify(pageConfigItem));

    url.pathname = pageConfigItem.route;
    console.log("Current pathname = ", url.pathname);
    await page.goto(url.href);
};

// NEW, Lecture #36
// Does the route/path specified in the page.json that is asociated with the pageId match with the specified route/path?
const pathMatchesPageId = (
    page:Page,
    path: string,
    pageId: PageId,   // the pageId is a var passed from Gherkin layer
    { pagesConfig }: GlobalConfig
): boolean => {
    const pageRegexString = pagesConfig[pageId].regex; // Get the "regrex"'s value based on the pageId
    const pageRegex = new RegExp(pageRegexString)  // get the "regex"'s value and turn it into a regular expressions string.
    // my code
    const evaluationResult = pageRegex.test(path) ; //  Test to see if the current path/route matches the "regex"'s value. 
    if (!evaluationResult) {
        //const { pathname: currentPath } = new URL(page.url())
        throw Error(
            ` The current URL route DOES NOT MATCH the URL route specified in the pages.json.
        Page Name                     = "${pageId}". 
        Current actual URL route      = "${path}".
        Route specified in pages.json = "${pageRegex}".`
        //     `** Failed to get page name = ${pageId} from current route ${pageRegex}, 
        //   Possible pages: ${JSON.stringify(pagesConfig)}`
        );
    }
    return evaluationResult; 
};

// NEW, Lecture #36
// Does the current path/route match the path/route in the current URL?
export const currentPathMatchesPageId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig
): boolean => {
    const { pathname: currentPath } = new URL(page.url())
    return pathMatchesPageId(page,currentPath, pageId, globalConfig)
};

// NEW, Lecture #37
export const getCurrentPageId = (
    page: Page,
    globalConfig: GlobalConfig
): PageId => {

    console.log("============================================= "); // My code

    const { pagesConfig } = globalConfig;  // returns all page records that are specified in the "pages.json"
    console.log(" pagesConfig (in navigation-behaviors.ts) = ", pagesConfig); // My code

    const pageConfigPageIds = Object.keys(pagesConfig);  // returns all page ID records from the "pages.json"
    console.log(" pageConfigPageIds (in navigation-behaviors.ts) = ", pageConfigPageIds); // My code

    // My Note:  the "pathname" is one of the attributes of the URL() object.
    const { pathname: currentPath } = new URL(page.url()); // Note: this is where the problem is... Need to assign the name page ID to URL() object?
    console.log(" currentPath (in navigation-behaviors.ts) = ", currentPath); // My code

    // If the path/route matches with the URL's current path/route the return the pageId in the Records of all pages.
    const currentPageId = pageConfigPageIds.find(pageId =>  
        pathMatchesPageId(page, currentPath, pageId, globalConfig) 
    
    );

    console.log(" currentPageId (in navigation-behaviors.ts) = ", currentPageId); // My code
    console.log("============================================= "); // My code

    if (!currentPageId) {
        throw Error(
            `** Failed to get page name from current route ${currentPath}, 
          Possible pages: ${JSON.stringify(pagesConfig)}`
        );
    }
    return currentPageId;
};
