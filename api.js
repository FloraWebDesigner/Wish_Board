// let emojiLink = "https://emoji-api.com/";
// let EMOJI_API="34a3fe96b6bcf18b61c190bb5c289c1875bce72b";
const emojiLink = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.emoji.family/api/emojis")

// const emojiLink = "https://cors-anywhere.herokuapp.com/" + "https://www.emoji.family/api/emojis"
// https://emoji-api.com/categories/smileys-emotion?access_key=
async function getAllEmoji() {
    try {
        const response = await fetch(emojiLink, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch data from API');
        
        const data = await response.json();
        const apiResponse = JSON.parse(data.contents);
        console.log("API Response:", apiResponse);
        
        return Array.isArray(apiResponse) ? apiResponse : [];
    } catch (error) {
        console.error("Fail to get data", error);
        return []; 
    }
}

async function getOneEmoji(emojiName) {
    try {
        const emojis = await getAllEmoji();
        console.log("all emoji data:", emojis);
        
        const foundEmoji = emojis.find(e => 
            e.annotation === emojiName || 
            e.tags.includes(emojiName.toLowerCase())
        );
        
        console.log("Emoji Founded:", foundEmoji);
        return foundEmoji ? foundEmoji.emoji : "😄";
    } catch (error) {
        console.error("Failed to get single emoji", error);
        return "😄"; 
    }
}


export{
    getAllEmoji,
    getOneEmoji
}