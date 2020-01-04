# -*- coding: utf-8 -*-
import json
import uuid
import random

from aliyunsdkdysmsapi.request.v20170525 import SendSmsRequest
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.profile import region_provider
from config import config
Conf = config.get('message')

acs_client = AcsClient(Conf.get('ACCESS_KEY_ID'), Conf.get('ACCESS_KEY_SECRET'), Conf.get('REGION'))
region_provider.add_endpoint(Conf.get('PRODUCT_NAME'), Conf.get('REGION'), Conf.get('DOMAIN'))


def send_sms(business_id, phone_numbers, sign_name, template_code, template_param=None):
    smsRequest = SendSmsRequest.SendSmsRequest()
    smsRequest.set_TemplateCode(template_code)

    if template_param is not None:
        smsRequest.set_TemplateParam(template_param)

    smsRequest.set_OutId(business_id)
    smsRequest.set_SignName(sign_name)
    smsRequest.set_PhoneNumbers(phone_numbers)
    smsResponse = acs_client.do_action_with_exception(smsRequest)

    return smsResponse


def send_phone_code(phone):
    __business_id = uuid.uuid1()
    code = random.randint(100000, 999999)
    params = {'code': code}
    # payload = send_sms(__business_id, phone, "Duobit", "SMS_137185092", params)
    payload = send_sms(__business_id, phone, "山泉", "SMS_152655055", params)

    payload = json.loads(payload)
    payload = {
      "code": payload["Code"],
      "message": payload["Message"],
      "phone": phone,
      "phone_code": code
    }
    return payload
