
module.exports = {
async up(q) {
  const now = new Date();

  const permissions = [
    "Roles.Role.Create",
    "Roles.Role.List",
    "Roles.Role.Delete",
    "Roles.Role.Edit",
    "Users.User.Create",
    "Users.User.Edit",
    "Users.User.View",
    "Users.Role.Assign",
    "Users.Password.Reset",
    "RecentAlarmsList.Alarm.View",
    "RecentAlarmsList.Alarm.List",
    "RecentAlarmsList.Alarm.Clear",
    "RecentFaultsList.Fault.View",
    "RecentFaultsList.Fault.List",
    "RecentFaultsList.Fault.Clear",
    "CarCalls.CarCall.View",
    "CarCalls.CarCall.Control",
    "HallCalls.HallCall.View",
    "HallCalls.HallCall.Control",
    "View.ElevatorView.Small",
    "View.ElevatorView.Normal",
    "View.ElevatorView.Tall",
    "View.ElevatorView.Compact",
    "View.HallCallsControls.Allow",
    "View.CarCallsControls.Allow",
    "Reports.Report.View",
    "Reports.Report.Export",
    "Controls.Control.List",
    "Controls.Control.IndependentService",
    "Controls.Control.CarToLobby",
    "Controls.Control.CaptureCar",
    "Controls.Control.Swing",
    "Controls.Control.Attendant",
    "Controls.Control.Sabbath",
    "Users.User.Delete",
    "Settings.Setting.Group-config",
    "Settings.Setting.LM-config",
    "Settings.Setting.Site-id-config",
    "Settings.Setting.Logs",
    "Settings.Setting.RTC",
    "Controls.Control.SabbathSettings",
    "Controls.Control.Flood",
    "Controls.Control.NormalRecall",
    "Controls.Control.EmergencyRecall",
    "Controls.Control.ActiveShooter",
    "Controls.Control.MarshalService",
    "Controls.Group.EmergencyPowerManualCarSelection",
    "Controls.Group.GroupReturnsToNormal",
    "Controls.Control.CarsReturnToNormal",
    "Security.Security.Show",
    "Settings.Setting.SpecialPermissions",
    "Controls.Control.OpenDoor",
    "Controls.Control.CloseDoor",
    "Controls.Control.OOS",
    "Locks.Locks.HallCallLock",
    "Locks.Locks.CarCallLock",
    "Codes.Codes.AccessCodes"
  ];

  const data = permissions.map(p => {
    const parts = p.split(".");
    const permission_group = parts[0];
    const code = parts[parts.length - 1];
    return {
      name: permission_group,
      permission_group,
      code,
      description: `Allows ${code} in ${permission_group}`,
      date_created: now,
    };
  });

  await q.bulkInsert("new_permissions", data);
},

async down(q) {
  await q.bulkDelete("new_permissions", null, {});
},
};
