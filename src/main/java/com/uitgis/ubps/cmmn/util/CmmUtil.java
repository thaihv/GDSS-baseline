package com.uitgis.ubps.cmmn.util;

import java.io.Reader;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

public class CmmUtil {

	private static Gson gson = null;

	public static Gson getGsonInstance() {

		if (gson == null) {
			gson = new GsonBuilder().serializeNulls().setPrettyPrinting().create();
			// .addDeserializationExclusionStrategy(new
			// GsonSerializedExcludeCustom()).create();
		}
		return gson;
	}

	public static boolean isNull(Object str) {

		if (str == null || str.toString().toLowerCase().equals("null") || str.toString().trim().equals("")) {
			return true;
		}
		return false;
	}

	public static Object jsonToObject(String json, Type objType) {

		return getGsonInstance().fromJson(json, objType);
	}

	public static Object jsonToObject(Reader json, Type objType) {

		return getGsonInstance().fromJson(json, objType);
	}

	public static String objToJson(Object obj) {

		return getGsonInstance().toJson(obj);
	}

	public static List<HashMap<String, String>> jsonToHashMapList(JsonReader json) {
		Gson gson = new Gson();
		return gson.fromJson(json, new TypeToken<List<HashMap<String, String>>>() {
		}.getType());
	}

}
