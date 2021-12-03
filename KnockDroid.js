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
        self.data = {}

        //Load Home Module
		require( [self.host + self.home], vm=>{
            self.root = vm;
            self.renderRoot( self.root );
        } );
	}

    renderRoot( vm ){
        let self = this;
        self.root.view = vm.View;
        self.root.model = vm.Model;
        self.root.layout = self.getUi( "Layout", vm["Layout"].init );
        self.root.kids = {}
        app.AddLayout( self.root.layout );
        self.renderKids( vm.View["Layout"].kids, vm.Model, self.root.layout, self.root.kids );
    }

    renderKids( kids, model, parent, kidsContainer ){
        let self = this;
        let tmp;
        let idCount;
        let id;
        for( let k in kids ){
            tmp = kids[k];
            idCount = ++self.counter;
            id = "kid_id_" + idCount;
            kidsContainer[id] = self.getUI( k, kids[k], model );
            parent.AddChild( kidsContainer[id] );
            if( tmp.kids )
                self.renderKids( tmp.kids, model, kidsContainer[id], kidsContainer );
        }
    }
    
    getUi( uiKey, uiData, model ){
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
        return ui;
    }
}