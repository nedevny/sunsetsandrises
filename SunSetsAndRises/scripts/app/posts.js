(function(global) {
    var viewModel,
    app = global.app = global.app || {};
    
    viewModel = kendo.observable({
        posts: [],
        currentPost: {},
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
            Everlive.$.data('Posts')
            .get()
            .then(function(data){
                app.application.hideLoading();
                viewModel.set("posts", data.result);
            },
            function(error){
                app.application.hideLoading();
                alert(JSON.stringify(error));
            });
        },
    });

    app.posts = {
        viewModel: viewModel
    };
    
})(window);