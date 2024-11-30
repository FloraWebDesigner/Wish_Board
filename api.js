let emojiLink = "https://emoji-api.com/";
let EMOJI_API="34a3fe96b6bcf18b61c190bb5c289c1875bce72b";

// https://emoji-api.com/categories/smileys-emotion?access_key=
async function getAllEmoji() {
    const reqUrl = `${emojiLink}/categories/smileys-emotion?access_key=${EMOJI_API}`;
    let response = await fetch(reqUrl);
    return await response.json(); 
}

async function getOneEmoji(unicodeName) {
    const emojis= await getAllEmoji();
    const foundEmoji = emojis.find(emoji => emoji.unicodeName === unicodeName);
        return foundEmoji ? foundEmoji.character : "😄";
}



export{
    getAllEmoji,
    getOneEmoji
}