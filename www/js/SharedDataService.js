app.factory('SharedDataService', function () {
    var User = {
        //UserDetails: '',
        User: new Object(),
        RawMaterial: [],
		vendors: []
		// customer : [],
		// product : [],
		// transaction: [],
      //  InviteMembers: '',
      //  Notifications: '',
      //  Count :'',
      //  Friends: '',
        
    };
    return User;
});
