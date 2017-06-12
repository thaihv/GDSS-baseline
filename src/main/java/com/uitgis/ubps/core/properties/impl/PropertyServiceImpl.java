package com.uitgis.ubps.core.properties.impl;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Vector;

import org.apache.commons.collections.ExtendedProperties;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanDefinitionStoreException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.util.Assert;

import com.uitgis.ubps.core.exception.BaseException;
import com.uitgis.ubps.core.properties.PropertyService;

public class PropertyServiceImpl
		implements PropertyService, ApplicationContextAware, InitializingBean, DisposableBean, ResourceLoaderAware {

	protected Log log = LogFactory.getLog(this.getClass());

	private List<String> location;

	private ExtendedProperties properties = null;
	private ResourceLoader resourceLoader = null;

	private MessageSource messageSource;

	public boolean getBoolean(String name) {
		return getConfiguration().getBoolean(name);
	}

	public boolean getBoolean(String name, boolean def) {
		return getConfiguration().getBoolean(name, def);
	}

	public double getDouble(String name) {
		return getConfiguration().getDouble(name);
	}

	public double getDouble(String name, double def) {
		return getConfiguration().getDouble(name, def);
	}

	public float getFloat(String name) {
		return getConfiguration().getFloat(name);
	}

	public float getFloat(String name, float def) {
		return getConfiguration().getFloat(name, def);
	}

	public int getInt(String name) {
		return getConfiguration().getInt(name);
	}

	public int getInt(String name, int def) {
		return getConfiguration().getInt(name, def);
	}

	public Iterator getKeys() {
		return getConfiguration().getKeys();
	}

	public Iterator getKeys(String prefix) {
		return getConfiguration().getKeys(prefix);
	}

	public long getLong(String name) {
		return getConfiguration().getLong(name);
	}

	public long getLong(String name, long def) {
		return getConfiguration().getLong(name, def);
	}

	public String getString(String name) {
		return getConfiguration().getString(name);
	}

	public String getString(String name, String def) {
		return getConfiguration().getString(name, def);
	}

	public String[] getStringArray(String name) {
		return getConfiguration().getStringArray(name);
	}

	public Vector getVector(String name) {
		return getConfiguration().getVector(name);
	}

	public Vector getVector(String name, Vector def) {
		return getConfiguration().getVector(name, def);
	}

	public Collection getAllKeyValue() {
		return getConfiguration().values();
	}

	private ExtendedProperties getConfiguration() {
		return properties;
	}

	public void setLocation(List list) {
		this.location = list;
	}

	@Override
	public void afterPropertiesSet() throws BaseException {
		try {
			if (properties == null)
				properties = new ExtendedProperties();

			for (String fileName : location) {
				loadPropertyResources(fileName, null);
			}
		} catch (Exception e) {
			if (e instanceof BaseException)
				throw (BaseException) e;
			else {
				if (PropertyService.LOGGER.isErrorEnabled())
					PropertyService.LOGGER.error(messageSource.getMessage("error.properties.initialize.reason",
							new String[] {}, Locale.getDefault()));
				throw new BaseException(messageSource, "error.properties.initialize", e);
			}
		}
	}

	private void loadPropertyResources(String location, String encoding) throws Exception {

		if (resourceLoader instanceof ResourcePatternResolver) {
			try {
				Resource[] resources = ((ResourcePatternResolver) resourceLoader).getResources(location);
				loadPropertyLoop(resources, encoding);
			} catch (IOException ex) {
				throw new BeanDefinitionStoreException(
						"Could not resolve Properties resource pattern [" + location + "]", ex);
			}
		} else {
			Resource resource = resourceLoader.getResource(location);
			loadPropertyRes(resource, encoding);
		}
	}

	private void loadPropertyLoop(Resource[] resources, String encoding) throws Exception {
		Assert.notNull(resources, "Resource array must not be null");
		for (int i = 0; i < resources.length; i++) {
			loadPropertyRes(resources[i], encoding);
		}
	}

	private void loadPropertyRes(Resource resource, String encoding) throws Exception {
		if (PropertyService.LOGGER.isDebugEnabled()) {
			PropertyService.LOGGER.debug(messageSource.getMessage("debug.properties.filename",
					new String[] { resource.getFilename(), encoding }, Locale.getDefault()));
		}
		ExtendedProperties ep = new ExtendedProperties();
		ep.load(resource.getInputStream(), encoding);
		properties.combine(ep);
	}

	@Override
	public void setResourceLoader(ResourceLoader resourceLoader) {
		this.resourceLoader = resourceLoader;
	}

	@Override
	public void destroy() throws Exception {
		properties = null;
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.messageSource = (MessageSource) applicationContext.getBean("messageSource");
	}

	@Override
	public void refreshPropertyFiles() throws BaseException {
		String fileName = "";
		try {
			properties = new ExtendedProperties();

			for (String sfileName : location) {
				fileName = sfileName;
				loadPropertyResources(fileName, null);
			}
		} catch (Exception e) {
			if (PropertyService.LOGGER.isErrorEnabled()) {
				PropertyService.LOGGER.error(messageSource.getMessage("error.properties.refresh.files",
						new String[] { fileName }, Locale.getDefault()));
				PropertyService.LOGGER.error(messageSource.getMessage("error.properties.refresh.files.reason",
						new String[] {}, Locale.getDefault()));
			}
			throw new BaseException("error.properties.refresh.files", new String[] { fileName }, e);
		}
	}

}
