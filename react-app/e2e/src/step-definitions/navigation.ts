import { Given } from '@cucumber/cucumber'
import {
    navigateToPage,
} from '../support/navigation-behavior';
import { PageId } from '../env/global';

Given('I am on the {string} page',
    async function(pageId: PageId) {
        const {
            screen: { page },
            globalVariables,
            globalConfig,
        } = this;

        console.log(`I am on the ${pageId} page`);

        globalVariables.currentScreen = pageId;

        await navigateToPage(page, pageId, globalConfig);

    }
)