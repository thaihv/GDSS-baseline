package com.uitgis.ubps.core.mvc.handler;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Set;

import org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping;

public class SimpleUrlAnnotationHandlerMapping extends DefaultAnnotationHandlerMapping {

	private Set<String> urls;

	public void setUrls(Set<String> urls) {
		this.urls = urls;
	}

	protected String[] remappingUrls(String[] urlsArray) {

		if (urlsArray == null) {
			return null;
		}

		ArrayList<String> remappedUrls = new ArrayList<String>();

		for (Iterator<String> it = this.urls.iterator(); it.hasNext();) {
			String urlPattern = (String) it.next();
			for (int i = 0; i < urlsArray.length; i++) {
				if (getPathMatcher().matchStart(urlPattern, urlsArray[i])) {
					remappedUrls.add(urlsArray[i]);
				}
			}
		}

		return (String[]) remappedUrls.toArray(new String[remappedUrls.size()]);

	}

	protected String[] determineUrlsForHandler(String beanName) {
		return remappingUrls(super.determineUrlsForHandler(beanName));
	}
}
