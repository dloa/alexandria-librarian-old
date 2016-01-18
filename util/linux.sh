#!/bin/bash

grunt release --arch=ia32 --platform=linux && grunt shell:packageDEB --arch=ia32
