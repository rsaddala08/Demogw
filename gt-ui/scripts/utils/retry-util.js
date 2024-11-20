import { t } from 'testcafe';

/**
 * Repeatedly performs a set of actions until an expected condition is met
 *
 * @param {Function} actionFunction         the set of actions to be executed
 * @param {Function} comparisonFunction     a function returning a boolean value of whether the expected condition is met
 * @param {string} errorMessage             error message when condition is not met
 * @param {Object} [options]                has the following optional properties, in any order:
 * @property   {number} [maxRetry]          the maximum number of times to repeat the action & comparison; default is 10
 * @property   {number} [interval]          the amount of time to wait between repeats in ms; default is 500
 * @property   {number} [initialDelay]      the amount of time to wait before the first action in ms; default is 1500
 * @returns {Promise<void>}
 * @throws {Error}                          when expected condition has not been found after the maximum number of retries
 *
 * @example                                 await retryActionUntil(
 *                                              async () => {
 *                                                  await searchPolicy(policyNumber);
 *                                              },
 *                                              async () => {
 *                                                  return (await getCurrentLocationName()) === 'PolicySummary';
 *                                              },
 *                                              'Policy not found in BC',
 *                                              { maxRetry: 5, interval: 1000, initialDelay: 0 }
 *                                          );
 */
export async function retryActionUntil(actionFunction, comparisonFunction, errorMessage, options) {
    const defaultErrorMessage = 'Retried actions did not result in expected condition';
    errorMessage = errorMessage || defaultErrorMessage;

    const defaults = {
        maxRetry: 10,
        interval: 500,
        initialDelay: 1500
    };
    options = { ...defaults, ...(options || {}) };

    if (options.initialDelay) {
        await t.wait(options.initialDelay);
    }

    for (let i = 0; i < options.maxRetry; i++) {
        await actionFunction();
        if (await comparisonFunction()) {
            return;
        }
        await t.wait(options.interval);
    }
    throw new Error(errorMessage);
}
