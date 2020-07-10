export const RoutersWebServer = {
  room: {
    base: '/room',
    find: '/find/:name'
  },
  task: {
    base: '/task',
    getAll: '/:room',
    history: '/:room/history',
    getLast: '/:room/last'
  },
  user: {
    base: '/user',
    getAllUsersInRoom: '/:room'
  }
};
