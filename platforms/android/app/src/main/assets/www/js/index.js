var idVerification  

cordova.plugins.firebase.auth.onAuthStateChanged(function(user){
    if(user){
        alert(JSON.stringify(user))
    }
})

function sendMessage() {

    var numero = document.getElementById('numero').value

    var telefono = '+52'+numero

    console.log(telefono)

    cordova.plugins.firebase.auth.verifyPhoneNumber(telefono, 30000).then( function (verificationId){

        idVerification = verificationId

        alert(idVerification)
        
        verifyCode()

    }).catch(function(err) {

        alert(err)

    })

}

function verifyCode() {

    navigator.notification.prompt("Ingresa el codigo", verificar, "Codigo de verificación", ["Ok", "Cancel"])

}

function verificar(results) {
    
    var button = results.buttonIndex
    
    var codigo = results.input1

    if(button == 1){

        cordova.plugins.firebase.auth.signInWithVerificationId(idVerification, codigo).then(function(response){

            alert(response)

        }).catch(function(err){

            alert(err)
        })

    }

}

function logOut(){

    cordova.plugins.firebase.auth.signOut()

    alert('Cerro sesión')

}

// Cuando se va hacer el registro por primera vez, se require el numero de telefono para que se le envie el sms con el codigo
// y posteriormente el lo ingrese y se registre en firebase.

// Cuando el usuario ya este registrado e inicie sesion, no es necesario volver a enviar el sms codigo, sino poner un observable
// que nos va a decir si ya esta registrado o no  