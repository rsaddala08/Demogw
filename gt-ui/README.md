

# GT UI

TestCafe based UI test automation framework for Guidewire InsuranceSuite and Jutro-based applications.

## Pre-Requisite

Perform  below one time pre-requisite steps before executing the tests.

1. Page Object Generation (Optional)

  Page object Files for both Insurance Suite Apps and Jutro Apps can be generated automatically using the Ignite tool which is already added as dependency in the GT UI framework. This reduces significant coding effort for the automation test developers as it generates the Page object files covering 99% of the web elements of both Jutro & Insurance Suite Applications.

  **Examples of page generation:**

InsuranceSuite (PCF-based) application:
  ```
   npx ignite --pcfOption "bc" --task "generateGTUIPageObjectFiles" --projectRootLocation "billingsolutions/" --pcfLocation "<path-to-jar-file>/bc-configuration-10.0.3.jar"
  ```

Jutro-based application:
  ```
   npx ignite --source https://hfe-personalization-cork-shane.api.dev.ccs.guidewire.net/api/v1/experiences/210cd341-ca3c-4167-bafe-ad2bea8c5638 --task generateE2ETest --projectRootLocation tests/ConsumerApp --pages pages --featureFileOutputLocation tests/ConsumerApp/bddTests/features
  ```

2. Configuration

You must configure the URLs for the applications under test (AUT) before running your tests. These, along with default location patterns for test files, are defined in config.json under the top-level config directory.

The supported URL parameters for the Guidewire InsuranceSuite applications are PC_URL, CC_URL, BC_URL, CM_URL.

Here are descriptions for the default location pattern parameters:

|**Parameter**|**Description**|**Default value**|
|:-----------|:------------|:----------|
|feature-location-pattern|Default location for behavior (BDD style) tests (override with --feature)|`*/behaviortests/features/**/*.feature`|
|glue-location-pattern|Default location for behavior test step implementations (override with --glue)|`*/behaviortests/steps/**/*.js`|


## Executing Tests

#### Running behavior (Cucumber BDD-style) tests
Tests written in the Cucumber behavior-based style can be run using the ***gt-ui-tests*** npm script

To run all the behavior files that exist in the project use:
 
 ```sh
 npm run gt-ui-tests
 ```

The tests run can be further refined by using parameters to specify the tags, glue, feature or browser to use.

There are two ways of doing this, and please note that they are _mutually exclusive_:

**Option 1.** Specify the feature files, glue, and tags on the command line

For example to run the scenarios in the features in the policysolutions folder which have either @RestScenarios or @OOTBscenario as their tag in Firefox and Chrome in headless mode the command would look like:

 ```sh
 npm run gt-ui-tests -- --axeScan=true --cucumberTags='@RestScenarios,@OOTBscenario' --feature='policysolutions/behaviortests/features/*.feature' --glue='policysolutions/behaviortests/*.js' --browser=firefox,chrome --headless=true
 ```

Here is a description of the parameters:

|**Parameter**|**Description**|**Type**|**Default value**|**Required**|
|:-----------|:------------|:------|:---------------|:----------|
|--feature|The location of the feature file(s) to use for test|String|`*/behaviortests/features/**/*.feature`|Optional|
|--glue|The location of the JavaScript files defining the step code|String|`*/behaviortests/steps/**/*.js`|Optional|
|--cucumberTags|Filter which scenarios to run by their cucumber tag|String|~@Ignore|Optional|

Note that these options _cannot_ be specified on the same command line with the --testSuite option.

For more information on the Cucumber tag syntax see https://github.com/kiwigrid/gherkin-testcafe#tags

**Option 2.** Specify the feature files, glue, and tags in a test suite configuration file

Use the `--testSuite` option to specify a configuration file defining the features, glue, and cucumberTags for the test suite.  

|--testSuite|The name of the Json file where Cucumber test suite parameters are defined|String|None|Optional|

Here is an example test suite configuration file:

