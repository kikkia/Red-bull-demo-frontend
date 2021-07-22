exports.getAvatarUrl = function getAvatarUrl(userId, avatarId) {
    let format = avatarId.startsWith("a_") ? ".gif" : ".png";
    return "https://cdn.discordapp.com/avatars/" + userId + "/" + avatarId + format;
}