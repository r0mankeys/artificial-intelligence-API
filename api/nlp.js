import fetch from 'node-fetch';

const PAT = process.env.VITE_NLP_TOKEN;

export default async function handler(req, res) {
    const parsedBody = JSON.parse(req.body) // Parse the body to access the properties
    const response = await fetch("https://api.nlpcloud.io/v1/bart-large-cnn/summarization", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PAT}`,
        },
        body: JSON.stringify({ text: parsedBody.text }),
        });
    const result = await response.json();
    return res.json(result);
}
