package com.uitgis.ubps.cmmn.ssn;

import java.util.Locale;

import com.uitgis.ubps.cmmn.util.SessionUtil;

public class SsnInfo extends SessionUtil {

	public static String getString(String key) {
		try {
			return (String) getSessionAttribute(key);
		} catch (Exception e) {
			return "";
		}
	}

	public static boolean isAuth(String key) {
		try {
			return (Boolean) getSessionAttribute(key);
		} catch (Exception e) {
			return false;
		}
	}

	public static String getLanquage() {
		try {
			return ((String) getSessionAttribute("loggedUserLocale") == null) ? "vn"
					: (String) getSessionAttribute("loggedUserLocale");
		} catch (Exception e) {
			return "vn";
		}
	}

	public static Locale getLocale() {

		return new Locale(getLanquage());
	}
}