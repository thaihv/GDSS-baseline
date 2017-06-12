package com.uitgis.ubps.system.index.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.uitgis.ubps.session.service.SessionService;

/**
 * @author Thaihv
 *
 */
@Controller
public class IndexController {
	private static final Logger logger = Logger.getLogger(IndexController.class);

	@Autowired
	private SessionService sessionService;

	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/index.do", method = RequestMethod.GET)
	public ModelAndView index(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("index");

		return mav;
	}

	@RequestMapping(value = "/indexa.do", method = RequestMethod.GET)
	public ModelAndView indexWithLoginForm(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("indexa");

		return mav;
	}

	@RequestMapping(value = "/error.do", method = RequestMethod.GET)
	public ModelAndView error(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("error");

		return mav;
	}

	@RequestMapping(value = "/404.do", method = RequestMethod.GET)
	public ModelAndView pageNotFound(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("404");

		return mav;
	}

	@RequestMapping(value = "/projects.do", method = RequestMethod.GET)
	public ModelAndView projects(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("projects");

		return mav;
	}
	@RequestMapping(value = "/newproject.do", method = RequestMethod.GET)
	public ModelAndView newProject(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("newproject");

		return mav;
	}
	@RequestMapping(value = "/scenarios.do", method = RequestMethod.GET)
	public ModelAndView scenarios(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("scenarios");

		return mav;
	}
	@Secured("ROLE_ADMIN")
	@RequestMapping(value = "/admin.do", method = RequestMethod.GET)
	public ModelAndView login(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("admin");

		return mav;
	}
	@RequestMapping(value = "/main.do", method = RequestMethod.GET)
	public ModelAndView mainfuncion(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("main");

		return mav;
	}

	@RequestMapping(value = "/main_newsfeed.do", method = RequestMethod.GET)
	public ModelAndView main_newspeed(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("main_newsfeed");

		return mav;
	}

	@RequestMapping(value = "/main_todo.do", method = RequestMethod.GET)
	public ModelAndView main_todo(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("main_todo");

		return mav;
	}

	@RequestMapping(value = "/main_topic.do", method = RequestMethod.GET)
	public ModelAndView main_topic(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("main_topic");

		return mav;
	}

	@RequestMapping(value = "/statistic.do", method = RequestMethod.GET)
	@Secured("ROLE_ADMIN")
	public ModelAndView process(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("statistic");

		return mav;
	}

}
