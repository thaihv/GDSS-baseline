package com.uitgis.ubps.cmmn.util;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoader;

import com.uitgis.ubps.core.properties.PropertyService;

public class PropertyUtil {

	private static PropertyService property;

	private static PropertyService getBean() {
		if (property == null) {
			ApplicationContext ctx = ContextLoader.getCurrentWebApplicationContext();
			property = (PropertyService) ctx.getBean("propertiesService");
		}
		return property;
	}

	public static String getString(String key) {
		return getBean().getString(key);
	}

}
