GT-LOAD

Guidewire Load testing (GT-LOAD) enables you to design and execute load performance testing on
Guidewire Cloud applications within a behavior-driven development (BDD) environment. GT-LOAD can sequence API
calls in scenarios that cover and test entire business processes from end to end.

GT-LOAD is built on top on Karate and Gatling. Karate is a framework for API testing that Guidewire adopted for testing REST APIs
and the underlying functionality that they expose.

The documentation on Karate can be found on the main Karate website: https://intuit.github.io/karate

GT-LOAD consists of three main modules:
* claimsolutions: Tests for the standalone ClaimCenter application
* policysolutions: Tests for the standalone PolicyCenter application

The karate-config.js file defines the execution configuration for the module's scenarios.

New parameters can be added to this file to answer other needs and other requirements.

Configuration parameters can also be set as system environment variables.

**Running the tests**
1. A CI/CD pipeline is required to run the tests continuously
2. An IDE is required to run the tests locally

**The claimsolutions module**

These tests are intended for the standalone ClaimCenter application.

**Environment Set up**

Requirements
1.	CC standalone server with TestSupport APIs enabled

**Setting the CC application URL**

### Using A System Environment Variable

Set the "ccBaseUrl" system environment variable to the desired value.

### Modifying the “karate-config.js" File

Change undefined to the desired URL value in the statement below:
```
var ccBaseUrl = java.lang.System.getenv('ccBaseUrl') ? java.lang.System.getenv('ccBaseUrl') : undefined;
```
For example (using Google as the default value):
```
var ccBaseUrl = java.lang.System.getenv('ccBaseUrl') ? java.lang.System.getenv('ccBaseUrl') : ‘https://www.google.com’;
```

**The policysolutions module**

These tests are intended for the standalone PolicyCenter application.

**Setting the PC application URL**

### Using A System Environment Variable

Set the "pcBaseUrl" system environment variable to the desired value.

### Modifying the “karate-config.js" File

Change undefined to the desired URL value in the statement below:
```
var pcBaseUrl = java.lang.System.getenv('pcBaseUrl') ? java.lang.System.getenv('pcBaseUrl') : undefined;
```
For example (using Google as the default value):
```
var pcBaseUrl = java.lang.System.getenv('pcBaseUrl') ? java.lang.System.getenv('pcBaseUrl') : ‘https://www.google.com’;
```
