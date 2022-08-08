import { Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global';
import { ScenarioWorld } from '../setup/world';
import { assertElementValue } from '../../support/assertions/assertElementValue';

Then('the {string} should contain the text {string}',
     async function (this: ScenarioWorld, elementKey: ElementKey, expectedElementText: string) {
           await assertElementValue(this, elementKey, expectedElementText);
})