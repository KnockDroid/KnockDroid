class KnockDroid{
	constructor( cfg ){
		let self = this;
		//Properties
		self._routes = {};
		self._activeRoute = {};
		self._config = {};
		self._vm = {};
		
		self._config = {
		    title : cfg.title ? cfg.title : "KnockDroid",
		    prefix : cfg.prefix ? cfg.prefix : ""
	    };
		cfg.routes.forEach(r=>{
			self._routes[r.hash] = {
				hash : r.hash,
				file : r.file
			};
		})
	}
	
	start( hash ){
        let self = this;
        if( !self._routes[hash] ){
            return app.ShowPopup( "404: page not found" );
        }
        self._activeRoute = self._routes[hash]
        require( [self._config.prefix + self._activeRoute.hash + ".js"], function( vm ){
            self._vm = vm;
            self.render();
        });
	}
	
	render( key, child, parent ){
	    let self = this;
	    key = key ? key : "Layout";
        child = child ? child : self._vm.View[key];
        parent = parent ? parent : false;
        let ui = self.getUi( key, child );
        if( child.val ){
            if( child.val.obs ){
                let obs = self._vm.Model[child.val.obs]
                ui[child.val.set]( obs() );
                obs.subscribe( (newVal)=>{
                    ui[child.val.set]( newVal );
                } );
                if( child.val.get )
                    ui[child.val.ev]( function( changedVal ){
                        obs(ui[child.val.get]());
                    } );
            }
            if( child.val.raw ){
                ui[child.val.set]( child.val.raw );
            }
        }
        if( child.ev ){
            for( let e in child.ev ){
                ui[e]( self._vm.Model[child.ev[e]] );
            }
        }
        if(parent) parent.AddChild( ui );
        else app.AddLayout( ui );
        if( child.kids )
            for( let kid in child.kids ){
                self.render( kid, child.kids[kid], ui );
            }
    }
    
    getUi( uiKey, child ){
        let ui = null;
        ui = MUI["Create" + uiKey]( ...child.init );
        if( child.methods ){
            for( let m in child.methods ){
                if( typeof child.methods[m] =="object" )
                    ui[m]( ...child.methods[m] );
                else
                    ui[m]( child.methods[m] );
            }
        }
        return ui;
    }
}