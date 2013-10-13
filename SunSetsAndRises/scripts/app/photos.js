(function(global) {
    var viewModel,
    app = global.app = global.app || {};
    
    viewModel = kendo.observable({
        photos: [],
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
            Everlive.$.data('Photos')
            .get()
            .then(function(data){
                app.application.hideLoading();
                viewModel.set("photos", data.result);
            },
            function(error){
                app.application.hideLoading();
                alert(JSON.stringify(error));
            });
        },
    });

    app.photos = {
        viewModel: viewModel
    };
    
})(window);