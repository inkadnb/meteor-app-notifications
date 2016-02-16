Meteor.publish('subscriber-notifications', function() {
    console.log('publishing notifications...') // for testing
    //  Subscriber id
    if(this.userId)
    {
      log("publishing notifications for specific user");
      var user = Meteor.users.findOne(this.userId);
      var username = user.username;
      var subscriberId = username.substring(username.lastIndexOf("_")+1);

      log("subscriber id for notifications " + subscriberId);

      return NotificationHistory.find({"subscriberId": subscriberId});
    } else {
      return null;
    }
});

Meteor.methods({
    'insertNotification':function(notifObj){

       return  NotificationHistory.insert(notifObj)

    },
    'markRead': function(notif) {
        // console.log('mark as read click') // for testing
        return NotificationHistory.update({
            '_id': notif._id
        }, {
            $addToSet: {
                'dismissals': this.userId
            }
        })
    },
    'alertCount':function(){
        if(this.userId){
            return NotificationHistory.find({
                'expiration': {
                    $gt: new Date()
                },
                'dismissals': {
                    $nin: [this.userId]
                }
            }, {
                'limit': 5,
                sort: {
                    'addedAt': 1
                }
            }).count()
        }else{
            return NotificationHistory.find({
                'expiration': {
                    $gt: new Date()
                },
            }, {
                'limit': 5,
                sort: {
                    'addedAt': 1
                }
            }).count()
        }

    },
    'registerClick': function(notif) {
        // console.log('notification click') // for testing
        return NotificationHistory.update({
            '_id': notif._id
        }, {
            $addToSet: {
                'clicks': this.userId
            }
        })
    },
})
