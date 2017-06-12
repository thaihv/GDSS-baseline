package com.uitgis.ubps.system.login.controller;

public class LoginStatus {
	public final boolean success;
	public final boolean loggedIn;
	public final String username;
	public final String errorMessage;

	public LoginStatus(boolean success, boolean loggedIn, String username, String errorMessage) {

		this.success = success;
		this.loggedIn = loggedIn;
		this.username = username;
		this.errorMessage = errorMessage;

	}
}
