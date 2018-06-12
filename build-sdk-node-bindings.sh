rm -rf sdk-node-bindings
git clone git@bitbucket.org:highmobility/sdk-node-bindings.git
cd sdk-node-bindings
git checkout multi_inst
git submodule update --init --recursive
npm install

