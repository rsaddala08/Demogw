'use strict';
const fs = require('fs');
const path = require('path');
const java = require("java");
import { getModuleNames } from "@gtui/gt-ui-framework";

java.classpath.push(".");
const gtApiRelativePath = "../../gt-api/";
const buildLibLoc = "/build/libs/";
const jarExtension = ".jar";

class UiApiBridge {
  constructor() {
      let jarNames = getModuleNames();
      let supportingJarsIncluded = false;
      jarNames.forEach( name => {
          try {
              fs.existsSync(path.resolve(__dirname, gtApiRelativePath + name + buildLibLoc + name + jarExtension));
            }
            catch (err) {
              console.error('Not able to find api module jar. ModuleName: ' + name);
              throw new Error(err.message);
          }
          java.classpath.push((path.resolve(__dirname, gtApiRelativePath + name + buildLibLoc + name + jarExtension).replace('/', path.sep)));

          //Add supporting jars
          if(!supportingJarsIncluded) {
              let gtApiSupportingLibs = (gtApiRelativePath + "repository/supportingLibs/").replace('/', path.sep);
              java.classpath.push(path.resolve(__dirname, gtApiSupportingLibs + 'graal-sdk-21.1.0.jar'));
              java.classpath.push(path.resolve(__dirname, gtApiSupportingLibs + 'truffle-api-21.1.0.jar'));
              java.classpath.push(path.resolve(__dirname, gtApiSupportingLibs + 'js-21.1.0.jar'));

              supportingJarsIncluded = true;
          }
      });
      return this;
  }

  async runGtApiFeature(featureFile, args) {
      let gtApiBridge = java.import('com.gw.karate.GtApiBridge');
      var result = await gtApiBridge.executeGtApiFeatureSync(featureFile, args);
      return result;
  }

  async runGtApiScenario(featureFile, scenarioTag, args) {
      let gtApiBridge = java.import('com.gw.karate.GtApiBridge');
      var result = await gtApiBridge.executeGtApiScenarioSync(featureFile, scenarioTag, args);
      return result;
  }

}

export const GTUiApiBridge =  function() {
    return new UiApiBridge();
}()
