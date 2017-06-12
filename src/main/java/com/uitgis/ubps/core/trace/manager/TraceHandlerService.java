package com.uitgis.ubps.core.trace.manager;

import org.springframework.util.PathMatcher;

import com.uitgis.ubps.core.trace.handler.TraceHandler;

public interface TraceHandlerService {

	public void setPatterns(String[] patterns);

	public void setHandlers(TraceHandler[] handlers);

	public void setReqExpMatcher(PathMatcher pm);

	public void setPackageName(String canonicalName);

	public boolean hasReqExpMatcher();

	public boolean trace(Class clazz, String message);
}
