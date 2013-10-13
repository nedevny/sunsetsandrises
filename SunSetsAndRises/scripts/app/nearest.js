(function(global) {
    var viewModel,
    app = global.app = global.app || {};
    
    viewModel = kendo.observable({
        nearest: [],
        currentPhoto: {},
        show: function () {
            var that = this.model;
            var interval = setInterval(function () {
                // wait until application is loaded...
                if (app.application) {
                    that._show();
                    clearInterval(interval);
                }
            }, 100);
        },
        _show: function () {
            app.application.showLoading();
            cordovaExt.getLocation()
            .then(function(location) {
                
                var query = new Everlive.Query();
                query.where().nearSphere('Geolocation',
                [parseFloat(location.coords.longitude),parseFloat(location.coords.latitude)], 50,'km');
                
                var data = Everlive.$.data('Photos');
                data.get(query)
                    .then(function(data){
                        app.application.hideLoading();
                        viewModel.set("nearest", data.result);
                    },
                    function(error){
                        app.application.hideLoading();
                        alert(JSON.stringify(error));
                    });
                
                
            });
        },
    });

    app.nearest = {
        viewModel: viewModel
    };
    
})(window);