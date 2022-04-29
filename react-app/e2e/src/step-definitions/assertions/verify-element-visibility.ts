import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/actions/web-element-helper';
import { waitFor } from '../../support/actions/wait-for-behavior';

Then('the {string} should be displayed',
    async function (elementKey: ElementKey) {
        const {
            screen: { page },
            globalVariables,
            globalConfig,
        } = this;

        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig);
        const executionResult = await waitFor(async () => {
            const isElementVisible = (await page.$(elementIdentifier)) != null;
            return isElementVisible;
        });

        if(executionResult == false){
           throw new Error(`Element NOT FOUND after 10 attempts of 1000ms. 
        PageObject      = ${globalVariables.currentScreen.toUpperCase()}.
        Element Name    = "${elementKey}".
        Element Locator = "${elementIdentifier}".`)
        }
   
    }
)