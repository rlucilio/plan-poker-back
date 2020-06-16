export interface ISaveSessionEntity {
    session: {
        name: string,
        ownerName: string,
        expireInSeconds?: number
    },
    users: Array<{
        name: string
    }>
}