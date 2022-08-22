
const options = (googleAuthApiKey) => ({
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': googleAuthApiKey,
		'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
	}
});


async function getSecretCode(googleAuthApiKey) {

    return await fetch('https://google-authenticator.p.rapidapi.com/new_v2/', options(googleAuthApiKey))
        .then(response => response.text())
        .catch(err => console.error(err));
}

async function getTwoFactorAuthQrLink({googleAuthApiKey, appName, username, secretCode}) {

    return await fetch(`https://google-authenticator.p.rapidapi.com/enroll/?secret=${ secretCode }&issuer=${ appName }&account=${ username }`, options(googleAuthApiKey))
        .then(response => response.text())
        .catch(err => console.error(err));
}

async function validateTwoFactorAuth(googleAuthApiKey, code, secretCode){
    return await fetch(`https://google-authenticator.p.rapidapi.com/validate/?code=${ code }&secret=${ secretCode }`, options(googleAuthApiKey))
        .then(response => response.text())
        .catch(err => console.error(err));
}

export { getSecretCode, getTwoFactorAuthQrLink, validateTwoFactorAuth };