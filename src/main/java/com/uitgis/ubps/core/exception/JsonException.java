package com.uitgis.ubps.core.exception;

import java.text.MessageFormat;
import java.util.Locale;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.MessageSource;

public class JsonException extends Exception {

	protected Log log = LogFactory.getLog(this.getClass());

	private static final long serialVersionUID = 1L;

	protected String message = null;
	protected String messageKey = null;
	protected Object[] messageParameters = null;
	protected Exception wrappedException = null;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessageKey() {
		return messageKey;
	}

	public void setMessageKey(String messageKey) {
		this.messageKey = messageKey;
	}

	public Object[] getMessageParameters() {
		return messageParameters;
	}

	public void setMessageParameters(Object[] messageParameters) {
		this.messageParameters = messageParameters;
	}

	public Throwable getWrappedException() {
		return wrappedException;
	}

	public void setWrappedException(Exception wrappedException) {
		this.wrappedException = wrappedException;
	}

	public JsonException() {
		this("JsonException without message", null, null);
	}

	public JsonException(String defaultMessage) {
		this(defaultMessage, null, null);
	}

	public JsonException(Throwable wrappedException) {
		this("JsonException without message", null, wrappedException);
	}

	public JsonException(String defaultMessage, Throwable wrappedException) {
		this(defaultMessage, null, wrappedException);
	}

	public JsonException(String defaultMessage, Object[] messageParameters, Throwable wrappedException) {
		super(wrappedException);

		String userMessage = defaultMessage;
		if (messageParameters != null) {
			userMessage = MessageFormat.format(defaultMessage, messageParameters);
		}
		this.message = userMessage;

	}

	public JsonException(MessageSource messageSource, String messageKey) {
		this(messageSource, messageKey, null, null, Locale.getDefault(), null);
	}

	public JsonException(MessageSource messageSource, String messageKey, Throwable wrappedException) {
		this(messageSource, messageKey, null, null, Locale.getDefault(), wrappedException);
	}

	public JsonException(MessageSource messageSource, String messageKey, Locale locale, Throwable wrappedException) {
		this(messageSource, messageKey, null, null, locale, wrappedException);
	}

	public JsonException(MessageSource messageSource, String messageKey, Object[] messageParameters, Locale locale,
			Throwable wrappedException) {
		this(messageSource, messageKey, messageParameters, null, locale, wrappedException);
	}

	public JsonException(MessageSource messageSource, String messageKey, Object[] messageParameters,
			Throwable wrappedException) {
		this(messageSource, messageKey, messageParameters, null, Locale.getDefault(), wrappedException);
	}

	public JsonException(MessageSource messageSource, String messageKey, Object[] messageParameters,
			String defaultMessage, Throwable wrappedException) {
		this(messageSource, messageKey, messageParameters, defaultMessage, Locale.getDefault(), wrappedException);
	}

	public JsonException(MessageSource messageSource, String messageKey, Object[] messageParameters,
			String defaultMessage, Locale locale, Throwable wrappedException) {
		super(wrappedException);

		this.messageKey = messageKey;
		this.messageParameters = messageParameters;
		this.message = messageSource.getMessage(messageKey, messageParameters, defaultMessage, locale);

	}
}
