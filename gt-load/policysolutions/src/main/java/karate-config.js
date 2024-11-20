function fn() {
    var config = {
        util: Java.type('gw.gtapi.util.KarateJavaWrapper'),
        execution: Java.type("com.gw.execution.KarateExecution")
    };

    karate.configure('logPrettyRequest', true);
    karate.configure('logPrettyResponse', true);

    config.pcBaseUrl = java.lang.System.getenv('pcBaseUrl');

    // Override karate feature files root dir location.
    config.execution.setKarateFeatureDirLocation("classpath:gw");

    karate.call('classpath:gtapi-e2e-util.js', config);
    attachE2EHelperMethods(config);

    return config;
}
