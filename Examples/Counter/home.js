
define( [], function(){
    /**
     * Model Class
     */
    var Model = function(){
        let self = this;
        self.age = ko.observable( 24 );
        self.name = ko.observable( "Danish Nayeem" );
        self.message = ko.pureComputed( function(){
            return self.name() + " is " + self.age() + " years old."
        } );
        self.add = function(){
            self.age( self.age()+1 );
        }
    }
    /**
     * View Object
     */
    var View = {
        "Layout" : {
            id : "root",
            init : [ "Absolute", "FillXY,VCenter" ],
            kids : {
                "FAB" : {
                    id : "counterFab",
                    init : [ "add" ],
                    bind : {
                        event : {
                            "SetOnTouch" : "add"
                        }
                    }
                },
                "Layout":{
                    init : ["Linear", "FillXY,Vertical,HCenter"],
                    kids : {
                        "AppBar":{
                            id : "appbar",
                            init : ["APP NAME"],
                        },
                        "TextEditOutline" : {
                            init : [0.95, "Left", "Type Here", true],
                            methods : {
                                "SetPadding" : [0.0, 0.02, 0.0, 0.02]
                            },
                            bind : {
                                value : {
                                    ev : "SetOnChange",
                                    obs : "name"
                                }
                            }
                        },
                        "TextH5" : {
                            id : "counterText",
                            init : ["--", 0.95, -1, "Monospace,Multiline,Left" ],
                            methods : {
                                "SetPadding" : [0.02,0.02,0.02,0.02]
                            },
                            bind : {
                                computed : "message"
                            }
                        }
                    }
                }
            }
        }
    };
    
    return {
        View : View,
        /**
         * Model should be an object and not a Class
         */
        Model : new Model()
    }
} );
