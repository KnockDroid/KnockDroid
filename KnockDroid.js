class KnockDroid{
	constructor(){
		let self = this;

        self.config = {
            file : "",
            host : ""
        }

        self.modules = {
            /**
             key : {
                file : host + "location/config.js"
                container : LayoutObject,
                model : ModelForView,
                routes : false || {
                    path : {
                        file : host + location + "file.js",
                        view : LayoutObject,
                        model : {}
                    }
                }
             }
             */
        }

        self.active = {
            module : "",
            route : ""
        }

        self.defaults = {
            module : null,
            route : null,
            regex : {
                obs : /<(.*?)>/g
            }
        }
	}

    configure( file, host ){
        let self = this;
        self.config.host = host ? host : "";
        self.config.file = host + file + ".js";
        return new Promise(
            (Resolve, Reject)=>{
                require( 
                    [self.config.file],
                    (modules)=>{
                        modules.forEach(m=>{
                            let file = self.config.file.split("/");
                            file.pop();
                            self.modules[m.key] = {
                                file : file.join("/") + "/" + m.file + ".js",
                                view : null,
                                container : null,
                                model : null,
                                routes : {}
                            }
                            if( m.default )
                                self.defaults.module = m.key
                        });
                        Resolve();
                    }
                );
            }
        );
    }

    start(){
        let self = this;
        let moduleKey = self.getUrlParam().module;
        if( !moduleKey ){
            self.navigateModule( self.defaults.module );
        }else{
            self.active.module = moduleKey;
            self.loadModule(moduleKey);
        }
    }

    navigateModule( key ){
        window.location = "?module=" + key
    }

    navigateRoute( path ){
        let self = this;
        path = path ? path : self.routes.default;
        window.location = "#/" + path
    }

    loadModule( key ){
        let self = this;
        if( !self.modules[key] )
            app.ShowPopup( "404 Module not found" );
        else{
            let file = self.modules[key].file;
            require(
                [file],
                (vm)=>{
                    vm.model.$kids = {};
                    self.modules[key].model = vm.model;
                    self.render( self.modules[key], vm );
                    if( vm.routes ){
                        vm.routes.forEach(r=>{
                            let rFile = self.modules[key].file.split( "/" );
                            rFile.pop();
                            self.modules[key].routes[r.path] = {
                                file : rFile.join('/') + '/' + r.file + '.js',
                                view : null,
                                model : null
                            }
                            if( r.default )
                                self.defaults.route = r.path;
                        });
                        self.activateRoute( self.defaults.route );
                    }
                }
            );
        }
    }

    activateRoute( path ){
        let self = this;
        window.onhashchange = function(){
            self.parse();
        }
        path = path ? path : self.defaults.route;
        window.location = "#/" + path;
    }

    parse(){
        let self = this;
        let hash = window.location.hash.replace("#/", "");
        self.loadRoute( hash );
    }

    loadRoute( hash ){
        let self = this;
        let mod = self.modules[self.active.module];
        if( !mod.routes[hash] )
            return app.ShowPopup( "404 route not found" );
        else{
            let route = mod.routes[hash];
            if( !route.view ){
                app.ShowProgress("loading...");
                require(
                    [route.file],
                    (vm)=>{
                        app.HideProgress("loading...");
                        self.render( route, vm, mod.container.ui );
                        self.showRoute( hash );
                    }
                );
            }else{
                self.showRoute( hash );
            }
        }
    }

    showRoute( hash ){
        let self = this;
        let mod = self.modules[self.active.module]
        if( mod.routes[self.active.route] ){
            mod.routes[self.active.route].view.ui.Animate( "FadeOut" );
        }
        mod.routes[hash].view.ui.Animate( "FadeIn" );
        self.active.route = hash;
    }

    render( data, vm, parent ){
        let self = this;
        data.model = vm.model;
        data.model.$kids = {};
        let layout = vm.view.Layout;
        data.view = new kdUI( "Layout", layout, {} );
        data.view.ui.SetVisibility( "Hide" );
        if( parent )
            parent.AddChild( data.view.ui );
        else{
            app.AddLayout( data.view.ui );
        }
        self.renderKids( vm.view.Layout.kids, data.model, data.view.ui, data.model.$kids, data );
        data.view.ui.Animate( "FadeIn" );
    }
    
    renderKids( kids, model, parent, kidsContainer, parentObject ){
        let self = this;
        let tmp;
        let id;
        for( let k in kids ){
            if( k=="Container" ){
                parentObject.container = new kdUI( "Layout", kids[k], {} );
                parent.AddChild( parentObject.container.ui );
            }else{
                tmp = kids[k];
                id = self.getID();
                kidsContainer[id] = new kdUI( k, kids[k], model );
                parent.AddChild( kidsContainer[id].ui );
                if( tmp.kids )
                    self.renderKids( tmp.kids, model, kidsContainer[id].ui, kidsContainer, parentObject );
            }
        }
    }

    error( code, msg ){
        app.ShowPopup( code + " Error : " + msg );
    }

    getID(){
        let self = this;
        return "auto_generated_" + (self.config.idCounter++);
    }

    parseText( ui, model ){
        let self = this;
        let text = ui.text;
        ui.obs.forEach(o=>{
            text = text.split( '<'+o+'>' ).join( model[o]() );
        });
        return text;
    }

    getTextMethod( uiKey ){
        switch( uiKey ){
            case "AppBar":
                return {
                    set : "SetTitleText"
                };
            break;
            default:
                return {
                    set : "SetText",
                    get : "GetText"
                }
            break;
        }
    }

    getUrlParam(url) {
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        var obj = {};
        if (queryString) {
          queryString = queryString.split('#')[0];
          var arr = queryString.split('&');
          for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
            if (paramName.match(/\[(\d+)?\]$/)) {
              var key = paramName.replace(/\[(\d+)?\]/, '');
              if (!obj[key]) obj[key] = [];
              if (paramName.match(/\[\d+\]$/)) {
                var index = /\[(\d+)\]/.exec(paramName)[1];
                obj[key][index] = paramValue;
              } else {
                obj[key].push(paramValue);
              }
            } else {
              if (!obj[paramName]) {
                obj[paramName] = paramValue;
              } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                obj[paramName] = [obj[paramName]];
                obj[paramName].push(paramValue);
              } else {
                obj[paramName].push(paramValue);
              }
            }
            }
        }
        return obj;
    }

}


