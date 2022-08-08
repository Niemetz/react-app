import { Given } from '@cucumber/cucumber'
import {
    navigateToPage,
    currentPathMatchesPageId  // Lecture # 36
} from '../support/actions/navigation-behavior';
import { PageId } from '../env/global';
import { waitFor } from '../support/actions/wait-for-behavior';

Given('I am on the {string} page',
    async function(pageId: PageId) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I am on the ${pageId} page`);
        await navigateToPage(page, pageId, globalConfig);
    
        // Lecture # 36: assert that you are on the desired pageId which is passed down by Gherkin.
        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig)); 

    }
)