import { Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global';
import { getElementLocator } from "../../support/actions/web-element-helper";
import { waitFor } from '../../support/actions/wait-for-behavior';

Then('the {string} should contain the text {string}',
    async function(elementKey: ElementKey, expectedElementText: string) {
        const {
            screen: { page },
            globalVariables,
            globalConfig,
        } = this;
        //console.log(`The ${elementKey} should contains the text ${expectedElementText}....`);
        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig)
        const executionResult = await waitFor(async () => {
            const elementText = await page.textContent(elementIdentifier)
            return elementText?.includes(expectedElementText);
        });
        if (executionResult == false){
            throw new Error(` 
            Step    = The ${elementKey} should contains the text "${expectedElementText}".
            Page    = ${globalVariables.currentScreen.toUpperCase()}.
            Element = "${elementIdentifier}".
            Expeccted Text = "${expectedElementText}".
            Actual Text    = "${await page.textContent(elementIdentifier)}".`
            )
        }

    }
)