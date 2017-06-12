package com.uitgis.ubps.core.properties;

import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.uitgis.ubps.core.exception.BaseException;

public interface PropertyService {

	Log LOGGER = LogFactory.getLog(PropertyService.class);

	boolean getBoolean(String name);

	boolean getBoolean(String name, boolean def);

	double getDouble(String name);

	double getDouble(String name, double def);

	float getFloat(String name);

	float getFloat(String name, float def);

	int getInt(String name);

	int getInt(String name, int def);

	Iterator getKeys();

	Iterator getKeys(String prefix);

	long getLong(String name);

	long getLong(String name, long def);

	String getString(String name);

	String getString(String name, String def);

	String[] getStringArray(String name);

	Vector getVector(String name);

	Vector getVector(String name, Vector def);

	void refreshPropertyFiles() throws BaseException;

	Collection getAllKeyValue();
}
