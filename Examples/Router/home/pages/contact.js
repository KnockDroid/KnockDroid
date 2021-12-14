define( function(){
    var Model = function(){
        let self = this;
        self.title = ko.observable( "Contact Us" );
    }
    return {
        view : {
            "Layout" : {
                init : ["Linear", "FillXY,Vertical"],
                kids : [
                    {
                        ui : "TextH3",
                        init : ["", 1, -1, "Monospace"],
                        bind : {
                            computed : "title" /* anything that can be subscribed */
                        }
                    },
                    {
                        ui : "ButtonElegant",
                        init : ["Go Back", 0.35],
                        bind : {
                            route : {
                                ev : "SetOnTouch",
                                path : "about"
                            }
                        }
                    }
                ]
            }
        },
        model : new Model()
    }
} );