#!/bin/bash

export PORT=5421
export MIX_ENV=prod
export GIT_PATH=/home/tasktrackerspa/src/tasktrackerspa

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "tasktrackerspa" ]; then
	echo "Error: must run as user 'tasktrackerspa'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/tasktrackerspa ]; then
	echo mv ~/www/tasktrackerspa ~/old/$NOW
	mv ~/www/tasktrackerspa ~/old/$NOW
fi

mkdir -p ~/www/tasktrackerspa
REL_TAR=~/src/tasktrackerspa/_build/prod/rel/tasktrackerspa/releases/0.0.1/tasktrackerspa.tar.gz
(cd ~/www/tasktrackerspa && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/tasktrackerspa/src/tasktrackerspa/start.sh
CRONTAB

#. start.sh
