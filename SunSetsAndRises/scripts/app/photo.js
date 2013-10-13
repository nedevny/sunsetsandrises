(function (global) {
    var viewModel,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        title: "",
        description:"",
        imageUrl: "",
        open: function (e) {
            viewModel.set("description", e.view.params.description);
            viewModel.set("title", e.view.params.title);
            viewModel.set("imageUrl", e.view.params.imageUrl);
        }
    });

    app.photo = {
        viewModel: viewModel
    };
})(window);