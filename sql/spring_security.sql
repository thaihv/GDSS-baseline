/* Users anf Roles */
CREATE TABLE USERS
(
  USERNAME  VARCHAR2(50 BYTE)                   NOT NULL PRIMARY KEY,
  PASSWORD  VARCHAR2(50 BYTE)                   NOT NULL,
  FULLNAME  VARCHAR2(128 CHAR),
  ADDRESS   VARCHAR2(512 CHAR),
  PHONE     VARCHAR2(16 BYTE),
  EMAIL     VARCHAR2(320 CHAR),
  ENABLED   NUMBER(1)                           NOT NULL
);

CREATE TABLE AUTHORITIES
(
  USERNAME   VARCHAR2(50 BYTE) NOT NULL,
  AUTHORITY  VARCHAR2(50 BYTE) NOT NULL,
  constraint fk_authorities_users foreign key(username) references users(username)
);

/*-------- CREATE MD5-------------*/
CREATE OR REPLACE FUNCTION MD5HASH (str IN VARCHAR2)
RETURN VARCHAR2
IS v_checksum VARCHAR2(32);
BEGIN
        v_checksum := LOWER( RAWTOHEX( UTL_RAW.CAST_TO_RAW( sys.dbms_obfuscation_toolkit.md5(input_string => str) ) ) );
        RETURN v_checksum;
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
            NULL;
        WHEN OTHERS THEN
            -- Consider logging the error and then re-raise
        RAISE;
END MD5HASH;
/* ---- TRIGER to HASH MD5-----*/
DROP TRIGGER HASINGPASSWORD;
CREATE OR REPLACE TRIGGER "HASINGPASSWORD" 
BEFORE INSERT OR UPDATE OF PASSWORD
ON USERS
REFERENCING NEW AS NEW OLD AS OLD
FOR EACH ROW
declare 
    encr_pass varchar2(255);
BEGIN  
      :new.PASSWORD := md5hash(:new.PASSWORD) ;
END;

INSERT INTO USERS(USERNAME,PASSWORD,FULLNAME,EMAIL,ENABLED)
VALUES ('thaihv','thaihv','Hoang Vinh Thai', 'thaihv@uitgis.com', 1);
INSERT INTO USERS(USERNAME,PASSWORD,FULLNAME,ADDRESS,EMAIL,ENABLED)
VALUES ('admin','admin','James Crafts','New York City' ,'jamescrafts@gmail.com', 1);
INSERT INTO AUTHORITIES (USERNAME, AUTHORITY)
VALUES ('thaihv', 'ROLE_USER');
INSERT INTO AUTHORITIES (USERNAME, AUTHORITY)
VALUES ('thaihv', 'ROLE_ADMIN');
INSERT INTO AUTHORITIES (USERNAME, AUTHORITY)
VALUES ('admin', 'ROLE_ADMIN');
/* Authorities and anthority groups */

CREATE TABLE GROUPS
(
  ID          NUMBER(5) PRIMARY KEY,
  GROUP_NAME  VARCHAR2(50 BYTE) NOT NULL
);
CREATE TABLE GROUP_AUTHORITIES
(
  GROUP_ID   NUMBER(5) NOT NULL,
  AUTHORITY  VARCHAR2(50 BYTE) NOT NULL,
  constraint fk_group_authorities_group foreign key(group_id) references groups(id)
);
CREATE TABLE GROUP_MEMBERS
(
  ID        NUMBER(5) PRIMARY KEY,
  USERNAME  VARCHAR2(50 BYTE) NOT NULL,
  GROUP_ID  NUMBER(5) NOT NULL,
  constraint fk_group_members_group foreign key(group_id) references groups(id)
);


create sequence groups_seq
minvalue 0
maxvalue 99999
start with 0
increment by 1
cache 20;

create sequence group_members_seq
minvalue 0
maxvalue 99999
start with 0
increment by 1
cache 20;

create or replace trigger groups_trg
  before insert on groups  
  for each row
declare
begin
  select groups_seq.nextval into :NEW.id from dual;
end groups_trg;

create or replace trigger group_members_trg
  before insert on group_members  
  for each row
declare
begin
  select group_members_seq.nextval into :NEW.id from dual;
