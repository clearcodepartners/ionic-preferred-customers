# Preferred Customer - Ionic

Check this out from git and then run:

```
$ brew install cairo
$ npm install
$ ionic platform add ios
$ ionic platform add android
$ ionic build ios
$ ionic build android
```

The ONLY files you edit are in /src/, everything else is generated.

The directory to open in Xcode to work with the ios app is:

/platforms/ios/PreferredCustomer.xcodeproj

To implement changes made in src you must build the project for each platform.  Example:

```
$ ionic build ios
$ ionic build android
```

Then you can work with it in Xcode.

More documentation here: http://ionicframework.com/docs/