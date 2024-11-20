function fn() {
    var config = {
        util: Java.type('gw.gtapi.util.KarateJavaWrapper'),
        execution: Java.type("com.gw.execution.KarateExecution")
    };

    config.CC_URL = java.lang.System.getenv('ccBaseUrl');

    karate.configure('logPrettyRequest', true);
    karate.configure('logPrettyResponse', true);

    // Override karate feature files root dir location.
    config.execution.setKarateFeatureDirLocation("classpath:gw");

    karate.call('classpath:gtapi-e2e-util.js', config);
    attachE2EHelperMethods(config);

    return config;
}
