#!/bin/bash

npm prune && npm install --no-optional;
grunt clean:all && mkdir release;

chmod +x ./win32.sh && ./win32.sh
