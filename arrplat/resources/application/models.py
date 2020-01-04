from sqlalchemy import Column, Integer, \
    ForeignKey, DateTime, \
    FLOAT, BigInteger, SMALLINT, CHAR, VARCHAR, Text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import relationship, backref

from extensions import db
from arrplat.resources.organization.models import Organization
from arrplat.common.utils import generate_uuid


class Application(db.Model):
    __tablename__ = 'application'
    id = Column(VARCHAR(32), default=generate_uuid, primary_key=True)
    name = Column(VARCHAR(32), nullable=False, unique=True, comment='官方唯一的名')
    title = Column(VARCHAR(32), nullable=True, comment='不唯一的名')
    description = Column(Text)
    official_website = Column(Text, comment='应用官方地址')
    install_number = Column(Integer, default=0)
    version = Column(VARCHAR(32))
    icon = Column(Text, comment='icon')
    head_image = Column(Text, comment='头像')
    visible = Column(TINYINT, comment='是否可用')
    deletable = Column(TINYINT, comment='是否可删除')
    is_official = Column(TINYINT, comment='是否是官方的')
    images = Column(Text, comment='应用介绍图片')
    sort = Column(Integer, comment='app排序')
    api_route = Column(VARCHAR(128), comment='api路由')
    admin_route = Column(VARCHAR(128), comment='admin路由')
    create_time = Column(BigInteger)
    application_category_id = Column(VARCHAR(32), ForeignKey('application_category.id'), comment='应用类别')



class OrgApplication(db.Model):
    __tablename__ = 'org_application'

    id = Column(VARCHAR(32), default=generate_uuid, primary_key=True)
    organization_id = Column(VARCHAR(32), ForeignKey('organization.id', ondelete="CASCADE"), comment='组织id')
    application_id = Column(VARCHAR(32), ForeignKey('application.id', ondelete="CASCADE"), comment='应用id')
    expire_date = Column(DateTime)
    status = Column(TINYINT, comment='是否启用')

    application = relationship('Application', backref=backref('org_application', cascade='all,delete'), lazy='select')
    organization = relationship('Organization', backref=backref('org_application', cascade='all,delete'), lazy='select')


class ApplicationMenus(db.Model):
    __tablename__ = 'application_menus'
    id = Column(VARCHAR(32), default=generate_uuid, primary_key=True)
    application_id = Column(VARCHAR(32), ForeignKey('application.id', ondelete='CASCADE'), comment='应用id')
    name = Column(VARCHAR(32), comment='菜单名称')
    icon = Column(Text, comment='小图标路径')
    link = Column(Text, comment='菜单的链接')
    application = relationship('Application', backref=backref('menus'))


class Message(db.Model):
    __tablename__ = 'message'

    id = Column(VARCHAR(32), default=generate_uuid, primary_key=True)
    title = Column(VARCHAR(128))
    content = Column(Text)
    send_time = Column(BigInteger)
    read_time = Column(BigInteger)
    is_read = Column(TINYINT, comment='是否已读(0. 否 1. 是)', default=0)
    message_type = Column(TINYINT, comment='消息类型(1. system系统 2. plus插件 3. org组织 4. invitee邀请)')
    application_id = Column(VARCHAR(32), ForeignKey('application.id', ondelete='CASCADE'), comment='应用id')
    organization_id = Column(VARCHAR(32), ForeignKey('organization.id', ondelete='CASCADE'), comment='组织id')
    user_id = Column(VARCHAR(32), ForeignKey('user.id', ondelete='CASCADE'), comment='员工id')

    user = relationship('User', backref=backref('message'))


class ApplicationCategory(db.Model):
    __tablename__ = 'application_category'

    id = Column(VARCHAR(32), default=generate_uuid, primary_key=True)
    name = Column(VARCHAR(32), comment='类别名')
    application_category = relationship('Application', backref=backref('application_category'))