{
  "features": "*solutions/behaviortests/features/HealthCheck.feature",
  "tags" : "@CCHealthCheck,@PCHealthCheck,@BCHealthCheck",
  "glue" : "*solutions/behaviortests/steps/*.js"
}

To run this test an example command line might look like:

```sh
npm run gt-ui-tests -- --testSuite=HealthCheckSuite chrome:headless
```

Please note the following about the `--testSuite` option:
* On the command line you must specify the test suite configuration file name _without_ the .json extension
* The test suite configuration file must be placed under the top-level config directory
* You cannot have spaces between the tag names in the test suite configuration file
* This option _cannot_ be specified on the same command line as the --feature, --glue, or --cucumberTags options

See below for a few other GT-UI supported `gt-ui-tests` command line options

Additionally, all TestCafe command line options can be used except for 'file path/glob pattern' which is replaced by the feature and glue options mentioned above.
See https://testcafe.io/documentation/402639/reference/command-line-interface for more information on available TestCafe command line options and how to use them.

### Running TestCafe Tests
Tests written in the TestCafe style can be run using the ***gt-ui-dev-tests*** npm script

To run all TestCafe tests in the project use:

```sh
 npm run gt-ui-dev-tests
 ```

The tests run can be further refined by using any of the TestCafe command line options.
For more information on using TestCafe command line options please see: https://testcafe.io/documentation/402639/reference/command-line-interface

For example, to run the TestCafe tests for policysolutions in Firefox and Chrome in headless mode the command would look like:

 ```
 npm run gt-ui-dev-tests -- --axeScan=true chrome:headless,firefox:headless policysolutions/devtests
 ```
See below for a few other supported `gt-ui-dev-tests` command line options

## Command line options supported by both `gt-ui-tests` and `gt-ui-dev-tests`

| **Parameter**    | **Description**                                                                                                | **Type** | **Default value**    |**Required**|
|:-----------------|:---------------------------------------------------------------------------------------------------------------|:---------|:---------------------|:----------|
| --axeScan        | Whether to execute accessibility scans that have been enabled on individual page objects within each test case | boolean  | false                |Optional|
| --reporterOutput | The output location to write default reports to                                                                | String   | reports/devtests or reports/behaviortests |Optional|

## Deprecated Command line options
These options were previously used to refine test execution. While they will continue to be supported for now they may be removed from future releases. Equivalent TestCafe command line options should be used instead. Please see https://testcafe.io/documentation/402639/reference/command-line-interface for more information on available TestCafe options.

