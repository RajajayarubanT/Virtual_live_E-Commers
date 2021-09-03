const PurchaseOrderUsers = [];

const addPurchaseOrderUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = PurchaseOrderUsers.find((user) => user.room === room && user.name === name);

    if (!name || !room) return { error: 'Username and room are required.' };
    // if (existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room };

    PurchaseOrderUsers.push(user);

    return { user };
}

const removePurchaseOrderUser = (id) => {
    const index = PurchaseOrderUsers.findIndex((user) => user.id === id);

    if (index !== -1) return PurchaseOrderUsers.splice(index, 1)[0];
}

const getPurchaseOrderUser = (id) => PurchaseOrderUsers.find((user) => user.id === id);

const getPurchaseOrderUsersInRoom = (room) => PurchaseOrderUsers.filter((user) => user.room === room);

module.exports = { addPurchaseOrderUser, removePurchaseOrderUser, getPurchaseOrderUser, getPurchaseOrderUsersInRoom };