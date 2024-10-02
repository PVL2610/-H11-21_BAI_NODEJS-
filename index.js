const fs = require('fs');

let users = [];

const loadUsers = () => {
    try {
        const data = fs.readFileSync('user.json', 'utf-8');
        users = JSON.parse(data);
    } catch (e) {
        users = [];
    }
}

const saveUsers = () => {
    fs.writeFileSync('user.json', JSON.stringify(users, null, 2));
}

loadUsers();


//add user
const addUser = (id, name, role, gender, nationality) => {
    const newUser = { id, name, role, gender, nationality };
    users.push(newUser);
    saveUsers();
    console.log("User added successfully!");
}

//update user
const updateUser = (id, updatedData) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedData };
        saveUsers();
        console.log("User updated successfully!");
    } else {
        console.log("User not found!");
    }
}

//delete user
const deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        saveUsers();
        console.log("User deleted successfully!");
    } else {
        console.log("User not found!");
    }
}

//get user with pageIndex
const getUsers = (pageIndex, pageSize) => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const paginatedUsers = users.slice(start, end);
    
    console.log(paginatedUsers);
    return paginatedUsers;
}
//
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter command (add, update, delete, list): ", (command) => {
    if (command === 'add') {
        readline.question("Enter user info (id, name, role, gender, nationality): ", (info) => {
            const [id, name, role, gender, nationality] = info.split(',');
            addUser(id, name, role, gender, nationality);
            readline.close();
        });
    } else if (command === 'update') {
        readline.question("Enter user id: ", (id) => {
            readline.question("Enter updated data (name, role, gender, nationality): ", (data) => {
                const [name, role, gender, nationality] = data.split(',');
                updateUser(id, { name, role, gender, nationality });
                readline.close();
            });
        });
    } else if (command === 'delete') {
        readline.question("Enter user id: ", (id) => {
            deleteUser(id);
            readline.close();
        });
    } else if (command === 'list') {
        readline.question("Enter pageIndex and pageSize: ", (input) => {
            const [pageIndex, pageSize] = input.split(',').map(Number);
            getUsers(pageIndex, pageSize);
            readline.close();
        });
    } else {
        console.log("Invalid command!");
        readline.close();
    }
});

