export function findPersonal() {
  return new Promise((res) => {
    res({
      code: 200,
      total: 2,
      result: [
        {
          userName: '李立',
          userTelephone: '12345675432',
          userEmails: '1562386253@163.com',
          userStatus: '状态正常',
        },
      ],
    })
  })
}