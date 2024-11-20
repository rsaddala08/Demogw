function fn() {
    var policyUtil = Java.type('gw.util.PolicyUtil');
    var userPass = policyUtil.getDefaultCredentials().get("username") + ':' + policyUtil.getDefaultCredentials().get("password");
    var Base64 = Java.type('java.util.Base64');
    var encoded = Base64.getEncoder().encodeToString(userPass.getBytes());
    var headers = {}
    headers['Authorization'] = 'Basic ' + encoded;
    return karate.merge(headers, traceHeadersUtil.generateTraceHeaders());
}