|**Parameter**|**Description**|**Type**|**Default value**|**Required**|
|:-----------|:------------|:------|:---------------|:----------|
|--tests|The location of the JS files containing the TestCafe tests you want to run. Multiple locations can be specified by using a ',' as the delimiter|...String|`*/devtests/**/*.js`|Optional|
|--includeFixtures|Filter what fixtures to run by their metadata. The filter setting is in key=value format, for example: --includeFixtures fixtureGroup="Account Tab". Multiple filter rules can be specified by using a ',' as the delimiter. See [TestCafe help for more information on how to set Fixture meta](https://devexpress.github.io/testcafe/documentation/reference/test-api/fixture/meta.html)|String|undefined|Optional|
|--excludeFixtures|Filter what fixtures not to run by their metadata. The filter setting is in key=value format, for example: --excludeFixtures fixtureGroup="Account Tab". Multiple filter rules can be specified by using a ',' as the delimiter. See [TestCafe help for more information on how to set Fixture meta](https://devexpress.github.io/testcafe/documentation/reference/test-api/fixture/meta.html)|String|undefined|Optional|
|--includeTests|Filter what tests to run by their metadata. The filter setting is in key=value format, for example: --includeTests TestGroup=Account. Multiple filter rules can be specified by using a ',' as the delimiter. See [TestCafe help for more information on how to set test meta](https://devexpress.github.io/testcafe/documentation/reference/test-api/test/meta.html)|String|undefined|Optional|
|--excludeTests|Filter what tests not to run by their metadata. The filter setting is in key=value format, for example: --excludeTests fixtureGroup="Account Tab". Multiple filter rules can be specified by using a ',' as the delimiter. See [TestCafe help for more information on how to set test meta](https://devexpress.github.io/testcafe/documentation/reference/test-api/test/meta.html)|String|undefined|Optional|
|--browser|The list of browsers to run tests against. Individual browsers can be separated by a comma|...String|chrome|Optional|
|--headless|Run browsers in headless mode|boolean|false|Optional|
|--quarantineMode|Reruns failing tests up to three times|boolean|false|Optional|
|--browserInitTimeout|The max time in milliseconds to wait for the browser to connect to TestCafe|Integer|120000|Optional|
|--selectorTimeout|The max time in milliseconds to wait for a selector to be available|Integer|30000|Optional|
|--assertionTimeout|The max time in milliseconds to wait for an assertion to match|Integer|20000|Optional|
|--pageLoadTimeout|The max time in milliseconds to wait for a page load to complete|Integer|30000|Optional|
|--liveMode|Runs tests in TestCafe live mode. See [TestCafe help for more information on live mode](https://devexpress.github.io/testcafe/documentation/guides/basic-guides/run-tests.html#how-live-mode-works)|boolean|false|Optional|
|--screenshotsPathPattern|Pattern for file name for the screenshot files|String|If exists testcaferc.json then value from this file otherwise default testafe value|Optional|
|--videoPathPattern|Pattern for file name for the video files|String|If parameter not specified then video capture is disabled. If specified then the pattern is taken from there, if just parameter is given with no value then '${DATE}_${TIME}/${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.mp4' is used|Optional|

## Adding Environment Variables
Environment variables can be set in a .env file located in the config folder.
An example of the format is
 ```
  USERNAME=dev-cygnus 
  ```
The value can then be used in tests, for example: 
 ```sh
const {
  USERNAME
} = process.env;
 ```
Teams that are using GT-UI as a dependency in their project can add their own .env using --envVarsPath   
Example
 ```sh
npx gt-ui-dev-tests --tests=*/devtests --browser=chrome:headless --envVarsPath=./.env
 ```

## TypeScript Support
* TypeScripting is enabled for both Behavior and TestCafe style tests.
* During development compilation can be done using `build-typescript` script.
* Typescript tests can be executed using existing `gt-ui-tests` and `gt-ui-dev-tests` commands.
* Typescript configurations can be found in `config/tsconfig.json` file.

## Generating Reports

### Generate Behavior Reports
After the test execution is complete, run the command below to generate an HTML Test Report,

`npm run report`

HTML reports will be generated under the reports/bdd folder. It will also open up in the browser after running the above command.

### View TestCafe Reports
After running the TestCafe tests, an HTML file containing the result can be found in the reports/devTests folder

### Generate Behavior Reports
After the test execution is complete, run the command below to generate an HTML Test Report,

`npm run report`

HTML reports will be generated under the reports/bdd folder. It will also open up in the browser after running the above command.

### View TestCafe Reports
After running the TestCafe tests, an HTML file containing the result can be found in the reports/devTests folder

### Generating Accessibility(Axe) Reports
Accessibility reports will be generated as specified inside the test cases and will need to be enabled by the use of "--axeScan=true" parameter.
The way to do this is to replace a default constructor with a wrapper for that specific class. For example, "let claimTabBar = new ClaimTabBar()"
would become "let claimTabBar = AxeScanWrapper(ClaimTabBar, t)".

### View Accessibility(Axe) Reports
The default location of the reports is under the path "reports/axe".

## UI API Integration

GT-UI has an ability to call APIs from GT-API module. 

In order to use this feature the user will need to do the following:
1. Provide UI and API urls in respective config files.
    - karate-config.js in the gt-api module (billingsolutions, claimsolutions, policysolutions) sets AUT base URL for the APIs.
    - config.json sets AUT URL for UI. 
2. To refer GT-APIs Admin data: Specify API module name(s) in apiStepJavaClassMapping.json file. 
3. Refer to product documentation for more details about this feature.
