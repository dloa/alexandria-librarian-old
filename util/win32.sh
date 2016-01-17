#!/bin/bash

grunt release --arch=ia32 --platform=win32 && makensis -v3 ./win32/installer_makensis_ia32.nsi;
