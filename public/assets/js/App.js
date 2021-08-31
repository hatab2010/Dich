let setting = {}

function Application(setting) {
    let _this = this;
    //let currentPage = "index";

    this.script = new Script();
    this.import = function (path, callback) {


    }
}

function Script() {
    let importLibs = [];
    let loadLibraryIndex = 0;
    let isImportProcessFinished = true;

    this.onScriptLoad = function (data) {

    }
    this.import = function (path) {
        importScriptPaths.push(new Library(path))

        //return if import process is not finished
        if (importLibs.length > 2){
            return;
        }

        (function process(library) {
            let script = document.createElement("script");
            script.src = script.src(importScriptPaths[loadLibraryIndex]);
            script.addEventListener("load", function () {
                if (callback)
                    callback();
            })
        })();
    }
}

class ScriptLibrary extends Library{

}

class Library{
    constructor(path) {
        let levels = path.split("/");
        this.name = levels[levels.length - 1];
        this.path = path;
        return this;
    }

    _name = null;
    get name(){
        return this._name;
    }

    _path = null;
    get path(){
        return this._path;
    }

    _absolutePath = null;
    get absolutePath(){
        return throw "Not implemented exception";
    }
}