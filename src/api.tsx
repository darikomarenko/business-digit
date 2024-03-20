export type User = {
    id?: number
    name: string
    patronymic: string
    surname: string
    email: string
    phone: string
    address: string
}

function usersFromLocalStorage(): User[] {
    const data = localStorage.getItem('data')
    return data ? JSON.parse(data).clients : []
}

function saveToLocalStorage(users: User[]) {
    const jsonData = {'clients': users} 
    localStorage.setItem('data', JSON.stringify(jsonData))
}

function getLastID(users: User[]): number {
    if (users.length == 0) {
        return 0
    }
    if (users.length == 1) {
        return users[0].id!
    }
    return [...users].sort((a, b) => b.id! - a.id!)[0].id!
}

export function fetchUsers(): User[] {
    return usersFromLocalStorage()
}

export function addUser(user: User) {
    const users = usersFromLocalStorage()
    let lastID = getLastID(users)
    users.push({...user, id: ++lastID})
    saveToLocalStorage(users)
}

export function updateUser(user: User) {
    let users = usersFromLocalStorage()
    users = users.map((u) =>  {
        if (u.id == user.id) {
            return user
        } 
        return u
    })
    saveToLocalStorage(users)
}

export function deleteUser(userID: number) {
    let users = usersFromLocalStorage()
    users = users.filter((u) => u.id != userID)
    saveToLocalStorage(users)
}