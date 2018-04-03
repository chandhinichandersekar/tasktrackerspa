#!/bin/bash

export PORT=5421

cd ~/www/tasktrackerspa
./bin/tasktrackerspa stop || true
./bin/tasktrackerspa start
