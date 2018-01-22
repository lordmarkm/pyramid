(function () {
    'use strict';

    angular.module('pyramid.service')
        .service('authService', authService);

    function authService($q) {
        const auth2InitPromise = $q(function(resolve) {
            gapi.load('auth2', function() {
                var auth2 = gapi.auth2.init();
                auth2.then(function() {
                    resolve();
                });
            })
        });

        this.isSignedIn = function() {
            return auth2InitPromise.then(function() {
                return gapi.auth2.getAuthInstance().isSignedIn.get();
            });
        };

        this.signOut = function() {
            return auth2InitPromise.then(function() {
                const auth2 = gapi.auth2.getAuthInstance();
                return $q(function(resolve, reject) {
                    auth2.signOut().then(resolve, reject);
                });
            });
        };

        this.getProfile = function() {
            return this.isSignedIn().then(function(isSignedIn) {
                if (isSignedIn) {
                    const currentUser = gapi.auth2.getAuthInstance().currentUser.get();
                    const authResponse = currentUser.getAuthResponse();
                    return $q.when(authResponse.expires_at > Date.now() ? authResponse : currentUser.reloadAuthResponse()).then(function(ar) {
                        return {
                            signed_in: true,
                            access_token: ar.id_token,
                            profile: currentUser.getBasicProfile()
                        }                        
                    });
                } else {
                    return { signed_in: false };
                }
            });
        };
    }

})();