(function (global) {
    var viewModel,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        isAdded: false,
        photoTitle: "",
        imageUrl: "",
        _imageBase64: "",
        description:"",
        content:"",
        author:"",
        postTitle:"",
        capture: function () {
            var that = this;
            
            navigator.camera.getPicture(function(url) {
                that.set("imageUrl", "data:image/png;base64," + url);
                that._imageBase64 = url;
            }, function() {
                navigator.notification.alert(JSON.stringify(arguments));
            }, {
                quality: 80,
                destinationType: navigator.camera.DestinationType.DATA_URL
            });
        },
        savePhoto: function () {
            var that = this;
            if (this.photoTitle.length < 5 || this.photoTitle.length > 60) {
                navigator.notification.alert("Title should be in range between 5 to 60 letters.");
                return;
            }
            
            cordovaExt.getLocation()
            .then(function(location) {
                that.location =location;
            app.application.showLoading();
                Everlive.$.Files.create({
                    "Filename": that.photoTitle,
                    "ContentType": "image/png",             
                    "base64": that._imageBase64
                }).then(function (data) {
                    console.log(data);
                    return data.result.Uri;
                }, function (error) {
                    navigator.notification.alert("dasdasdsad" + JSON.stringify(error));
                }).then(function (imgUrl) {
                    var loc = new Everlive.GeoPoint(parseFloat(that.location.coords.longitude),parseFloat(that.location.coords.latitude));
                    
                    alert(JSON.stringify(loc));
                    Everlive.$.data("Photos")
                    .create({
                        ImageUrl: imgUrl,
                        Title: that.photoTitle,
                        Description: that.description || "no description",
                        Geolocation: loc,
                    }).then(function () {
                        app.application.hideLoading();
                    }, function (error) {
                        navigator.notification.alert(JSON.stringify(error));
                    });
                });
            
                
            });
        },
        savePost: function () {
            var that = this;
            if (this.postTitle.length < 5 || this.postTitle.length > 60) {
                navigator.notification.alert("Title should be in range between 5 to 60 letters.");
                return;
            }
            if (this.content.length < 15) {
                navigator.notification.alert("The description should be more than 15 letters.");
                return;
            }

            app.application.showLoading();
            Everlive.$.data("Posts")
            .create({
                Title: that.postTitle,
                Author: that.author || "anonymous",
                Content: that.content,
            }).then(function () {
                app.application.hideLoading();
            }, function (error) {
                navigator.notification.alert(JSON.stringify(error));
            });
        }
    });

    app.add = {
        viewModel: viewModel
    };
})(window);