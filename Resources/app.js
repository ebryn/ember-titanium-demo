var window = this;
Ti.include('/lib/sproutcore-runtime.js');
Ti.include('/lib/sc_ti.js');

// Define our app's namespace
var App = {};

// Let's define a model class
App.Contact = SC.Object.extend({
  firstName: null,
  lastName: null,
  mobilePhone: null,
  
  fullName: function() { // Computed property
    return this.get('firstName') + ' ' + this.get('lastName'); 
  }.property('firstName', 'lastName').cacheable()
});
   
// Here's an instance of our model
App.selectedContact = App.Contact.create({
  firstName: "Erik",
  lastName: "Bryn",
  mobilePhone: "123-456-7890"
});

// Some view subclasses to make our app code less verbose
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

// Let's define our application's window, which will contain several
// child view objects
App.window = SCTi.Window.create({
  titleBinding: "App.selectedContact.fullName",
  backgroundColor: '#fff',
  layout: 'vertical',
  
  childViews: [
    App.Row.create({
      childViews: [
        // This label will automatically update as the first/last name's
        // are modified!
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

      // Setup a binding to make `phoneNumber` an accessible property for 
      // the `title` computed property below
      phoneNumberBinding: "App.selectedContact.mobilePhone",
      
      title: function() { // The button's title can be a computed property!
        return "Call " + this.get('phoneNumber');
      }.property('phoneNumber').cacheable(),
      
      click: function() { // Click event handler
        alert("Ring ring...");
      }
    })
  ]
});

// Let's show it!
App.window.open();
