import time
import re
import json
import uuid
import decimal

from flask import make_response


def generate_uuid():
    return str(uuid.uuid4()).replace("-", "")


def get_timestamp(is_ms=False):
    current_timestamp = time.time()
    return int(current_timestamp) if not is_ms else int(current_timestamp * 1000)


def valid_email(email):
    return True if re.match(r'^[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}$', email) else False


def valid_phone(phone):
    phone_rule = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$"
    return True if re.match(phone_rule, phone) else False


def valid_phone_code(phone_code):
    return True if len(phone_code) == 6 and phone_code.isdigit() else False


def valid_uuid(input_uuid, has_connect=False):
    if has_connect:
        pattern = r'^\w{8}(-\w{4}){3}-\w{12}'
    else:
        pattern = r'^\d|a|b|c|d|e{32}'
    return True if re.match(pattern, input_uuid) else False


def valid_url(url):
    pattern = r"http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"
    return True if re.match(pattern, url) else False


def valid_host(host):
    pattern = r"^http[s]{0,1}://(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
    return True if re.match(pattern, host) else False


def valid_boolean(value):
    return True if value in [0, 1] else False


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)


class JsonResponse(object):
    def __init__(self, data, page, message):
        self.data = data
        self.message = message
        self.page = page

        if page:
            self.page = {
                'previous_page': page.previous_page,
                'has_previous': page.has_previous,
                'page': page.page,
                'total': page.total,
                'page_size': page.page_size,
                'next_page': page.next_page,
                'has_next': page.has_next,
            }


def json_response(data: list or dict or None = None, page=None, message=None, status=200):
    status_dict = {
        200: '200 OK',
        401: '401 Unauthorized',
        403: '403 Forbidden',
        404: '404 Not Found',
        409: '409 Resource Exist',
        422: '422 Unprocessable Entity',
        500: '500 Internal Server Error',
    }
    res = make_response(JsonResponse(data, page, message).__dict__)
    res.status = status_dict[status]
    return res

# TODO 建表前缀问题
# from sqlalchemy.ext.declarative import declared_attr
# import inspect, sys
# class T(db.Model):
#   __abstract__ = True
#   _the_prefix = 'someprefix_'
#
#   @declared_attr
#   def __tablename__(cls):
#     return cls._the_prefix + cls.__incomplete_tablename__
