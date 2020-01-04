import json
import importlib.util
import os

from jinja2.utils import import_string

from config import basedir


class SetupPlugins(object):
    def __init__(self):
        self.plugins_config_file = '.arrplat.json'
        self.base_path = basedir
        self.plugins_path = self.pluginsInfo()['plus_base_path']
        # self.source_venv = os.system(f'source {basedir}/venv/bin/activate')

    def installDependency(self):
        """
        安装依赖
        扫描plugins下所有文件夹，判断每个插件是否有req.txt文件 如果有就需要安装req.txt依赖
        :return:
        """
        plugins = os.listdir(self.plugins_path)
        for plugin in plugins:
            each_path = f'{self.plugins_path}{plugin}'
            if 'requirements.txt' in os.listdir(each_path):
                os.system(f'pip install -r {each_path}/requirements.txt')

    def installBlueprint(self, app):
        """
          批量导入蓝图，注册蓝图
              遍历所有的文件夹
              再拼接字符串，利用import_string导入蓝图
              最后再注册蓝图
        """

        for plugin in self.pluginsInfo()['plus_list']:
            if os.path.exists(self.plugins_path + plugin['path'] + '/controller/urls.py'):
                bp = import_string(f'plugins.{plugin["path"]}.controller.urls.blueprint')
                app.register_blueprint(bp, url_prefix=f'/{plugin["apiRoute"]}')

    def installModels(self):
        """
        动态导入models，相当于导包，将所有模块的models文件找到，动态导入
        1. 获取插件根目录
        :return:
        """
        # 插件根目录
        plus_about = self.pluginsInfo()
        plugins_base_path = plus_about['plus_base_path']
        plus_list = plus_about['plus_list']
        # 所有的插件
        for plus in plus_list:
            if os.path.isdir(plugins_base_path + plus['path']):
                if 'models' in os.listdir(plugins_base_path + plus['path']):
                    plus_item_all_models_file = os.listdir(plugins_base_path + plus['path'] + '/models')
                    for count, plus_item_models in enumerate(plus_item_all_models_file):
                        if '.py' not in plus_item_models:
                            plus_item_all_models_file.pop(count)
                        else:
                            print(f'引入models{plus["path"]}')
                            importlib.import_module(f'plugins.{plus["path"]}.models.{plus_item_models.split(".")[0]}')

    def pluginsInfo(self):
        """
        读取json配置文件，查找到所有的插件信息
        :return:
        """
        with open(self.plugins_config_file, 'r', encoding='utf-8') as f:
            file = json.loads(f.read())

        name = file['name']
        description = file['description']
        plus = file['plus']['plus']
        plus_base_path = file['plus']['plusDir']

        context = {
            'name': name,
            'des': description,
            'plus_list': plus,
            'plus_base_path': plus_base_path,
        }
        return context


if __name__ == '__main__':
    SetupPlugins = SetupPlugins().installModels()
