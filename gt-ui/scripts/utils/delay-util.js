import { t } from 'testcafe';
/**
 * Additional time may be needed for work or page reload to be complete
 * @param {number} [delay]  Amount of time in milliseconds to pause test execution
 *                          default wait time - 5000
 * @return {Promise<void>}
 */
export async function addDelay(delay) {
    // Adding additional wait time when TestCafe default wait is not sufficient
    // especially for work or page load to complete
    delay = delay ? delay : 5000;
    await t.wait(delay);
}