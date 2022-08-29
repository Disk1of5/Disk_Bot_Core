/**
 * Quick Method to get an access token.
 */

const url="https://id.twitch.tv/oauth2/authorize?response_type=token&redirect_uri=http://localhost:8080&scope=chat:read+chat:edit+channel:moderate+whispers:read+whispers:edit+channel_editor&client_id="

var hash = window.location.hash.substring(1);
    var params = {}
    hash.split('&').map(hk => { 
      let temp = hk.split('='); 
        params[temp[0]] = temp[1] 
    });

if(hash==""){
    document.getElementById("instructions").removeAttribute("hidden");
    document.getElementById("client_id_blurb").removeAttribute("hidden");

}else{
    document.getElementById("token").textContent="Access Token: " + params.access_token;
    document.getElementById("token").removeAttribute("hidden");
}

function client_id_submit(){
   document.getElementById("twitchURL").setAttribute("href",url + document.getElementById("client_id").value)
   document.getElementById("twitchURL").removeAttribute("hidden");
};
