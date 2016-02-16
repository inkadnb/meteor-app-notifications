Template.notificationTeaser.helpers({
    'notifsCount': function() {
        if (Meteor.user()) {
            var NotifCount = NotificationHistory.find({
                'expiration': {
                    $gt: new Date()
                },
                'dismissals': {
                    $nin: [Meteor.user()._id]
                }
            }, {
                'limit': 10,
                sort: {
                    'addedAt': -1
                }
            }).count()
            if (NotifCount) {
                return NotifCount
            } else {
                Session.set('showNotifications', false)
            }
        } else {
            return NotificationHistory.find({
                'expiration': {
                    $gt: new Date()
                },
                'dismissals': {
                    $nin: ['hey']
                }
            }, {
                'limit': 10,
                sort: {
                    'addedAt': -1
                }
            }).count()
        }
    },
})

Template.notificationTeaser.onCreated(function(){
    Session.set('showNotifications', false)
    Meteor.subscribe('subscriber-notifications')
})


Template.notificationTeaser.events({
    'click .notificationCount': function(event, template) {
        event.preventDefault()
        if (Meteor.user()) {
            console.log('clicked', NotificationHistory.find({
                'expiration': {
                    $gt: new Date()
                },
                'dismissals': {
                    $nin: [Meteor.user()._id]
                }
            }, {
                'limit': 10,
                sort: {
                    'addedAt': -1
                }
            }).fetch())
        }
        if (Session.get('showNotifications')) {
            Session.set('showNotifications', false)
        } else {
            Session.set('showNotifications', true)
        }
    },
})

Template.notificationLayout.helpers({
    'notifs': function() {
        if (Meteor.user()) {

            return NotificationHistory.find({
                'expiration': {
                    $gt: new Date()
                }
            }, {
                'limit':10,
                sort: {
                    'addedAt': -1
                }
            }).fetch()
        } else {
            return false
        }
    },
    'isRead': function(notif) {
      var readCount = NotificationHistory.find({
          '_id': notif._id,
          'dismissals': Meteor.user()._id
      }).count();

      if(readCount > 0) {
        return true;
      } else {
        return false;
      }
    },
    'showStatus': function() {
        return Session.get('showNotifications')
    }
})


Template.notificationLayout.events({
   'click .hider':function(){
       Session.set('showNotifications',false)
   },
    'click .removeMe': function(event, template) {
        $(event.target).parent('.notificationRow').fadeOut()
        Meteor.call('markRead', this, function(err, resp) {
            console.log('mark as read response', resp)
        })
    },/*
    'click .notificationRow': function() {
        console.log(this) //DEBUG
    },*/
    'click .clickGo': function(event, template) {
        Meteor.call('registerClick', this);
        Session.set('showNotifications',false)
        FlowRouter.go(this.link)
    }
})
