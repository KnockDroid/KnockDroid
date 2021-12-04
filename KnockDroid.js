class KnockDroid{
	constructor( home, host ){
		let self = this;
        self.host = host ? host : "";
        self.home = home ? home : "home";
        self.counter = 0;
        self.root = {
            vm : {},
            view : {},
            model : {},
            layout : {},
            kids : {},
            //Route properties
            routes : {},
            allRoutes : {},
            defaultRoute : "",
            currentRoute : {
                path : "",
                lay : false,
                kids : {},
                view : {},
                model : {}
            },
            routerView : false
        }
        self.regex = {
            //obs : /<([^}]+)>/g,
            obs : /<(.*?)>/g,
            exp : /\{([^}]+)\}/g
        }
        self.data = {}

        //Load Home Module
		require( [self.host + self.home + ".js"], vm=>{
            self.root.vm = vm;
            self.renderRoot( self.root.vm );
        } );
	}

    renderRoot( vm ){
        let self = this;
        self.root.view = vm.View;
        self.root.model = vm.Model;
        self.root.layout = self.getUi( "Layout", vm.View.Layout, vm.Model );
        self.root.kids = {}
        app.AddLayout( self.root.layout );
        self.renderKids( vm.View["Layout"].kids, vm.Model, self.root.layout, self.root.kids );
        self.root.routes = self.root.vm.Routes ? self.root.vm.Routes : [];
        self.routerInit();
    }

    renderKids( kids, model, parent, kidsContainer ){
        let self = this;
        let tmp;
        let id;
        for( let k in kids ){
            if( k=="RouterView" ){
                if( !self.root.routerView ){
                    self.root.routerView = self.getUi( "Layout", kids[k], {} );
                    parent.AddChild( self.root.routerView );
                }
            }else{
                tmp = kids[k];
                self.counter = self.counter+1;
                id = "kid_id_" + self.counter;
                kidsContainer[id] = self.getUi( k, kids[k], model );
                parent.AddChild( kidsContainer[id] );
                if( tmp.kids )
                    self.renderKids( tmp.kids, model, kidsContainer[id], kidsContainer );
            }
        }
    }
    
    getUi( uiKey, uiData, model ){
        let self = this;
        let ui = null;
        ui = MUI["Create" + uiKey]( ...uiData.init );
        if( uiData.methods ){
            for( let m in uiData.methods ){
                if( typeof uiData.methods[m] =="object" )
                    ui[m]( ...uiData.methods[m] );
                else
                    ui[m]( uiData.methods[m] );
            }
        }
        if( uiData.bind ){
            let textMethod = self.getTextMethod(uiKey);
            for( let b in uiData.bind ){
                switch( b ){
                    case "text":
                        ui.text = uiData.bind.text;
                        ui.obs = [];
                        let obs = ui.text.matchAll( self.regex.obs );
                        for( let obsName of obs ){
                            ui.obs.push( obsName[1] );
                            if( model[obsName[1]] ){
                                model[obsName[1]].subscribe( newVal=>{
                                    ui[textMethod.set]( self.parseText( ui, model ) );
                                } );
                            }
                        }
                        ui[textMethod.set]( self.parseText( ui, model ) );
                    break;
                    case "computed":
                        let computed = uiData.bind.computed;
                        model[computed].subscribe( function( newVal ){
                            ui[textMethod.set]( newVal );
                        } );
                        ui[textMethod.set]( model[computed]() );
                    break;
                    case "value":
                        let val = uiData.bind.value;
                        model[val.obs].subscribe( newVal=>{
                            if(ui[textMethod.get]()!=model[val.obs]())
                                ui[textMethod.set]( model[val.obs]() );
                        } );
                        ui[textMethod.set]( model[val.obs]() );
                        //Two way
                        ui[val.ev]( ()=>{
                            model[val.obs](ui[textMethod.get]());
                        } );
                    break;
                    case "event":
                        for( let e in uiData.bind.event ){
                            ui[e]( model[uiData.bind.event[e]] );
                        }
                    break;
                    case "href":
                        let ev = uiData.bind.href.ev;
                        let path = uiData.bind.href.path;
                        ui[ev]( function(){
                            kd.navigate( path );
                        } );
                    break;
                }
            }
        }
        return ui;
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

    routerInit(){
        let self = this;
        let routes = self.root.routes;
        self.root.allRoutes = {};
        routes.forEach( r=>{
            self.root.allRoutes[r.path] = r;
            if( r.default ){
                self.root.defaultRoute = r.path;
            }
        } )
        window.onhashchange = function(){
            if( self.root.routerView )
                self.root.routerView.Animate( "FadeOut" );
            self.onNavigate();
        }
        if( self.root.defaultRoute )
            self.navigate( self.root.defaultRoute );
    }

    navigate( path ){
        path = path ? path : self.root.defaultRoute;
        let self = this;
        window.location = "#/" + path
    }

    onNavigate(){
        let self = this;
        let path = window.location.hash.split( "#/" ).join("");
        if( self.root.currentRoute.path!=path ){
            let file = self.root.allRoutes[path].file ? self.root.allRoutes[path].file : self.root.allRoutes[path].path;
            if( file ){
                //Load Home Module
                require( [self.host + file + ".js"], vm=>{
                    self.root.currentRoute.path = path;
                    self.root.currentRoute.view = vm.View;
                    self.root.currentRoute.model = vm.Model;
                    if( self.root.currentRoute.lay && self.root.routerView )
                        self.root.routerView.DestroyChild( self.root.currentRoute.lay );
                    self.root.currentRoute.lay = self.getUi( "Layout", vm.View.Layout, vm.Model );
                    self.root.currentRoute.kids = {}
                    if( self.root.routerView )
                        self.root.routerView.AddChild( self.root.currentRoute.lay );
                    if( vm.View["Layout"].kids ){
                        self.renderKids( vm.View["Layout"].kids, vm.Model, self.root.currentRoute.lay, self.root.currentRoute.kids );
                    }
                    self.root.routerView.Animate( "FadeIn" );
                } );
            }else{
                app.ShowPopup( "Page not found" );
            }
        }
    }
}