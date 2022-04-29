
// NEW, this a whole new file.
import { Page } from 'playwright';
import {ElementKey, ElementLocator, GlobalConfig, GlobalVariables} from '../../env/global';

export const getElementLocator = (
    page: Page,
    elementKey: ElementKey,
    globalVariables: GlobalVariables,
    globalConfig: GlobalConfig,
): ElementLocator => {
    const { pageElementMappings } = globalConfig;
    const currentPage = globalVariables.currentScreen;
    const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];

    if( elementIdentifier == null) {
       throw new Error(`** The element name = "${elementKey}" specified by Gherkin DOES NOT exist in the "${globalVariables.currentScreen}" pageobject!`);
    }
    else
       //return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
       return elementIdentifier;
};
