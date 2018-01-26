rm -rf sdk-node-bindings
git clone git@bitbucket.org:highmobility/sdk-node-bindings.git
cd sdk-node-bindings
git checkout BC-105
git submodule update --init --recursive
npm install
