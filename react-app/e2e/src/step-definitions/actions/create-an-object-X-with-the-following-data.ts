import { When } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global';
import { ScenarioWorld } from '../setup/world';
import { assertElementValue } from '../../support/assertions/assertElementValue';
When('I create an object X with the following data',
    async function (this: ScenarioWorld, datatable) {
         datatable.hashes().forEach(row => {
        for (let fieldName in row) {
           console.log(`${fieldName} = ${row[fieldName]}`)
        }
    })

    // datatable.rows().forEach(row => {
    //        console.log(` ${row[0]} =  ${row[1]}`)
    // })
})