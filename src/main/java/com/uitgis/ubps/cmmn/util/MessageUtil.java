package com.uitgis.ubps.cmmn.util;

import java.util.Locale;

import org.springframework.context.support.MessageSourceAccessor;

import com.uitgis.ubps.cmmn.ssn.SsnInfo;

public class MessageUtil {

	protected static MessageSourceAccessor messageSourceAccessor;

	public void setMessageSourceAccessor(MessageSourceAccessor messageSourceAccessor) {
		MessageUtil.messageSourceAccessor = messageSourceAccessor;
	}

	public static String getMessage(String key) {
		// return messageSourceAccessor.getMessage(key, Locale.getDefault());
		return messageSourceAccessor.getMessage(key, SsnInfo.getLocale());
	}

	public static String getMessage(String key, Object[] args) {
		return messageSourceAccessor.getMessage(key, args, SsnInfo.getLocale());
	}

	public static String getMessage(String key, Locale locale) {
		return messageSourceAccessor.getMessage(key, locale);
	}

	public static String getMessage(String key, Object[] args, Locale locale) {
		return messageSourceAccessor.getMessage(key, args, locale);
	}

}
