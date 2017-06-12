package com.uitgis.ubps.system.user.service;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.uitgis.ubps.system.user.vo.UserVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring/applicationContext-database-ibatis.xml")
public class UserServiceTest {

	private static Log log = LogFactory.getLog(UserServiceTest.class);
	static UserVO vo;
	
	@Autowired
	private UserService userService;
	
    @BeforeClass
    public static void beforeClass() {
		
    	vo = new UserVO();
		vo.setUsername("test_vn");
		vo.setPhone("123456789");
		vo.setEmail("test_vn@uitgis.com");
		vo.setAddress("HCMC");
		vo.setFullname("Test_VN");
		vo.setPasswrd("test_vn");
		vo.setLOCALE("vn");
		vo.setEnabled(1);
    }
    @AfterClass
    public static void afterClass() {
    	vo = null;
    }	
	@Test
	public void testGetUserVOAnotation() {
		log.info("------------------------GET USER BY NAME----------------------------------");
		UserVO vo = userService.getUserVOAnotation("admin");
		Assert.assertNotNull(vo);
		log.info(vo);
	}
	@Test
	public void testGetList() {
		 log.info("-------------------------GET LIST USER------------------------------------");
		 List<UserVO> lvo = userService.getList();
		 Assert.assertNotNull(lvo);
		 for (UserVO vo : lvo)
		 {
			 log.info("-----------USER: " + vo.getUsername());
		 }

	}
	@Test
	public void testGetListPaging() {
		 log.info("-------------------------GET LIST USERS OF PAGING------------------------------------");
		 vo.setMin(1);
		 vo.setMax(2);
		 List<UserVO> lvo = userService.getPagingList(vo);
		 
		 Assert.assertNotNull(lvo);
		 Assert.assertEquals(1, lvo.size());
		 for (UserVO vo : lvo)
		 {
			 log.info("-----------USER: " + vo.getUsername());
		 }

	}	
	@Test
	public void testCRUD() {
		log.info("-------------------------TEST ALL CRUD------------------------------------");
		
		userService.createUserVO(vo);
		Assert.assertTrue(userService.getUserVOAnotation("test_ko") != null);
		log.info("-----------CREATED: " + vo.getUsername());
		
		vo.setPhone("987654321");;
		userService.updateUserVO(vo);
		Assert.assertTrue(userService.getUserVO(vo).getPhone() != "987654321");
		log.info("-----------UPDATE: " + vo.getUsername());
		
		
		userService.deleteUser(vo);
		Assert.assertNull(userService.getUserVO(vo));
		log.info("-----------REMOVE: " + vo.getUsername());
		
	}
	
}
