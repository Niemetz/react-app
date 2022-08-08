import { Page } from 'playwright';
import {ElementKey, ElementLocator, GlobalConfig} from '../../env/global';
import { getCurrentPageId } from './navigation-behavior';

export const getElementLocator = (
    elementKey: ElementKey,
    page: Page,
    globalConfig: GlobalConfig,
): ElementLocator => {
    const currentPage = getCurrentPageId(page, globalConfig); // New, lecture #37
    const { pageElementMappings } = globalConfig;

    const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
    if (elementIdentifier) return elementIdentifier;
    else {
        throw new Error(`** The Gherkin element name = "${elementKey}" DOES NOT EXIST in the pageobject "${currentPage}" !`);
    }
};
