function fn() {
    var pcBaseUrl = java.lang.System.getenv('pcBaseUrl') ? java.lang.System.getenv('pcBaseUrl') : 'DEFAULT_PC_URL';

    var config = {
        util: Java.type('gw.gtapi.util.KarateJavaWrapper'),
        execution: Java.type("com.gw.execution.KarateExecution"),
        stepVariablesContainer : Java.type('com.gw.execution.CucumberStepVariablesContainer'),
        policyDataContainer : Java.type('gw.datacreation.admindata.PolicyDataContainer')
    };

    karate.configure('logPrettyRequest', true);
    karate.configure('logPrettyResponse', true);

    config.PC_URL = pcBaseUrl;

    // Override karate feature files root dir location.
    config.execution.setKarateFeatureDirLocation("classpath:gw");

    karate.callSingle('classpath:com/gw/GtApiHealthCheck.feature@id=AppHealthCheck', {'appUrl': config.PC_URL});
    karate.call('classpath:gtapi-e2e-util.js', config);
    attachE2EHelperMethods(config);

    return config;
}
