// A custom basic notification module. User uses the add_alert method.
define(['jquery', 'backbone', ], function($) {

    var NotificationsView = Backbone.View.extend({
        //A div with id-notifications already exists in DOM. Using the same div as this view's parent container
        el: '#notifications',
        error_notif_template: _.template($('#' + 'error_notifcation_template')
            .html()),
        success_notif_template: _.template($('#' + 'success_notifcation_template')
            .html()),

        add_alert: function(options) {
            // options contain the type of notif and the message      
            var notif_type = options.notif_type;
            var message = options.message;
            var alert_class, timeout, template;
            
            //create the notif with the message
            if (notif_type === "success") {
                template = this.success_notif_template({
                    msg: message
                });
                alert_class = ".alert-success";
                timeout = 10000;
            } else {
                template = this.error_notif_template({
                    msg: message
                });
                alert_class = ".alert-error";
                timeout = 20000;
            }
            
            //Put the notif in view's parent element
            $(this.el)
                .append(template);
                
            //Scroll the page up..not sure why    
            $("html, body")
                .animate({
                scrollTop: 0
            }, 700);
            
            //Fade, slide and remove the notif after some time
            window.setTimeout(function() {
                //can be improved...ryt now all notifs of this type would get removed instead of only this particular notif
                $(alert_class)
                    .fadeTo(500, 0)
                    .slideUp(500, function() {
                    $(this)
                        .remove();
                });
            }, timeout);

        },
        
        show_suc_notif: function(entity_name) {
            this.add_alert({
                notif_type: "success",
                message: "Saved " + entity_name
            });
        },

        show_err_notif: function(entity_name, error_text) {
            if(!error_text){
            	this.add_alert({
                    notif_type: "error",
                    message: "Error saving " + entity_name
                });
            }
            else{
            	notifs_view.add_alert({
                    notif_type: "error",
                    message: "Error saving " + entity_name + ". Error Message: " + error_text
                });
            }
        }
    });
    
    var notifications = {
    		
    }
    //return an initialized view - the app uses a single instance of Notification module
    return new NotificationsView;
});
