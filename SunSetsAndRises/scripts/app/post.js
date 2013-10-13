(function (global) {
    var viewModel,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        title: "",
        author:"",
        content: "",
        open: function (e) {
            viewModel.set("author", e.view.params.author);
            viewModel.set("title", e.view.params.title);
            viewModel.set("content", e.view.params.content);
        }
    });

    app.post = {
        viewModel: viewModel
    };
})(window);