class kdUI{
    constructor(uiKey, uiData, model){
        let self = this;
        self.ui = MUI["Create" + uiKey]( ...uiData.init );
        if( uiData.methods ){
            for( let m in uiData.methods ){
                if( typeof uiData.methods[m] =="object" )
                    self.ui[m]( ...uiData.methods[m] );
                else
                    self.ui[m]( uiData.methods[m] );
            }
        }
        if( uiData.bind ){
            let textMethod = self.getTextMethod(uiKey);
            self.bind = {}
            for( let b in uiData.bind ){
                switch( b ){
                    case "text":
                        self.bind.text = {
                            value : uiData.bind.text,
                            obs : []
                        };
                        let obs = self.ui.text.matchAll( self.regex.obs );
                        for( let obsName of obs ){
                            self.bind.text.obs.push( obsName[1] );
                            if( model[obsName[1]] ){
                                model[obsName[1]].subscribe( newVal=>{
                                    self.ui[textMethod.set]( self.parseText( self.bind.text, model ) );
                                } );
                            }
                        }
                        self.ui[textMethod.set]( self.parseText( self.bind.text, model ) );
                    break;
                    case "computed":
                        self.bind.computed = uiData.bind.computed;
                        if( !model[self.bind.computed] ){
                            app.ShowPopup( "Model does not contains observable : " + self.bind.computed );
                        }else{
                            model[self.bind.computed].subscribe( function( newVal ){
                                self.ui[textMethod.set]( newVal );
                            } );
                            self.ui[textMethod.set]( model[self.bind.computed]() );
                        }
                    break;
                    case "value":
                        let val = uiData.bind.value;
                        model[val.obs].subscribe( newVal=>{
                            if(self.ui[textMethod.get]()!=model[val.obs]())
                            self.ui[textMethod.set]( model[val.obs]() );
                        } );
                        self.ui[textMethod.set]( model[val.obs]() );
                        //Two way
                        self.ui[val.ev]( ()=>{
                            model[val.obs](self.ui[textMethod.get]());
                        } );
                    break;
                    case "event":
                        for( let e in uiData.bind.event ){
                            if( typeof uiData.bind.event[e]=="string" )
                                self.ui[e]( model[uiData.bind.event[e]] );
                            else if( typeof uiData.bind.event[e]=="function" )
                                self.ui[e]( uiData.bind.event[e] );
                        }
                    break;
                    case "route":
                        let ev = uiData.bind.route.ev;
                        let path = uiData.bind.route.path;
                        self.ui.path = path
                        self.ui[ev]( function(){
                            kd.navigateRoute( this.path );
                        } );
                    break;
                    case "module":
                        let moduleEv = uiData.bind.module.ev;
                        let modulePath = uiData.bind.module.path;
                        self.ui.path = modulePath
                        self.ui[moduleEv]( function(){
                            kd.navigateModule( this.path );
                        } );
                    break;
                }
            }
        }
    }

    parseText( ui, model ){
        let text = ui.value;
        ui.obs.forEach(o=>{
            text = text.split( '<'+o+'>' ).join( model[o]() );
        });
        return text;
    }

    getTextMethod( uiKey ){
        switch( uiKey ){
            case "AppBar":
                return {
                    set : "SetTitleText"
                };
            break;
            default:
                return {
                    set : "SetText",
                    get : "GetText"
                }
            break;
        }
    }
}