#!/bin/bash

npm prune && npm install --no-optional;
grunt clean:all && mkdir release;

chmod +x util/win32.sh && util/win32.sh
