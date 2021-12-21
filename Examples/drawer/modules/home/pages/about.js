define( ()=>{
    return {
        view : {
            Layout : {
                init : ["Linear", "FillXY,Vertical,Left"],
                id : "dash_main_lay",
                kids : [
                    {
                        ui : "Scroller",
                        init : function( model, kids, parent ){
                            let h = parent.view.ui.GetHeight();
                            return [ 1, h, "NoScrollBar" ];
                        },
                        kids : [
                            {
                                ui : "Layout",
                                init : ["Linear", "FillXY,Vertical"],
                                methods : {
                                    SetPadding : [0.03, 0.03, 0.03, 0.03]
                                },
                                kids : [
                                    {
                                        ui : "TextH4",
                                        init : ["About Me"]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        model : {}
    }
});