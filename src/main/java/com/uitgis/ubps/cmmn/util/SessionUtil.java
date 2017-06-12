package com.uitgis.ubps.cmmn.util;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

public class SessionUtil {

	public static Object getSessionAttribute(String keyName) {

		return getAttribute(keyName, RequestAttributes.SCOPE_SESSION);
	}

	public static Object getRequestAttribute(String key) {

		return getAttribute(key, RequestAttributes.SCOPE_REQUEST);
	}

	private static Object getAttribute(String keyName, int scope) {

		return RequestContextHolder.getRequestAttributes().getAttribute(keyName, scope);
	}

	public static void setSessionAttribute(String keyName, Object valueObject) {

		setAttribute(keyName, valueObject, RequestAttributes.SCOPE_SESSION);
	}

	private static void setAttribute(String keyName, Object valueObject, int scope) {

		RequestContextHolder.getRequestAttributes().setAttribute(keyName, valueObject, scope);
	}

	public static void removeSessionAttribute(String keyName) {

		removeAttribute(keyName, RequestAttributes.SCOPE_SESSION);
	}

	private static void removeAttribute(String keyName, int scope) {

		RequestContextHolder.getRequestAttributes().removeAttribute(keyName, scope);
	}
}
