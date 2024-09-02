const { OpenAI } = require('openai');
require('dotenv').config();

module.exports = async function openAI(search) {
    const openai = new OpenAI({
        // organization: "org-GseeGwHTGTGmBm0m4DWLics9",
        // project: "proj_NvzvozV7myWY5pm5V7kzytHL",
        apiKey: process.env.OPENAI_API_KEY

    })
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system", content: `please give me 10 data title and body news from ${search}. the response must be a JSON. 
            the format is like this:
            [
                { "url": "...", "title": "...", "body": "..."}
            ]
            ` }],
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content
}


