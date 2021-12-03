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
            id : "root",
            init : [ "Linear", "FillXY,Vertical" ],
            methods : {
                "SetBackColor" : "#efefef"
            },
            kids : {
                "AppBar":{
                    id : "appbar",
                    init : ["APP NAME", "apps", "info"],
                },
                "TextSecondary" : {
                    id : "counterText",
                    init : ["--", 1, -1, "Monospace" ],
                    val : {
                        obs : "counter",
                        set : "SetText"
                    }
                },
                "ButtonFlat" : {
                    id : "counterButton",
                    init : [ "Click Here", 0.3, 0.1, "" ],
                    ev : {
                        "SetOnTouch" : "add"
                    }
                }
            }
        }
    };
    
    return {
        View : View,
        Model : new Model()
    }
} );
