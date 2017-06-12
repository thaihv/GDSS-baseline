package com.uitgis.ubps.cmmn.json;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.annotations.SerializedName;

public class GsonSerializedExcludeCustom implements ExclusionStrategy {

	@Override
	public boolean shouldSkipClass(Class<?> arg0) {

		return false;
	}

	@Override
	public boolean shouldSkipField(FieldAttributes f) {

		SerializedName ns = f.getAnnotation(SerializedName.class);
		if (ns != null)
			return false;
		return true;
	}

}
