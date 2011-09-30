var window = this;
Ti.include('/lib/sproutcore-runtime.js');
Ti.include('/lib/sc_ti.js');

var App = {};

App.Contact = SC.Object.extend({
  firstName: null,
  lastName: null,
  
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName'); 
  }.property('firstName', 'lastName').cacheable()
});
   
App.selectedContact = App.Contact.create({
  firstName: "Erik",
  lastName: "Bryn",
  mobilePhone: "123-456-7890"
});

SCTi.Window.create({
  titleBinding: "App.selectedContact.fullName", 
  backgroundColor: '#fff',
  layout: 'vertical',
  
  childViews: [
    SCTi.Label.create({textBinding: "App.selectedContact.fullName", left: 10, height: 'auto'}),
    SCTi.View.create({
      height: 'auto',
      childViews: [
        SCTi.Label.create({text: "First:", left: 10, color: '#ccc', height: 'auto'}),
        SCTi.TextField.create({valueBinding: "App.selectedContact.firstName", left: 70}),
      ]
    }),
    SCTi.View.create({
      height: 'auto',
      childViews: [
        SCTi.Label.create({text: "Last:", left: 10, color: '#ccc', height: 'auto'}),
        SCTi.TextField.create({valueBinding: "App.selectedContact.lastName", left: 70})
      ]
    }),
    SCTi.View.create({
      height: 'auto',
      childViews: [
        SCTi.Label.create({text: "Mobile:", left: 10, color: '#ccc', height: 'auto'}),
        SCTi.TextField.create({valueBinding: "App.selectedContact.mobilePhone", left: 70})
      ]
    }),
    SCTi.Button.create({
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
