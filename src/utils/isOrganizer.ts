export const isOrganizer = (user) => {
    if (user.roles.some(r => ["Organizer", "Moderator", "Server Admin"].includes(r.name)) ) {
        return true;
    } else {
        return false;
    }
}
