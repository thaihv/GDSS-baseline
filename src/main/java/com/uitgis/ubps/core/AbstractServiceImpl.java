package com.uitgis.ubps.core;

import java.util.Locale;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

import com.uitgis.ubps.core.exception.BaseException;
import com.uitgis.ubps.core.trace.LeaveaTrace;

public abstract class AbstractServiceImpl {

	protected Log log = LogFactory.getLog(this.getClass());

	@Resource(name = "messageSource")
	private MessageSource messageSource;

	@Resource(name = "leaveaTrace")
	private LeaveaTrace traceObj;

	protected Exception processException(final String msgKey) {
		return processException(msgKey, new String[] {});
	}

	protected Exception processException(final String msgKey, Exception e) {
		return processException(msgKey, new String[] {}, e);
	}

	protected Exception processException(final String msgKey, final String[] msgArgs) {
		return processException(msgKey, msgArgs, null);
	}

	protected Exception processException(final String msgKey, final String[] msgArgs, final Exception e) {
		return processException(msgKey, msgArgs, e, LocaleContextHolder.getLocale());
	}

	protected Exception processException(final String msgKey, final String[] msgArgs, final Exception e,
			Locale locale) {
		return processException(msgKey, msgArgs, e, locale, null);
	}

	protected interface ExceptionCreator {
		Exception createBizException(MessageSource messageSource);
	}

	protected Exception processException(final String msgKey, final String[] msgArgs, final Exception e,
			final Locale locale, ExceptionCreator exceptionCreator) {
		ExceptionCreator eC = null;
		if (exceptionCreator == null) {
			eC = new ExceptionCreator() {
				public Exception createBizException(MessageSource messageSource) {
					return new BaseException(messageSource, msgKey, msgArgs, locale, e);
				}
			};
		}
		return eC.createBizException(messageSource);
	}

	protected void leaveaTrace(String msgKey) {
		leaveaTrace(msgKey, new String[] {});
	}

	protected void leaveaTrace(String msgKey, String[] msgArgs) {
		leaveaTrace(msgKey, msgArgs, null);
	}

	protected void leaveaTrace(String msgKey, String[] msgArgs, Locale locale) {
		traceObj.trace(this.getClass(), messageSource, msgKey, msgArgs, locale, log);
	}

}
