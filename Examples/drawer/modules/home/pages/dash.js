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
                                        ui : "Card",
                                        init : [{
                                            title: "Card Title",
                                            body: "Lorem ipsum dolor set amit consectetur elit",
                                            buttonText: "LINKS,SEE MORE",
                                            image: "/Sys/Img/Sky.jpg",
                                            width: 0.94,
                                            avatar: "/Sys/Img/Droid1.png",
                                            avatarOnTop: true,
                                            divider1: true,
                                            divider2: true
                                        }],
                                        bind : {
                                            event : {
                                                SetOnButtonTouch : function(){
                                                    kd.navigateRoute( "about" );
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        model : {
            
        }
    }
});