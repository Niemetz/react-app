import { ElementKey } from "../../env/global";
import { ScenarioWorld } from "../../step-definitions/setup/world";
import { getCurrentPageId } from "../actions/navigation-behavior";
import { waitFor } from "../actions/wait-for-behavior";
import { getElementLocator } from "../actions/web-element-helper";

export async function assertElementVisibility (world: ScenarioWorld, elementKey: ElementKey) {
    const {
        screen: { page },
        globalConfig,
     } = world;
 
     const elementIdentifier = getElementLocator(elementKey, page, globalConfig);
     const executionResult = await waitFor(async () => {
          const isElementVisible = (await page.$(elementIdentifier)) != null;
           return isElementVisible;
      });

     if(executionResult){
       const currentPage = await getCurrentPageId(page, globalConfig);
       console.log(` >> PASSED: Element ${elementKey} is visible in the "${currentPage}" page/component`);
     }

    // const {
    //     screen: { page },
    //     globalConfig,
    //  } = word;
 
    //  const currentPage = getCurrentPageId(page,globalConfig)
    //  //console.log(`VALUE OF PAGE = ${getCurrentPageId(page,globalConfig)}`);

    //  const elementIdentifier = getElementLocator(elementKey, page, globalConfig);
    //  const executionResult = await waitFor(async () => {

    //     //   const isElementVisible = (await page.$(elementIdentifier)) != null;
    //     //    return isElementVisible;
    //     const isElementVisible = (await page.$(elementIdentifier));
    //     if (isElementVisible)
    //         return isElementVisible
    //     else {
    //         throw new Error(`Element NOT FOUND in the DOM!
    //         Page         =  "${currentPage}"
    //         Page Element =  "${elementIdentifier}"`)
    //     }
    //   });

    //  if(executionResult){
    //    const currentPage = await getCurrentPageId(page, globalConfig);
    //    console.log(` >> PASSED: Element ${elementKey} is visible in the "${currentPage}" page/component`);
    //  }
   }
