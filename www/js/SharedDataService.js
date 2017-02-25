app.factory('SharedDataService', function () {
    var User = {
        //UserDetails: '',
        User: new Object(),
        RawMaterial: [],
		Vendors: [],
        alreadyLoggedIn : false
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
