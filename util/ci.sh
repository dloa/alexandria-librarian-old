#!/bin/bash

npm prune && npm install --no-optional;
grunt clean:all && mkdir release;
grunt release --arch=x64 --platform=win32 && makensis -v4 util/win32/installer_makensis_ia32.nsi;
