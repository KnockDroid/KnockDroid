define( [], function(){
    var Model = function(){
        let self = this;
        self.counter = ko.observable( 1 );
        self.add = function(){
            self.counter( self.counter()+1 );
        }
    }
    var View = {
        "Layout" : {
            init : [ "Linear", "FillXY,Vertical" ],
            methods : {
                "SetBackColor" : "#efefef"
            },
            kids : {
                "AppBar":{
                    init : ["APP NAME", "apps", "info"],
                },
                "TextSecondary" : {
                    init : ["--", 1, -1, "Monospace" ],
                    val : {
                        obs : "counter",
                        set : "SetText"
                    }
                },
                "ButtonFlat" : {
                    init : [ "Click Here", 0.3, 0.1, "" ],
                    ev : {
                        "SetOnTouch" : "add"
                    }
                }
            }
        }
    };
    
    return {
        routes : [
            {
                hash : "",
                vm : "index"
            },
            {
                hash : "about"
            }
        ],
        View : View,
        Model : new Model()
    }
} );
