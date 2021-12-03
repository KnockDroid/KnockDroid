class KnockDroid{
	constructor( host, home ){
		let self = this;
        self.host = host ? host : "";
        self.home = home ? home : "home";
        self.counter = 0;
        self.root = {
            view : {},
            model : {},
            layout : {},
            kids : {}
        }
        self.regex = {
            //obs : /<([^}]+)>/g,
            obs : /<(.*?)>/g,
            exp : /\{([^}]+)\}/g
        }
        self.data = {}

        //Load Home Module
		require( [self.host + self.home + ".js"], vm=>{
            self.root = vm;
            self.renderRoot( self.root );
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
    }

    renderKids( kids, model, parent, kidsContainer ){
        let self = this;
        let tmp;
        let id;
        for( let k in kids ){
            tmp = kids[k];
            self.counter = self.counter+1;
            id = "kid_id_" + self.counter;
            kidsContainer[id] = self.getUi( k, kids[k], model );
            parent.AddChild( kidsContainer[id] );
            if( tmp.kids )
                self.renderKids( tmp.kids, model, kidsContainer[id], kidsContainer );
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
                            ui[textMethod.set]( model[computed]() );
                        } );
                        ui[textMethod.set]( model[computed]() );
                    break;
                    case "value":
                        let val = uiData.bind.value;
                        model[val.obs].subscribe( newVal=>{
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
}