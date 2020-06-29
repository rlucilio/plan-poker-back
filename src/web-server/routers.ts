export const RoutersWebServer = {
  room: {
    base: '/room',
    find: '/find/:name'
  },
  task: {
    base: '/task',
    find: '/:room'
  }
};
