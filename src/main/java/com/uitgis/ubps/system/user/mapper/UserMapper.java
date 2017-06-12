package com.uitgis.ubps.system.user.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.uitgis.ubps.system.user.vo.UserVO;

/**
 * @author Thaihv
 *
 */
public interface UserMapper {

	@Select("SELECT * FROM USERS WHERE USERNAME = #{username}")
	@Results({
	        @Result(property = "username", column = "USERNAME"),
	        @Result(property = "passwrd",  column = "PASSWORD"),
	        @Result(property = "fullname", column = "FULLNAME"),
	        @Result(property = "address",  column = "ADDRESS"),
	        @Result(property = "phone",    column = "PHONE"),
	        @Result(property = "email",    column = "EMAIL"),
	        @Result(property = "enabled",  column = "ENABLED")
	})
	public UserVO getUserVOAnotation(@Param("username") String username);
	
	@Delete("DELETE FROM USERS WHERE USERNAME = #{username}")
	public int deleteUser(UserVO vo);
	
	@Update("UPDATE USERS SET PASSWORD = #{passwrd} WHERE USERNAME = #{username}")
	public int updatePassword(@Param("username") String username,@Param("passwrd") String password);		
	
	// Other parts are going to be implemented from XML file --- gdss_user.xml
	public UserVO getUserVO(UserVO vo);
	public List<UserVO> getList();
	public List<UserVO> getPagingList(UserVO vo);
	public int getListCount();
	public int updateUserVO(UserVO vo);	
	public int createUserVO(UserVO vo);


}
