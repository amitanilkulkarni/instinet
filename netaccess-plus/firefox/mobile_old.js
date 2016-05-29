var data = require("sdk/self").data;
var Request = require("sdk/request").Request;
var tabs = require("sdk/tabs");
var Pass = require("sdk/passwords");
var notifications = require("sdk/notifications");


// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Defining critical functions
// -----------------------------------------------------------------
// -----------------------------------------------------------------


// Variables for storing preferred credentials
var user,pass;
var unspec=0;
var creds=0;


// -----------------------------------------------------------------
// Function to get the preferred credentials
// -----------------------------------------------------------------

notifications.notify({
    title: "Netaccess Plus",
    text: "Touch to authenticate.",
    data: "Approving...",
    onClick: function (data) {
        //console.log(data);
        randomAlloc();
    }
});


function randomAlloc() {
    creds = 0;
    Pass.search({
	url: "https://netaccess.iitm.ac.in",
	
	onComplete: function onComplete(credentials) {
            credentials.forEach(function(credential) {
		user = credential.username;
		pass = credential.password;
		creds++;
            });
            if (creds == 0)
		checkUnspec();
            else
		req1();
	}  
    });    
}

// -----------------------------------------------------------------
// Function to check if any credentials are found
// -----------------------------------------------------------------

function checkUnspec() {
    // No passwords stored at all!
    //console.log("No passwords stored");
    
    notifications.notify({
	title: "Can't find stored password.",
	text: "Login to netaccess and click on Remember password. Touch to retry when done.",
	data: "Approving...",
	onClick: function (data) {
            //console.log(data);
            randomAlloc();
	}
    });
    
    tabs.open({
	url: "https://netaccess.iitm.ac.in"
    });
}


// -----------------------------------------------------------------
// Function to send login request
// -----------------------------------------------------------------
function req1 () {
    Request({

	url: "https://netaccess.iitm.ac.in/account/login",
	content: {userLogin : user, userPassword : pass},
	onComplete: function (response) {

            // Is anyone home?
            if (response.text.search("Home") == -1)
		notifications.notify({
		    title: "Connection failed",
		    text: "Can't connect to netaccess. Touch to try again.",
		    data: "Approving...",
		    onClick: function (data) {
			//console.log(data);
			randomAlloc();
		    }
		});
            
            // Online!  
            else {
		if ( response.text.search("failed") == -1 ) {  
		    
		    // Login successful!
		    if ( response.text.search("approve") != -1 ) {
			
			// Approve button exists!
			req2();
		    }

		    else if (response.text.search("exceeded") != -1) {
              		notifications.notify({
			    title: "Oops!",
			    text: "Your account has exceeded the limit."
			});
		    }

		    else if (response.text.search("10.93.") != -1)
			notifications.notify({
			    title: "Disable hproxy first.",
			    text: "Touch to try again.",
			    data: "Approving...",
			    onClick: function (data) {
				//console.log(data);
				randomAlloc();
			    }
			});
		    
		    else
			notifications.notify({
			    title: "Weird :/",
			    text: "This IP can't be approved. Touch to retry.",
			    data: "Approving...",
			    onClick: function (data) {
				//console.log(data);
				randomAlloc();
			    }
			});
		}

		else            
		    notifications.notify({
			title: "Invalid login details!",
			text: "Open netaccess site, and correct the stored password(s). Touch to try again.",
			data: "Approving...",
			onClick: function (data) {
                            //console.log(data);
                            randomAlloc();
			}
		    });
	    }
	}
    }).post();
}


// -----------------------------------------------------------------
// Function to approve the account for the day
// -----------------------------------------------------------------

function req2() {
    Request({
	
	url: "https://netaccess.iitm.ac.in/account/approve",
	content: {duration: 2, approveBtn: ""},
	
	onComplete: function (response) {
	    
	    notifications.notify({
		title: "Done!",
		text: "Approved for 24 hours."
	    });
            
	}
	
    }).post();
}