end group_members_trg;


CREATE TABLE persistent_logins (
    username varchar(64) not null,
    series varchar(64) not null,
    token varchar(64) not null,
    last_used timestamp not null,
    PRIMARY KEY (series)
);

/* ACL */

CREATE TABLE acl_sid (
    id NUMBER(38) NOT NULL PRIMARY KEY,
    principal NUMBER(1) NOT NULL CHECK (principal in (0, 1)),
    sid NVARCHAR2(100) NOT NULL,
    CONSTRAINT unique_acl_sid UNIQUE (sid, principal)
);
CREATE SEQUENCE acl_sid_sequence START WITH 1 INCREMENT BY 1 NOMAXVALUE;
CREATE OR REPLACE TRIGGER acl_sid_id_trigger
    BEFORE INSERT ON acl_sid
    FOR EACH ROW
BEGIN
    SELECT acl_sid_sequence.nextval INTO :new.id FROM dual;
END;

CREATE TABLE acl_class (
    id NUMBER(38) NOT NULL PRIMARY KEY,
    class NVARCHAR2(100) NOT NULL,
    CONSTRAINT uk_acl_class UNIQUE (class)
);
CREATE SEQUENCE acl_class_sequence START WITH 1 INCREMENT BY 1 NOMAXVALUE;
CREATE OR REPLACE TRIGGER acl_class_id_trigger
    BEFORE INSERT ON acl_class
    FOR EACH ROW
BEGIN
    SELECT acl_class_sequence.nextval INTO :new.id FROM dual;
END;

CREATE TABLE acl_object_identity (
    id NUMBER(38) NOT NULL PRIMARY KEY,
    object_id_class NUMBER(38) NOT NULL,
    object_id_identity NUMBER(38) NOT NULL,
    parent_object NUMBER(38),
    owner_sid NUMBER(38),
    entries_inheriting NUMBER(1) NOT NULL CHECK (entries_inheriting in (0, 1)),
    CONSTRAINT uk_acl_object_identity UNIQUE (object_id_class, object_id_identity),
    CONSTRAINT fk_acl_object_identity_parent FOREIGN KEY (parent_object) REFERENCES acl_object_identity (id),
    CONSTRAINT fk_acl_object_identity_class FOREIGN KEY (object_id_class) REFERENCES acl_class (id),
    CONSTRAINT fk_acl_object_identity_owner FOREIGN KEY (owner_sid) REFERENCES acl_sid (id)
);
CREATE SEQUENCE acl_object_identity_sequence START WITH 1 INCREMENT BY 1 NOMAXVALUE;
CREATE OR REPLACE TRIGGER acl_object_identity_id_trigger
    BEFORE INSERT ON acl_object_identity
    FOR EACH ROW
BEGIN
    SELECT acl_object_identity_sequence.nextval INTO :new.id FROM dual;
END;

CREATE TABLE acl_entry (
    id NUMBER(38) NOT NULL PRIMARY KEY,
    acl_object_identity NUMBER(38) NOT NULL,
    ace_order INTEGER NOT NULL,
    sid NUMBER(38) NOT NULL,
    mask INTEGER NOT NULL,
    granting NUMBER(1) NOT NULL CHECK (granting in (0, 1)),
    audit_success NUMBER(1) NOT NULL CHECK (audit_success in (0, 1)),
    audit_failure NUMBER(1) NOT NULL CHECK (audit_failure in (0, 1)),
    CONSTRAINT unique_acl_entry UNIQUE (acl_object_identity, ace_order),
    CONSTRAINT fk_acl_entry_object FOREIGN KEY (acl_object_identity) REFERENCES acl_object_identity (id),
    CONSTRAINT fk_acl_entry_acl FOREIGN KEY (sid) REFERENCES acl_sid (id)
);
CREATE SEQUENCE acl_entry_sequence START WITH 1 INCREMENT BY 1 NOMAXVALUE;
CREATE OR REPLACE TRIGGER acl_entry_id_trigger
    BEFORE INSERT ON acl_entry
    FOR EACH ROW
BEGIN
    SELECT acl_entry_sequence.nextval INTO :new.id FROM dual;
END;
