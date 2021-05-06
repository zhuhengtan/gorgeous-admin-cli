const apiList = {
  login: 'POST /api/login',

  // 用户管理
  getUserList: 'GET /api/users',
  switchUserStatus: 'POST /api/user/ban',
  getInnerUserList: 'GET /api/inner-users',
  addUser: 'POST /api/register',

  // 项目管理
  getProjectList: 'GET /api/projects',
  createProject: 'POST /api/project',
  editProject: 'POST /api/project-update',
  deleteProject: 'POST /api/project-delete',
  getProjectDetail: 'GET /api/project',

  // 测试管理
  getReports: 'GET /api/reports',
  createTest: 'POST /api/report',
  deleteReport: 'POST /api/report-delete',
  getReportDetail: 'GET /api/report',

  // 报告
  getReportOverview: 'GET /api/summary',
  getCPUModuleData: 'GET /api/module-consumption',
  getModuleRatioData: 'GET /api/module-consumption-total',
  getMethodTopData: 'GET /api/function-statistics',
  getMethodDetail: 'GET /api/function-trends',
  getSnapshot: 'GET /api/images',
  getGCOverview: 'GET /api/gc-functions',
}

export default apiList
