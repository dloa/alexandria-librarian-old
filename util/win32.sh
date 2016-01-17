#!/bin/bash

grunt release --arch=x64 --platform=win32 && makensis -v3 ./win32/installer_makensis_ia32.nsi;
