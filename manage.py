from click._unicodefun import click
from flask_script import Manager, Command
from flask_migrate import Migrate, MigrateCommand
from arrplat.app import app, db


Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


# @manager.option('-a', dest='all', help='all app', default='all')
# # @manager.option('-p', dest='pwd', help='you password', default='')
# def arrplat(**kwargs):
#     all = kwargs.get('all')
#     # pwd = kwargs.get('pwd')
#     print(f'name:{all}')

if __name__ == '__main__':
    manager.run()
