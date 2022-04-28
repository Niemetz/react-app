export type PageId = string; // name of the current "page" passed down by gherkin.  make sure to name the page vairable as "pageID"
export type HostsConfig = Record<string, string>; // e.g, "local": "http://localhost:3000/"
//export type PagesConfig = Record<PageId, HostsConfig>; // object that contains all pages
export type PagesConfig = Record<PageId, Record<string, string>>; // object that contains all pages, e.g {"home": { "route": "/"}}
export type ElementKey = string; //NEW, name of the element passed down by gherkin
export type ElementLocator = string; //NEW, the jquery css selector.
export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>; // NEW, object that contains all above elements
export type GlobalVariables = { [key: string]: string }; // NEW, this stores a global vairable(s) that subsequence scenarioes can use.

// this object will be passed to each step so that the steps knows the current state 
export type GlobalConfig = { 
    hostsConfig: HostsConfig; // based URL
    pagesConfig: PagesConfig; // route of a new page after the based URL
    pageElementMappings: PageElementMappings; // maps elements on a page
};