## Vcash Electron UI
Multi-platform UI for [Vcash](https://vcash.info/), a decentralized currency for the internet. Latest releases can be found [here](https://github.com/whphhg/vcash-electron/releases).

:hatching_chick: **Warning**: This is beta software that is being actively developed.

![Screenshots](http://i.imgur.com/zfjel56.gif)

### Installing from source
The following dependencies are required to be installed:
* latest version of [Vcash](https://vcash.info/wallets.php)
* latest version of [Node.js](https://nodejs.org/en/download/current/) ([Ubuntu users](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions))
* git

Clone this repository using ``git clone``, move to the cloned directory using ``cd vcash-electron`` and install Node.js dependencies using ``npm install``.

    $ git clone https://github.com/whphhg/vcash-electron.git
    $ cd vcash-electron
    $ npm install

After it is done installing dependencies, you can run the ui using ``npm run ui``.

    $ npm run ui

Alternatively, if you want to use development tools, run the ui using ``npm run dev``, or ``npm run dev-win`` if you are on Windows.

    $ npm run dev (Linux and OS X)
    $ npm run dev-win (Windows)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
