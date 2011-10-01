var window = this;
Ti.include('/lib/sproutcore-runtime.js');
Ti.include('/lib/sc_ti.js');

var App = {};

App.Contact = SC.Object.extend({
  firstName: null,
  lastName: null,
  mobilePhone: null,
  
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName'); 
  }.property('firstName', 'lastName').cacheable()
});
   
App.selectedContact = App.Contact.create({
  firstName: "Erik",
  lastName: "Bryn",
  mobilePhone: "123-456-7890"
});

App.Label = SCTi.Label.extend({
  left: 10,
  height: 40
});

App.Row = SCTi.View.extend({
  height: 'auto'
});

App.TextField = SCTi.TextField.extend({
  top: 5,
  bottom: 5,
  right: 10,
  left: 70,
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

SCTi.Window.create({
  titleBinding: "App.selectedContact.fullName", 
  backgroundColor: '#fff',
  layout: 'vertical',
  
  childViews: [
    App.Row.create({
      childViews: [
        App.Label.create({textBinding: "App.selectedContact.fullName"})
      ]
    }),
    App.Row.create({
      childViews: [
        App.Label.create({text: "First:"}),
        App.TextField.create({valueBinding: "App.selectedContact.firstName"})
      ]
    }),
    App.Row.create({
      childViews: [
        App.Label.create({text: "Last:"}),
        App.TextField.create({valueBinding: "App.selectedContact.lastName"})
      ]
    }),
    App.Row.create({
      childViews: [
        App.Label.create({text: "Mobile:"}),
        App.TextField.create({valueBinding: "App.selectedContact.mobilePhone"})
      ]
    }),
    SCTi.Button.create({
      top: 10,
      left: 10,
      right: 10,
      height: 40,
      phoneNumberBinding: "App.selectedContact.mobilePhone",
      
      title: function() {
        return "Call " + this.get('phoneNumber');
      }.property('phoneNumber').cacheable(),
      
      click: function() {
        alert("Ring ring...");
      }
    })
  ]
}).open();
