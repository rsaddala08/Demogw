package gw.util;

import gw.gtapi.util.Utilities;

import java.util.*;

public class PolicyUtil {
    public static String getRandomName(String prefix) {
        return  prefix + (Utilities.getSecureRandom().nextInt( Integer.MAX_VALUE ) + 1);
    }

    public static Map<String, String> getDefaultCredentials() {
        Map<String, String> defaultCredentials = new HashMap<>();
        defaultCredentials.put("username", "enter user name");
        defaultCredentials.put("password", "enter password");
        return defaultCredentials;
    }
}
