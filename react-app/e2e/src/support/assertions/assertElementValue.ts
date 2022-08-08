import { ElementKey } from "../../env/global";
import { ScenarioWorld } from "../../step-definitions/setup/world";
import { getCurrentPageId } from "../actions/navigation-behavior";
import { waitFor } from "../actions/wait-for-behavior";
import { getElementLocator } from "../actions/web-element-helper";

export async function assertElementValue (world: ScenarioWorld, elementKey: ElementKey, expectedElementText: string) {
    const {
        screen: { page },
        globalConfig,
       
    } = world;

    const elementIdentifier = getElementLocator(elementKey, page, globalConfig);
    const executionResult = await waitFor(async () => {
        const isElementVisible = (await page.$(elementIdentifier)) != null;
        return isElementVisible;
    });
   
   const actualText = await page.textContent(elementIdentifier);

   if(executionResult && (expectedElementText !== actualText)){
     throw new Error(` Actual Text DOES NOT MATCH Expected Text.
     Page Name       = "${getCurrentPageId(page, globalConfig)}". 
     Element Name    = "${elementKey}"
     Element Locator = "${elementIdentifier}".
     Expected Text   = "${expectedElementText}".
     Actual Text     = "${actualText}".`)
   }
}