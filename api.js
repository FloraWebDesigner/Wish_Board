// let emojiLink = "https://florawebdesigner.github.io/emoji-api/emoji.json";
// let EMOJI_API="34a3fe96b6bcf18b61c190bb5c289c1875bce72b";
// const emojiLink = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.emoji.family/api/emojis")
import {emojiData} from "./emoji.js"


function getAllEmoji() {
    return emojiData;
}

function getOneEmoji(emojiName) {
    try {
        const foundEmoji = emojiData.find(e => 
            e.annotation === emojiName || 
            (e.tags && e.tags.includes(emojiName.toLowerCase()))
        );
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