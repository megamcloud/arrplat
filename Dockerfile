FROM arrplat-base

RUN yarn config set unsafe-perm true
RUN npm config set unsafe-perm true
RUN SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/

WORKDIR /app

RUN lerna bootstrap
RUN yarn run build
#
#RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000
EXPOSE 5000

CMD [ "yarn", "start"]
