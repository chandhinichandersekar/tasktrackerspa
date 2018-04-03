#!/bin/bash

export PORT=5620

cd ~/www/tasktrackerspa
./bin/tasktrackerspa stop || true
./bin/tasktrackerspa start
