import fetch from 'node-fetch';

// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = process.env.VITE_CLARIFAI_TOKEN;
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

export default async function handler(req, res) {

    const parsedBody = JSON.parse(req.body) // Parse the body to access the properties

    const url = parsedBody.inputs[0].data.image.url;

    if (!PAT) {
        return res.status(401).json({ error: 'No Clarifai PAT provided' });
    } else {
        const response = await fetch('https://api.clarifai.com/v2/models/' + MODEL_ID + '/versions/' + MODEL_VERSION_ID + '/outputs', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": "Key " + PAT,
            },
            body: JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
                "inputs": [
                    {
                        "data": {
                            "image": {
                                "url": url
                            }
                        }
                    }
                ]
            })
        })
        const result = await response.json();
        return res.json(result);
    }
}
