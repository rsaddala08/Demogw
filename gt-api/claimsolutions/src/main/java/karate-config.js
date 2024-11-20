function fn() {
    var ccBaseUrl = java.lang.System.getenv('ccBaseUrl') ? java.lang.System.getenv('ccBaseUrl') : 'DEFAULT_CC_URL';

    var config = {
        util: Java.type('gw.gtapi.util.KarateJavaWrapper'),
        execution: Java.type("com.gw.execution.KarateExecution"),
        stepVariablesContainer : Java.type('com.gw.execution.CucumberStepVariablesContainer')
    };

    config.CC_URL = ccBaseUrl;

    karate.configure('logPrettyRequest', true);
    karate.configure('logPrettyResponse', true);

    // Override karate feature files root dir location.
    config.execution.setKarateFeatureDirLocation("classpath:gw");

    karate.callSingle('classpath:com/gw/GtApiHealthCheck.feature@id=AppHealthCheck', {'appUrl': config.CC_URL});
    karate.call('classpath:gtapi-e2e-util.js', config);
    attachE2EHelperMethods(config);

    return config;
}
