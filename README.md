# Yume UI theme for PWA-Studio

## Installation Environment

### For Linux System

#### Required install node ~12.x

```bash
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs
```


#### Required install yarn 1.2x.x

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```
### For Window System
#### Required Node 12.x download
[Node 12.x download](https://nodejs.org/dist/latest-v12.x/win-x64/node.exe)

#### Required Yarn 1.2x.x download
[Yarn 1.2x.x download](https://classic.yarnpkg.com/latest.msi)

### For MacOS System
#### Required Node 12.x download
[Node 12.x download](https://nodejs.org/dist/latest-v12.x/node-v12.20.0.pkg)

#### Required Yarn 1.2x.x download

##### Installed homebrew first

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
```
after that
```bash
brew install yarn
```


## Check Environment

Check node version 
```bash
node -v 
```
Check yarn version 
```bash
yarn -v 
```


## Install Yume UI project

Step 1: 

- Download source PWA Studio Project


[PWA studio 8.0 release link](https://github.com/magento/pwa-studio/releases/tag/v8.0.0) (scroll down to see assets link)

Step 2: 

- Copy and replace all Yume theme project to PWA studio project one by one

#### be careful with copy and replace (yume-scripts.js, extensions folder)



Step 3:
- Go to PWA-studio root directory
```bash
yarn install
```

## Run Yume theme
- Go to PWA-studio root directory
```bash
node yume-scripts
```

Run with success go to 

#### Local develop : [localhost:10000](http://localhost:10000)

#### GraphQL link : [localhost:10000/graphiql](http://localhost:10000/graphiql)


## Updating ... 

### Bundle theme for production
- go to PWA-studio root directory
```bash
yarn workspace @landofcoder/yume-ui run build
```

### Add custom plugin to yume theme
- go to yume-ui folder (packages/extensions/yume-ui) in PWA-sudio directory
```bash
yarn add 'plugin-name' -D
```
- update packages for theme again
```bash
yarn install
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## PWA studio
[PWA studio](https://github.com/magento/pwa-studio/blob/develop/LICENSE.txt)