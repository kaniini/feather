# feather

Feather is a [Pleroma](http://pleroma.social) frontend which resembles Facebook and Diaspora.

![Screenshot](https://i.imgur.com/YgCx2Z3.jpg)

## Registering the OAuth App

``` bash
curl -XPOST -F client_name=Feather -F redirect_uris=urn:ietf:wg:oauth:2.0:oob -F 'scopes=read write follow' https://your.pleroma.instance/api/v1/apps
```

## Building

Real instructions coming soon

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
