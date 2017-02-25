app.factory('SharedDataService', function () {
    var User = {
        //UserDetails: '',
        User: new Object(),
        RawMaterial: [],
		Vendors: []
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
