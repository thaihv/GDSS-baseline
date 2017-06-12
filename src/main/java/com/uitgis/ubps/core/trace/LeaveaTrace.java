package com.uitgis.ubps.core.trace;

import java.util.Locale;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.springframework.context.MessageSource;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

import com.uitgis.ubps.core.trace.manager.TraceHandlerService;

public class LeaveaTrace {

	@Resource(name = "messageSource")
	private MessageSource messageSource;

	private static final long serialVersionUID = 1L;
	private TraceHandlerService[] traceHandlerServices;

	private PathMatcher pm = new AntPathMatcher();

	public void setTraceHandlerServices(TraceHandlerService[] traceHandlerServices) {
		this.traceHandlerServices = traceHandlerServices;
	}

	public int countOfTheTraceHandlerService() {
		return (traceHandlerServices != null) ? traceHandlerServices.length : 0;
	}

	public void trace(String msgKey, Class<?> clazz) {
		this.trace(msgKey, new String[] {}, clazz);
	}

	public void trace(String msgKey, String[] msgArgs, Class<?> clazz) {
		this.trace(msgKey, msgArgs, null, clazz);
	}

	public void trace(String msgKey, String[] msgArgs, Locale locale, Class<?> clazz) {
		// traceObj.
		trace(clazz, messageSource, msgKey, msgArgs, locale, null);
	}

	public void trace(Class<?> clazz, MessageSource messageSource, String messageKey, Object[] messageParameters,
			Locale locale) {
		this.trace(clazz, messageSource, messageKey, messageParameters, locale, null);

	}

	public void trace(Class<?> clazz, MessageSource messageSource, String messageKey, Object[] messageParameters,
			Locale locale, Log log) {

		String message = messageSource.getMessage(messageKey, messageParameters, null, locale);

		if (log != null) {
			log.info(" LeaveaTrace.trace() this.message =>" + message);
		}

		if (traceHandlerServices == null)
			return;
		for (TraceHandlerService traceHandlerService : traceHandlerServices) {
			if (traceHandlerService.hasReqExpMatcher()) {
				traceHandlerService.setReqExpMatcher(pm);
			}
			traceHandlerService.setPackageName(clazz.getCanonicalName());
			traceHandlerService.trace(clazz, message);
		}

	}
}
