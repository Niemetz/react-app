import { Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global';
import { ScenarioWorld } from '../setup/world';
import { assertElementVisibility } from '../../support/assertions/assertElementVisibility';

Then('the {string} should be displayed',
    async function (this: ScenarioWorld, elementKey: ElementKey) {
      await assertElementVisibility(this, elementKey);
    });
