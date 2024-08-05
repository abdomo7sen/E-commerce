
const gender={
    MALE: 'male',
    FEMALE: 'female'
}
Object.freeze(gender)
const systemRole={
    ADMIN: 'admin',
    USER: 'user'
}
Object.freeze(systemRole)

const references={
    PRODUCT:"Product",
    COMMENT:"Comment",
}
Object.freeze(references)
const status={
    ACTIVE: 'active',
    INACTIVE: 'inactive',
}
Object.freeze(status)


export{
    gender,
    systemRole,
    references,
    status,
}