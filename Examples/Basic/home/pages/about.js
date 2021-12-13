define( function(){
    return {
        view : {
            "Layout":{
                init : ["Linear", "FillXY,Vertical"],
                kids : {
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
                            computed : "name"
                        }
                    },
                    "ButtonElegant" : {
                        init : ["Contact Us", 0.35],
                        bind : {
                            route : {
                                ev : "SetOnTouch",
                                path : "contact"
                            }
                        }
                    }
                }
            }
        },
        model : {
            name : ko.observable("Danish Nayeem"),
            message : ko.observable("This is a message")
        }
    }


} );