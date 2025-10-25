'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const data = [
  {
    "id": 1,
    "number": 0,
    "name": "No Alarm",
    "tag": "",
    "definition": "No Alarm",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 2,
    "number": 1,
    "name": "NTS Up P1-1",
    "tag": "",
    "definition": "NTS point 1 has been tripped in the up direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 3,
    "number": 2,
    "name": "NTS Up P1-2",
    "tag": "",
    "definition": "NTS point 2 has been tripped in the up direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 4,
    "number": 3,
    "name": "NTS Up P1-3",
    "tag": "",
    "definition": "NTS point 3 has been tripped in the up direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 5,
    "number": 4,
    "name": "NTS Up P1-4",
    "tag": "",
    "definition": "NTS point 4 has been tripped in the up direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 6,
    "number": 5,
    "name": "NTS Up P1-5",
    "tag": "",
    "definition": "NTS point 5 has been tripped in the up direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 7,
    "number": 6,
    "name": "NTS Up P1-6",
    "tag": "",
    "definition": "NTS point 6 has been tripped in the up direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 8,
    "number": 7,
    "name": "NTS Up P1-7",
    "tag": "",
    "definition": "NTS point 7 has been tripped in the up direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 9,
    "number": 8,
    "name": "NTS Up P1-8",
    "tag": "",
    "definition": "NTS point 8 has been tripped in the up direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 10,
    "number": 9,
    "name": "NTS Up P2-1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 11,
    "number": 10,
    "name": "NTS Up P2-2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 12,
    "number": 11,
    "name": "NTS Up P2-3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 13,
    "number": 12,
    "name": "NTS Up P2-4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 14,
    "number": 13,
    "name": "NTS Up P2-5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 15,
    "number": 14,
    "name": "NTS Up P2-6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 16,
    "number": 15,
    "name": "NTS Up P2-7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 17,
    "number": 16,
    "name": "NTS Up P2-8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 18,
    "number": 17,
    "name": "NTS Up P3-1",
    "tag": "",
    "definition": "NTS point 1 has been tripped in the up direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 19,
    "number": 18,
    "name": "NTS Up P3-2",
    "tag": "",
    "definition": "NTS point 2 has been tripped in the up direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 20,
    "number": 19,
    "name": "NTS Up P3-3",
    "tag": "",
    "definition": "NTS point 3 has been tripped in the up direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 21,
    "number": 20,
    "name": "NTS Up P3-4",
    "tag": "",
    "definition": "NTS point 4 has been tripped in the up direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 22,
    "number": 21,
    "name": "NTS Up P3-5",
    "tag": "",
    "definition": "NTS point 5 has been tripped in the up direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 23,
    "number": 22,
    "name": "NTS Up P3-6",
    "tag": "",
    "definition": "NTS point 6 has been tripped in the up direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 24,
    "number": 23,
    "name": "NTS Up P3-7",
    "tag": "",
    "definition": "NTS point 7 has been tripped in the up direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 25,
    "number": 24,
    "name": "NTS Up P3-8",
    "tag": "",
    "definition": "NTS point 8 has been tripped in the up direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 26,
    "number": 25,
    "name": "NTS Up P4-1",
    "tag": "",
    "definition": "NTS point 1 has been tripped in the up direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 27,
    "number": 26,
    "name": "NTS Up P4-2",
    "tag": "",
    "definition": "NTS point 2 has been tripped in the up direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 28,
    "number": 27,
    "name": "NTS Up P4-3",
    "tag": "",
    "definition": "NTS point 3 has been tripped in the up direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 29,
    "number": 28,
    "name": "NTS Up P4-4",
    "tag": "",
    "definition": "NTS point 4 has been tripped in the up direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 30,
    "number": 29,
    "name": "NTS Up P4-5",
    "tag": "",
    "definition": "NTS point 5 has been tripped in the up direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 31,
    "number": 30,
    "name": "NTS Up P4-6",
    "tag": "",
    "definition": "NTS point 6 has been tripped in the up direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 32,
    "number": 31,
    "name": "NTS Up P4-7",
    "tag": "",
    "definition": "NTS point 7 has been tripped in the up direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 33,
    "number": 32,
    "name": "NTS Up P4-8",
    "tag": "",
    "definition": "NTS point 8 has been tripped in the up direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 34,
    "number": 33,
    "name": "NTS Dn P1-1",
    "tag": "",
    "definition": "NTS point 1 has been tripped in the down direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 35,
    "number": 34,
    "name": "NTS Dn P1-2",
    "tag": "",
    "definition": "NTS point 2 has been tripped in the down direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 36,
    "number": 35,
    "name": "NTS Dn P1-3",
    "tag": "",
    "definition": "NTS point 3 has been tripped in the down direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 37,
    "number": 36,
    "name": "NTS Dn P1-4",
    "tag": "",
    "definition": "NTS point 4 has been tripped in the down direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 38,
    "number": 37,
    "name": "NTS Dn P1-5",
    "tag": "",
    "definition": "NTS point 5 has been tripped in the down direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 39,
    "number": 38,
    "name": "NTS Dn P1-6",
    "tag": "",
    "definition": "NTS point 6 has been tripped in the down direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 40,
    "number": 39,
    "name": "NTS Dn P1-7",
    "tag": "",
    "definition": "NTS point 7 has been tripped in the down direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 41,
    "number": 40,
    "name": "NTS Dn P1-8",
    "tag": "",
    "definition": "NTS point 8 has been tripped in the down direction for the normal motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 42,
    "number": 41,
    "name": "NTS Dn P2-1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 43,
    "number": 42,
    "name": "NTS Dn P2-2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 44,
    "number": 43,
    "name": "NTS Dn P2-3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 45,
    "number": 44,
    "name": "NTS Dn P2-4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 46,
    "number": 45,
    "name": "NTS Dn P2-5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 47,
    "number": 46,
    "name": "NTS Dn P2-6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 48,
    "number": 47,
    "name": "NTS Dn P2-7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 49,
    "number": 48,
    "name": "NTS Dn P2-8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 50,
    "number": 49,
    "name": "NTS Dn P3-1",
    "tag": "",
    "definition": "NTS point 1 has been tripped in the down direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 51,
    "number": 50,
    "name": "NTS Dn P3-2",
    "tag": "",
    "definition": "NTS point 2 has been tripped in the down direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 52,
    "number": 51,
    "name": "NTS Dn P3-3",
    "tag": "",
    "definition": "NTS point 3 has been tripped in the down direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 53,
    "number": 52,
    "name": "NTS Dn P3-4",
    "tag": "",
    "definition": "NTS point 4 has been tripped in the down direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 54,
    "number": 53,
    "name": "NTS Dn P3-5",
    "tag": "",
    "definition": "NTS point 5 has been tripped in the down direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 55,
    "number": 54,
    "name": "NTS Dn P3-6",
    "tag": "",
    "definition": "NTS point 6 has been tripped in the down direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 56,
    "number": 55,
    "name": "NTS Dn P3-7",
    "tag": "",
    "definition": "NTS point 7 has been tripped in the down direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 57,
    "number": 56,
    "name": "NTS Dn P3-8",
    "tag": "",
    "definition": "NTS point 8 has been tripped in the down direction for the E-Power motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 58,
    "number": 57,
    "name": "NTS Dn P4-1",
    "tag": "",
    "definition": "NTS point 1 has been tripped in the down direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 59,
    "number": 58,
    "name": "NTS Dn P4-2",
    "tag": "",
    "definition": "NTS point 2 has been tripped in the down direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 60,
    "number": 59,
    "name": "NTS Dn P4-3",
    "tag": "",
    "definition": "NTS point 3 has been tripped in the down direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 61,
    "number": 60,
    "name": "NTS Dn P4-4",
    "tag": "",
    "definition": "NTS point 4 has been tripped in the down direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 62,
    "number": 61,
    "name": "NTS Dn P4-5",
    "tag": "",
    "definition": "NTS point 5 has been tripped in the down direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 63,
    "number": 62,
    "name": "NTS Dn P4-6",
    "tag": "",
    "definition": "NTS point 6 has been tripped in the down direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 64,
    "number": 63,
    "name": "NTS Dn P4-7",
    "tag": "",
    "definition": "NTS point 7 has been tripped in the down direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 65,
    "number": 64,
    "name": "NTS Dn P4-8",
    "tag": "",
    "definition": "NTS point 8 has been tripped in the down direction for the Short motion profile. The lowest point is closest to the terminal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 66,
    "number": 65,
    "name": "NTS Invalid P1",
    "tag": "",
    "definition": "Normal profile NTS points are not of increasing in position/speed value or a trip speed exceeds contract speed.",
    "category": 0,
    "solution": "Cycle power to the system or edit an S-Curve parameter to trigger a NTS point recalculation."
  },
  {
    "id": 67,
    "number": 66,
    "name": "NTS Invalid P2",
    "tag": "",
    "definition": "Inspection profile NTS points are not of increasing in position/speed value or a trip speed exceeds contract speed.",
    "category": 0,
    "solution": "Cycle power to the system or edit an S-Curve parameter to trigger a NTS point recalculation."
  },
  {
    "id": 68,
    "number": 67,
    "name": "NTS Invalid P3",
    "tag": "",
    "definition": "Emergency profile NTS points are not of increasing in position/speed value or a trip speed exceeds contract speed.",
    "category": 0,
    "solution": "Cycle power to the system or edit an S-Curve parameter to trigger a NTS point recalculation."
  },
  {
    "id": 69,
    "number": 68,
    "name": "NTS Invalid P4",
    "tag": "",
    "definition": "Short profile NTS points are not of increasing in position/speed value or a trip speed exceeds contract speed.",
    "category": 0,
    "solution": "Cycle power to the system or edit an S-Curve parameter to trigger a NTS point recalculation."
  },
  {
    "id": 70,
    "number": 69,
    "name": "ES Class Op",
    "tag": "",
    "definition": "When 01-150 is set to ON, this debugging alarm will signal when an ESTOP is commanded due to class of operation change.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 71,
    "number": 70,
    "name": "ES Stop Timeout",
    "tag": "",
    "definition": "When 01-150 is set to ON, this debugging alarm will signal when an ESTOP is commanded due to run flag failing to drop.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 72,
    "number": 71,
    "name": "ES Move Timeout",
    "tag": "",
    "definition": "When 01-150 is set to ON, this debugging alarm will signal when an ESTOP is commanded due to failing to start a run.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 73,
    "number": 72,
    "name": "ES Inv Insp",
    "tag": "",
    "definition": "When 01-150 is set to ON, this debugging alarm will signal when an ESTOP is commanded due to invalid inspection mode.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 74,
    "number": 73,
    "name": "ES Recall Dest.",
    "tag": "",
    "definition": "When 01-150 is set to ON, this debugging alarm will signal when an ESTOP is commanded due to invalid recall destination.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 75,
    "number": 74,
    "name": "ES Stop At Next",
    "tag": "",
    "definition": "When 01-130 is set to ON, this debugging alarm will signal when the car is commanded to stop at next available floor.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 76,
    "number": 75,
    "name": "ES Earthquake",
    "tag": "",
    "definition": "When 01-150 is set to ON, this debugging alarm will signal when an ESTOP is during EQ operation.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 77,
    "number": 76,
    "name": "ES Flood",
    "tag": "",
    "definition": "When 01-150 is set to ON, this debugging alarm will signal when an ESTOP is during flood operation.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 78,
    "number": 77,
    "name": "Stop No DZ",
    "tag": "",
    "definition": "Car is stopped outside of a door zone.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 79,
    "number": 78,
    "name": "Releveling",
    "tag": "",
    "definition": "Car is performing releveling.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 80,
    "number": 79,
    "name": "Defaulting 1-Bit",
    "tag": "",
    "definition": "Defaulting 1-bit parameters.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 81,
    "number": 80,
    "name": "Defaulting 8-Bit",
    "tag": "",
    "definition": "Defaulting 8-bit parameters.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 82,
    "number": 81,
    "name": "Defaulting 16-Bit",
    "tag": "",
    "definition": "Defaulting 16-bit parameters.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 83,
    "number": 82,
    "name": "Defaulting 24-Bit",
    "tag": "",
    "definition": "Defaulting 24-bit parameters.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 84,
    "number": 83,
    "name": "Defaulting 32-Bit",
    "tag": "",
    "definition": "Defaulting 32-bit parameters.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 85,
    "number": 84,
    "name": "Recall Inv Door",
    "tag": "",
    "definition": "Requested recall destination has an invalid door configuration.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 86,
    "number": 85,
    "name": "Recall Inv Floor",
    "tag": "",
    "definition": "Requested recall destination is an invalid floor.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 87,
    "number": 86,
    "name": "Recall Inv Opening",
    "tag": "",
    "definition": "Requested recall destination is not a valid opening.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 88,
    "number": 87,
    "name": "MRA WDT Disabled",
    "tag": "",
    "definition": "Processor has started up with watchdog disabled.",
    "category": 0,
    "solution": "Remove the WD jumper and restart the board to reenable."
  },
  {
    "id": 89,
    "number": 88,
    "name": "MRB WDT Disabled",
    "tag": "",
    "definition": "Processor has started up with watchdog disabled.",
    "category": 0,
    "solution": "Remove the WD jumper and restart the board to reenable."
  },
  {
    "id": 90,
    "number": 89,
    "name": "CTA WDT Disabled",
    "tag": "",
    "definition": "Processor has started up with watchdog disabled.",
    "category": 0,
    "solution": "Remove the WD jumper and restart the board to reenable."
  },
  {
    "id": 91,
    "number": 90,
    "name": "CTB WDT Disabled",
    "tag": "",
    "definition": "Processor has started up with watchdog disabled.",
    "category": 0,
    "solution": "Remove the WD jumper and restart the board to reenable."
  },
  {
    "id": 92,
    "number": 91,
    "name": "COPA WDT Disabled",
    "tag": "",
    "definition": "Processor has started up with watchdog disabled.",
    "category": 0,
    "solution": "Remove the WD jumper and restart the board to reenable."
  },
  {
    "id": 93,
    "number": 92,
    "name": "COPB WDT Disabled",
    "tag": "",
    "definition": "Processor has started up with watchdog disabled.",
    "category": 0,
    "solution": "Remove the WD jumper and restart the board to reenable."
  },
  {
    "id": 94,
    "number": 93,
    "name": "MR CAN Rst 1",
    "tag": "",
    "definition": "Machine room SRU CAN1 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 95,
    "number": 94,
    "name": "MR CAN Rst 2",
    "tag": "",
    "definition": "Machine room SRU CAN2 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 96,
    "number": 95,
    "name": "MR CAN Rst 3",
    "tag": "",
    "definition": "Machine room SRU CAN3 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 97,
    "number": 96,
    "name": "MR CAN Rst 4",
    "tag": "",
    "definition": "Machine room SRU CAN4 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 98,
    "number": 97,
    "name": "CT CAN Rst 1",
    "tag": "",
    "definition": "Car top SRU CAN1 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 99,
    "number": 98,
    "name": "CT CAN Rst 2",
    "tag": "",
    "definition": "Car top SRU CAN2 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 100,
    "number": 99,
    "name": "CT CAN Rst 3",
    "tag": "",
    "definition": "Car top SRU CAN3 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 101,
    "number": 100,
    "name": "CT CAN Rst 4",
    "tag": "",
    "definition": "Car top SRU CAN4 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 102,
    "number": 101,
    "name": "COP CAN Rst 1",
    "tag": "",
    "definition": "Car operating panel SRU CAN1 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 103,
    "number": 102,
    "name": "COP CAN Rst 2",
    "tag": "",
    "definition": "Car operating panel SRU CAN2 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 104,
    "number": 103,
    "name": "COP CAN Rst 3",
    "tag": "",
    "definition": "Car operating panel SRU CAN3 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 105,
    "number": 104,
    "name": "COP CAN Rst 4",
    "tag": "",
    "definition": "Car operating panel SRU CAN4 tranciever has self reset due to excessive bus errors.",
    "category": 0,
    "solution": "Verify bus wiring. If problem perists, remove boards from the network to isolate the board with the problem tranceiver."
  },
  {
    "id": 106,
    "number": 105,
    "name": "Drive Rst",
    "tag": "",
    "definition": "Car is triggering a drive fault reset.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 107,
    "number": 106,
    "name": "Drive Rst Limit",
    "tag": "",
    "definition": "Drive reset limit has been reached.  The controller will no longer reset drive faults.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 108,
    "number": 107,
    "name": "Fully Loaded",
    "tag": "",
    "definition": "The car is fully loaded and will no longer take hall calls.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 109,
    "number": 108,
    "name": "Remote PU 1-Bit",
    "tag": "",
    "definition": "The car has received a remote request to change a 1-bit parameter.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 110,
    "number": 109,
    "name": "Remote PU 8-Bit",
    "tag": "",
    "definition": "The car has received a remote request to change a 8-bit parameter.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 111,
    "number": 110,
    "name": "Remote PU 16-Bit",
    "tag": "",
    "definition": "The car has received a remote request to change a 16-bit parameter.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 112,
    "number": 111,
    "name": "Remote PU 24-Bit",
    "tag": "",
    "definition": "The car has received a remote request to change a 24-bit parameter.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 113,
    "number": 112,
    "name": "Remote PU 32-Bit",
    "tag": "",
    "definition": "The car has received a remote request to change a 32-bit parameter.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 114,
    "number": 113,
    "name": "Remote PU Mag",
    "tag": "",
    "definition": "The car has received a remote request to change a magnetek drive parameter.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 115,
    "number": 114,
    "name": "Remote PU KEB",
    "tag": "",
    "definition": "The car has received a remote request to change a KEB drive parameter.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 116,
    "number": 115,
    "name": "Inv Man Run Door",
    "tag": "",
    "definition": "Manual run request rejected due to invalid car door state.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 117,
    "number": 116,
    "name": "Inv Man Run Lock",
    "tag": "",
    "definition": "Manual run request rejected due to invalid hall lock state.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 118,
    "number": 117,
    "name": "Inv Man Run Arm",
    "tag": "",
    "definition": "Manual run request rejected due to disarmed direction inputs. This may occur if car enters inspection with its direction inputs active.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 119,
    "number": 118,
    "name": "NA",
    "tag": "",
    "definition": "This alarm is unused but is kept as a placeholder for older versions of software.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 120,
    "number": 119,
    "name": "NA",
    "tag": "",
    "definition": "This alarm is unused but is kept as a placeholder for older versions of software.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 121,
    "number": 120,
    "name": "Inv Man Run DOBF",
    "tag": "",
    "definition": "Manual run request rejected due to front door open button request.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 122,
    "number": 121,
    "name": "Inv Man Run DOBR",
    "tag": "",
    "definition": "Manual run request rejected due to rear door open button request.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 123,
    "number": 122,
    "name": "Inv Man Run HA",
    "tag": "",
    "definition": "Manual run request rejected due to invalid hoistway access floor or opening configuration.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 124,
    "number": 123,
    "name": "Inv Man Run CT En",
    "tag": "",
    "definition": "Manual run request rejected due to missing CT enable signal.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 125,
    "number": 124,
    "name": "Idle Dir Timeout",
    "tag": "",
    "definition": "Car has been idle with a valid destination for the user configured timeout (08-202), and has been forced to change direction.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 126,
    "number": 125,
    "name": "CPLD Offline MR",
    "tag": "",
    "definition": "Debugging communication timer with MR CPLD elapsed.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 127,
    "number": 126,
    "name": "CPLD Offline CT",
    "tag": "",
    "definition": "Debugging communication timer with CT CPLD elapsed.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 128,
    "number": 127,
    "name": "CPLD Offline COP",
    "tag": "",
    "definition": "Debugging communication timer with COP CPLD elapsed.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 129,
    "number": 128,
    "name": "No Dest Stop",
    "tag": "",
    "definition": "The car is in motion but its destination has been canceled. There are no reachable alternative destinations. It will ramp down at the next available landing and reassess. This can occur in cases where a hall call is reassigned to a closer car. This will not occur if 01-00196 is ON.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 130,
    "number": 129,
    "name": "Flood Switch",
    "tag": "",
    "definition": "The flood switch has been activated.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 131,
    "number": 130,
    "name": "Remote PU Backup",
    "tag": "",
    "definition": "The car has received a remote request to change parameters in a bulk parameter restore format.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 132,
    "number": 131,
    "name": "Dup EP InterGroup",
    "tag": "",
    "definition": "A Duplicate Group Priority was Detected",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 133,
    "number": 132,
    "name": "I-Group 1 No Connection",
    "tag": "",
    "definition": "Connection was lost for Inter Group 1",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 134,
    "number": 133,
    "name": "I-Group 2 No Connection",
    "tag": "",
    "definition": "Connection was lost for Inter Group 2",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 135,
    "number": 134,
    "name": "I-Group 3 No Connection",
    "tag": "",
    "definition": "Connection was lost for Inter Group 3",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 136,
    "number": 135,
    "name": "I-Group 4 No Connection",
    "tag": "",
    "definition": "Connection was lost for Inter Group 4",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 137,
    "number": 136,
    "name": "I-Group 5 No Connection",
    "tag": "",
    "definition": "Connection was lost for Inter Group 5",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 138,
    "number": 137,
    "name": "I-Group 6 No Connection",
    "tag": "",
    "definition": "Connection was lost for Inter Group 6",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 139,
    "number": 138,
    "name": "I-Group 7 No Connection",
    "tag": "",
    "definition": "Connection was lost for Inter Group 7",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 140,
    "number": 139,
    "name": "I-Group 8 No Connection",
    "tag": "",
    "definition": "Connection was lost for Inter Group 8",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 141,
    "number": 140,
    "name": "I-Group0 Stat Rcvd",
    "tag": "",
    "definition": "Intergroup status packet received by group with priority 0.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 142,
    "number": 141,
    "name": "CCB Secured",
    "tag": "",
    "definition": "Pressed Car Call Button is secured. ",
    "category": 0,
    "solution": "Check security options to verify if the CCB should or should not be secured. "
  },
  {
    "id": 143,
    "number": 142,
    "name": "NA",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 144,
    "number": 143,
    "name": "NA",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 145,
    "number": 144,
    "name": "LWD Load Learn",
    "tag": "",
    "definition": "C4 load weighing device is performing a load learn at each landing.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 146,
    "number": 145,
    "name": "LWD Recalibrate",
    "tag": "",
    "definition": "C4 load weighing device is performing an empty car learn at each landing.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 147,
    "number": 146,
    "name": "Mode Changed",
    "tag": "",
    "definition": "When 01-129 is ON, this debug alarm will be set when the mode of operation changes.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 148,
    "number": 147,
    "name": "RIS1 Offline",
    "tag": "",
    "definition": "Riser1 marked as offline after 30 seconds without communication.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 149,
    "number": 148,
    "name": "RIS1 Unk",
    "tag": "",
    "definition": "Riser1 reporting an unknown error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 150,
    "number": 149,
    "name": "RIS1 POR Rst",
    "tag": "",
    "definition": "Riser1 reporting a power-on reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 151,
    "number": 150,
    "name": "RIS1 WDT Rst",
    "tag": "",
    "definition": "Riser1 reporting a watchdog reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 152,
    "number": 151,
    "name": "RIS1 BOD Rst",
    "tag": "",
    "definition": "Riser1 reporting a brown-out reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 153,
    "number": 152,
    "name": "RIS1 Group Net",
    "tag": "",
    "definition": "Riser1 reporting a group network communication loss error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 154,
    "number": 153,
    "name": "RIS1 Hall Net",
    "tag": "",
    "definition": "Riser1 reporting a hall network communication loss error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 155,
    "number": 154,
    "name": "RIS1 Car Net",
    "tag": "",
    "definition": "Riser1 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 156,
    "number": 155,
    "name": "RIS1 Mst Net",
    "tag": "",
    "definition": "Riser1 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 157,
    "number": 156,
    "name": "RS1 Slv Net",
    "tag": "",
    "definition": "Riser1 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 158,
    "number": 157,
    "name": "RIS1 DIP",
    "tag": "",
    "definition": "Riser1 has detected another board with the same address.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 159,
    "number": 158,
    "name": "RIS1 Bus Rst 1",
    "tag": "",
    "definition": "Riser1 reporting a CAN1 bus reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 160,
    "number": 159,
    "name": "RIS1 Bus Rst 2",
    "tag": "",
    "definition": "Riser1 reporting a CAN2 bus reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 161,
    "number": 160,
    "name": "RIS1 Inv Msg 1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 162,
    "number": 161,
    "name": "RIS1 Inv Msg 2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 163,
    "number": 162,
    "name": "RIS2 Offline",
    "tag": "",
    "definition": "Riser2 marked as offline after 30 seconds without communication.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 164,
    "number": 163,
    "name": "RIS2 Unk",
    "tag": "",
    "definition": "Riser2 reporting an unknown error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 165,
    "number": 164,
    "name": "RIS2 POR Rst",
    "tag": "",
    "definition": "Riser2 reporting a power-on reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 166,
    "number": 165,
    "name": "RIS2 WDT Rst",
    "tag": "",
    "definition": "Riser2 reporting a watchdog reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 167,
    "number": 166,
    "name": "RIS2 BOD Rst",
    "tag": "",
    "definition": "Riser2 reporting a brown-out reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 168,
    "number": 167,
    "name": "RIS2 Group Net",
    "tag": "",
    "definition": "Riser2 reporting a group network communication loss error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 169,
    "number": 168,
    "name": "RIS2 Hall Net",
    "tag": "",
    "definition": "Riser2 reporting a hall network communication loss error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 170,
    "number": 169,
    "name": "RIS2 Car Net",
    "tag": "",
    "definition": "Riser2 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 171,
    "number": 170,
    "name": "RIS2 Mst Net",
    "tag": "",
    "definition": "Riser2 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 172,
    "number": 171,
    "name": "RS1 Slv Net",
    "tag": "",
    "definition": "Riser2 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 173,
    "number": 172,
    "name": "RIS2 DIP",
    "tag": "",
    "definition": "Riser2 has detected another board with the same address.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 174,
    "number": 173,
    "name": "RIS2 Bus Rst 1",
    "tag": "",
    "definition": "Riser2 reporting a CAN1 bus reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 175,
    "number": 174,
    "name": "RIS2 Bus Rst 2",
    "tag": "",
    "definition": "Riser2 reporting a CAN2 bus reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 176,
    "number": 175,
    "name": "RIS2 Inv Msg 1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 177,
    "number": 176,
    "name": "RIS2 Inv Msg 2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 178,
    "number": 177,
    "name": "RIS3 Offline",
    "tag": "",
    "definition": "Riser3 marked as offline after 30 seconds without communication.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 179,
    "number": 178,
    "name": "RIS3 Unk",
    "tag": "",
    "definition": "Riser3 reporting an unknown error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 180,
    "number": 179,
    "name": "RIS3 POR Rst",
    "tag": "",
    "definition": "Riser3 reporting a power-on reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 181,
    "number": 180,
    "name": "RIS3 WDT Rst",
    "tag": "",
    "definition": "Riser3 reporting a watchdog reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 182,
    "number": 181,
    "name": "RIS3 BOD Rst",
    "tag": "",
    "definition": "Riser3 reporting a brown-out reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 183,
    "number": 182,
    "name": "RIS3 Group Net",
    "tag": "",
    "definition": "Riser3 reporting a group network communication loss error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 184,
    "number": 183,
    "name": "RIS3 Hall Net",
    "tag": "",
    "definition": "Riser3 reporting a hall network communication loss error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 185,
    "number": 184,
    "name": "RIS3 Car Net",
    "tag": "",
    "definition": "Riser3 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 186,
    "number": 185,
    "name": "RIS3 Mst Net",
    "tag": "",
    "definition": "Riser3 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 187,
    "number": 186,
    "name": "RS1 Slv Net",
    "tag": "",
    "definition": "Riser3 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 188,
    "number": 187,
    "name": "RIS3 DIP",
    "tag": "",
    "definition": "Riser3 has detected another board with the same address.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 189,
    "number": 188,
    "name": "RIS3 Bus Rst 1",
    "tag": "",
    "definition": "Riser3 reporting a CAN1 bus reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 190,
    "number": 189,
    "name": "RIS3 Bus Rst 2",
    "tag": "",
    "definition": "Riser3 reporting a CAN2 bus reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 191,
    "number": 190,
    "name": "RIS3 Inv Msg 1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 192,
    "number": 191,
    "name": "RIS3 Inv Msg 2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 193,
    "number": 192,
    "name": "RIS4 Offline",
    "tag": "",
    "definition": "Riser4 marked as offline after 30 seconds without communication.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 194,
    "number": 193,
    "name": "RIS4 Unk",
    "tag": "",
    "definition": "Riser4 reporting an unknown error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 195,
    "number": 194,
    "name": "RIS4 POR Rst",
    "tag": "",
    "definition": "Riser4 reporting a power-on reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 196,
    "number": 195,
    "name": "RIS4 WDT Rst",
    "tag": "",
    "definition": "Riser4 reporting a watchdog reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 197,
    "number": 196,
    "name": "RIS4 BOD Rst",
    "tag": "",
    "definition": "Riser4 reporting a brown-out reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 198,
    "number": 197,
    "name": "RIS4 Group Net",
    "tag": "",
    "definition": "Riser4 reporting a group network communication loss error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 199,
    "number": 198,
    "name": "RIS4 Hall Net",
    "tag": "",
    "definition": "Riser4 reporting a hall network communication loss error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 200,
    "number": 199,
    "name": "RIS4 Car Net",
    "tag": "",
    "definition": "Riser4 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 201,
    "number": 200,
    "name": "RIS4 Mst Net",
    "tag": "",
    "definition": "Riser4 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 202,
    "number": 201,
    "name": "RS1 Slv Net",
    "tag": "",
    "definition": "Riser4 reporting an invalid error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 203,
    "number": 202,
    "name": "RIS4 DIP",
    "tag": "",
    "definition": "Riser4 has detected another board with the same address.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 204,
    "number": 203,
    "name": "RIS4 Bus Rst 1",
    "tag": "",
    "definition": "Riser4 reporting a CAN1 bus reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 205,
    "number": 204,
    "name": "RIS4 Bus Rst 2",
    "tag": "",
    "definition": "Riser4 reporting a CAN2 bus reset error.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 206,
    "number": 205,
    "name": "RIS4 Inv Msg 1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 207,
    "number": 206,
    "name": "RIS4 Inv Msg 2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 208,
    "number": 207,
    "name": "Dispatch T/O C1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 209,
    "number": 208,
    "name": "Dispatch T/O C2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 210,
    "number": 209,
    "name": "Dispatch T/O C3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 211,
    "number": 210,
    "name": "Dispatch T/O C4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 212,
    "number": 211,
    "name": "Dispatch T/O C5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 213,
    "number": 212,
    "name": "Dispatch T/O C6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 214,
    "number": 213,
    "name": "Dispatch T/O C7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 215,
    "number": 214,
    "name": "Dispatch T/O C8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 216,
    "number": 215,
    "name": "Dispatch T/O X1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 217,
    "number": 216,
    "name": "Dispatch T/O X2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 218,
    "number": 217,
    "name": "Dispatch T/O X3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 219,
    "number": 218,
    "name": "Dispatch T/O X4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 220,
    "number": 219,
    "name": "Dispatch T/O X5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 221,
    "number": 220,
    "name": "Dispatch T/O X6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 222,
    "number": 221,
    "name": "Dispatch T/O X7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 223,
    "number": 222,
    "name": "Dispatch T/O X8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 224,
    "number": 223,
    "name": "XREG Offline 1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 225,
    "number": 224,
    "name": "XREG Offline 2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 226,
    "number": 225,
    "name": "XREG Offline 3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 227,
    "number": 226,
    "name": "XREG Offline 4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 228,
    "number": 227,
    "name": "XREG Offline 5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 229,
    "number": 228,
    "name": "XREG Offline 6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 230,
    "number": 229,
    "name": "XREG Offline 7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 231,
    "number": 230,
    "name": "XREG Offline 8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 232,
    "number": 231,
    "name": "NA",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 233,
    "number": 232,
    "name": "MRA RT M1",
    "tag": "",
    "definition": "Module runtime limit exceeded for module index 1.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 234,
    "number": 233,
    "name": "MRA RT M2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 235,
    "number": 234,
    "name": "MRA RT M3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 236,
    "number": 235,
    "name": "MRA RT M4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 237,
    "number": 236,
    "name": "MRA RT M5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 238,
    "number": 237,
    "name": "MRA RT M6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 239,
    "number": 238,
    "name": "MRA RT M7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 240,
    "number": 239,
    "name": "MRA RT M8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 241,
    "number": 240,
    "name": "MRA RT M9",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 242,
    "number": 241,
    "name": "MRA RT M10",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 243,
    "number": 242,
    "name": "MRA RT M11",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 244,
    "number": 243,
    "name": "MRA RT M12",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 245,
    "number": 244,
    "name": "MRA RT M13",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 246,
    "number": 245,
    "name": "MRA RT M14",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 247,
    "number": 246,
    "name": "MRA RT M15",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 248,
    "number": 247,
    "name": "MRA RT M16",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 249,
    "number": 248,
    "name": "MRA RT M17",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 250,
    "number": 249,
    "name": "MRA RT M18",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 251,
    "number": 250,
    "name": "MRA RT M19",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 252,
    "number": 251,
    "name": "MRA RT M20",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 253,
    "number": 252,
    "name": "MRA RT M21",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 254,
    "number": 253,
    "name": "MRA RT M22",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 255,
    "number": 254,
    "name": "MRA RT M23",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 256,
    "number": 255,
    "name": "MRA RT M24",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 257,
    "number": 256,
    "name": "MRA RT M25",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 258,
    "number": 257,
    "name": "MRA RT M26",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 259,
    "number": 258,
    "name": "MRA RT M27",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 260,
    "number": 259,
    "name": "MRA RT M28",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 261,
    "number": 260,
    "name": "MRA RT M29",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 262,
    "number": 261,
    "name": "MRA RT M30",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 263,
    "number": 262,
    "name": "MRA RT M31",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 264,
    "number": 263,
    "name": "MRA RT M32",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 265,
    "number": 264,
    "name": "MRA RT M33",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 266,
    "number": 265,
    "name": "MRA RT M34",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 267,
    "number": 266,
    "name": "MRA RT M35",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 268,
    "number": 267,
    "name": "MRA RT M36",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 269,
    "number": 268,
    "name": "MRA RT M37",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 270,
    "number": 269,
    "name": "MRA RT M38",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 271,
    "number": 270,
    "name": "MRA RT M39",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 272,
    "number": 271,
    "name": "MRA RT M40",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 273,
    "number": 272,
    "name": "MRA RT M41",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 274,
    "number": 273,
    "name": "MRA RT M42",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 275,
    "number": 274,
    "name": "MRA RT M43",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 276,
    "number": 275,
    "name": "MRA RT M44",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 277,
    "number": 276,
    "name": "MRA RT M45",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 278,
    "number": 277,
    "name": "MRA RT M46",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 279,
    "number": 278,
    "name": "MRA RT M47",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 280,
    "number": 279,
    "name": "MRA RT M48",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 281,
    "number": 280,
    "name": "MRA RT M49",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 282,
    "number": 281,
    "name": "MRA RT M50",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 283,
    "number": 282,
    "name": "MRA RT M51",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 284,
    "number": 283,
    "name": "MRA RT M52",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 285,
    "number": 284,
    "name": "MRA RT M53",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 286,
    "number": 285,
    "name": "MRA RT M54",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 287,
    "number": 286,
    "name": "MRA RT M55",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 288,
    "number": 287,
    "name": "MRA RT M56",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 289,
    "number": 288,
    "name": "MRA RT M57",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 290,
    "number": 289,
    "name": "MRA RT M58",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 291,
    "number": 290,
    "name": "MRA RT M59",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 292,
    "number": 291,
    "name": "MRA RT M60",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 293,
    "number": 292,
    "name": "MRA RT M61",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 294,
    "number": 293,
    "name": "MRA RT M62",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 295,
    "number": 294,
    "name": "MRA RT M63",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 296,
    "number": 295,
    "name": "MRA RT M64",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 297,
    "number": 296,
    "name": "MRA RT M65",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 298,
    "number": 297,
    "name": "MRA RT M66",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 299,
    "number": 298,
    "name": "MRA RT M67",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 300,
    "number": 299,
    "name": "MRB RT M1",
    "tag": "",
    "definition": "Module runtime limit exceeded for module index 1.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 301,
    "number": 300,
    "name": "MRB RT M2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 302,
    "number": 301,
    "name": "MRB RT M3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 303,
    "number": 302,
    "name": "MRB RT M4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 304,
    "number": 303,
    "name": "MRB RT M5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 305,
    "number": 304,
    "name": "MRB RT M6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 306,
    "number": 305,
    "name": "MRB RT M7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 307,
    "number": 306,
    "name": "MRB RT M8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 308,
    "number": 307,
    "name": "MRB RT M9",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 309,
    "number": 308,
    "name": "MRB RT M10",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 310,
    "number": 309,
    "name": "MRB RT M11",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 311,
    "number": 310,
    "name": "MRB RT M12",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 312,
    "number": 311,
    "name": "MRB RT M13",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 313,
    "number": 312,
    "name": "MRB RT M14",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 314,
    "number": 313,
    "name": "MRB RT M15",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 315,
    "number": 314,
    "name": "MRB RT M16",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 316,
    "number": 315,
    "name": "MRB RT M17",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 317,
    "number": 316,
    "name": "MRB RT M18",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 318,
    "number": 317,
    "name": "MRB RT M19",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 319,
    "number": 318,
    "name": "MRB RT M20",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 320,
    "number": 319,
    "name": "MRB RT M21",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 321,
    "number": 320,
    "name": "MRB RT M22",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 322,
    "number": 321,
    "name": "MRB RT M23",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 323,
    "number": 322,
    "name": "MRB RT M24",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 324,
    "number": 323,
    "name": "MRB RT M25",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 325,
    "number": 324,
    "name": "MRB RT M26",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 326,
    "number": 325,
    "name": "MRB RT M27",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 327,
    "number": 326,
    "name": "MRB RT M28",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 328,
    "number": 327,
    "name": "MRB RT M29",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 329,
    "number": 328,
    "name": "MRB RT M30",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 330,
    "number": 329,
    "name": "MRB RT M31",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 331,
    "number": 330,
    "name": "MRB RT M32",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 332,
    "number": 331,
    "name": "MRB RT M33",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 333,
    "number": 332,
    "name": "MRB RT M34",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 334,
    "number": 333,
    "name": "MRB RT M35",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 335,
    "number": 334,
    "name": "MRB RT M36",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 336,
    "number": 335,
    "name": "MRB RT M37",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 337,
    "number": 336,
    "name": "MRB RT M38",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 338,
    "number": 337,
    "name": "MRB RT M39",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 339,
    "number": 338,
    "name": "MRB RT M40",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 340,
    "number": 339,
    "name": "MRB RT M41",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 341,
    "number": 340,
    "name": "MRB RT M42",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 342,
    "number": 341,
    "name": "MRB RT M43",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 343,
    "number": 342,
    "name": "MRB RT M44",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 344,
    "number": 343,
    "name": "MRB RT M45",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 345,
    "number": 344,
    "name": "MRB RT M46",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 346,
    "number": 345,
    "name": "MRB RT M47",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 347,
    "number": 346,
    "name": "MRB RT M48",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 348,
    "number": 347,
    "name": "MRB RT M49",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 349,
    "number": 348,
    "name": "MRB RT M50",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 350,
    "number": 349,
    "name": "MRB RT M51",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 351,
    "number": 350,
    "name": "MRB RT M52",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 352,
    "number": 351,
    "name": "MRB RT M53",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 353,
    "number": 352,
    "name": "MRB RT M54",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 354,
    "number": 353,
    "name": "MRB RT M55",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 355,
    "number": 354,
    "name": "MRB RT M56",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 356,
    "number": 355,
    "name": "MRB RT M57",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 357,
    "number": 356,
    "name": "MRB RT M58",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 358,
    "number": 357,
    "name": "MRB RT M59",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 359,
    "number": 358,
    "name": "MRB RT M60",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 360,
    "number": 359,
    "name": "MRB RT M61",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 361,
    "number": 360,
    "name": "MRB RT M62",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 362,
    "number": 361,
    "name": "MRB RT M63",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 363,
    "number": 362,
    "name": "MRB RT M64",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 364,
    "number": 363,
    "name": "CTA RT M1",
    "tag": "",
    "definition": "Module runtime limit exceeded for module index 1.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 365,
    "number": 364,
    "name": "CTA RT M2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 366,
    "number": 365,
    "name": "CTA RT M3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 367,
    "number": 366,
    "name": "CTA RT M4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 368,
    "number": 367,
    "name": "CTA RT M5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 369,
    "number": 368,
    "name": "CTA RT M6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 370,
    "number": 369,
    "name": "CTA RT M7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 371,
    "number": 370,
    "name": "CTA RT M8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 372,
    "number": 371,
    "name": "CTA RT M9",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 373,
    "number": 372,
    "name": "CTA RT M10",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 374,
    "number": 373,
    "name": "CTA RT M11",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 375,
    "number": 374,
    "name": "CTA RT M12",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 376,
    "number": 375,
    "name": "CTA RT M13",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 377,
    "number": 376,
    "name": "CTA RT M14",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 378,
    "number": 377,
    "name": "CTA RT M15",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 379,
    "number": 378,
    "name": "CTA RT M16",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 380,
    "number": 379,
    "name": "CTA RT M17",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 381,
    "number": 380,
    "name": "CTA RT M18",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 382,
    "number": 381,
    "name": "CTA RT M19",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 383,
    "number": 382,
    "name": "CTA RT M20",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 384,
    "number": 383,
    "name": "CTA RT M21",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 385,
    "number": 384,
    "name": "CTA RT M22",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 386,
    "number": 385,
    "name": "CTA RT M23",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 387,
    "number": 386,
    "name": "CTA RT M24",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 388,
    "number": 387,
    "name": "CTA RT M25",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 389,
    "number": 388,
    "name": "CTA RT M26",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 390,
    "number": 389,
    "name": "CTA RT M27",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 391,
    "number": 390,
    "name": "CTA RT M28",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 392,
    "number": 391,
    "name": "CTA RT M29",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 393,
    "number": 392,
    "name": "CTA RT M30",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 394,
    "number": 393,
    "name": "CTA RT M31",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 395,
    "number": 394,
    "name": "CTA RT M32",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 396,
    "number": 395,
    "name": "CTA RT M33",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 397,
    "number": 396,
    "name": "CTA RT M34",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 398,
    "number": 397,
    "name": "CTA RT M35",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 399,
    "number": 398,
    "name": "CTA RT M36",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 400,
    "number": 399,
    "name": "CTA RT M37",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 401,
    "number": 400,
    "name": "CTA RT M38",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 402,
    "number": 401,
    "name": "CTA RT M39",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 403,
    "number": 402,
    "name": "CTA RT M40",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 404,
    "number": 403,
    "name": "CTA RT M41",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 405,
    "number": 404,
    "name": "CTA RT M42",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 406,
    "number": 405,
    "name": "CTA RT M43",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 407,
    "number": 406,
    "name": "CTA RT M44",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 408,
    "number": 407,
    "name": "CTA RT M45",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 409,
    "number": 408,
    "name": "CTA RT M46",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 410,
    "number": 409,
    "name": "CTA RT M47",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 411,
    "number": 410,
    "name": "CTA RT M48",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 412,
    "number": 411,
    "name": "CTA RT M49",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 413,
    "number": 412,
    "name": "CTA RT M50",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 414,
    "number": 413,
    "name": "CTA RT M51",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 415,
    "number": 414,
    "name": "CTA RT M52",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 416,
    "number": 415,
    "name": "CTA RT M53",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 417,
    "number": 416,
    "name": "CTA RT M54",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 418,
    "number": 417,
    "name": "CTA RT M55",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 419,
    "number": 418,
    "name": "CTA RT M56",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 420,
    "number": 419,
    "name": "CTA RT M57",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 421,
    "number": 420,
    "name": "CTA RT M58",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 422,
    "number": 421,
    "name": "CTA RT M59",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 423,
    "number": 422,
    "name": "CTA RT M60",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 424,
    "number": 423,
    "name": "CTA RT M61",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 425,
    "number": 424,
    "name": "CTA RT M62",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 426,
    "number": 425,
    "name": "CTA RT M63",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 427,
    "number": 426,
    "name": "CTA RT M64",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 428,
    "number": 427,
    "name": "CTA RT M65",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 429,
    "number": 428,
    "name": "CTB RT M1",
    "tag": "",
    "definition": "Module runtime limit exceeded for module index 1.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 430,
    "number": 429,
    "name": "CTB RT M2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 431,
    "number": 430,
    "name": "CTB RT M3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 432,
    "number": 431,
    "name": "CTB RT M4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 433,
    "number": 432,
    "name": "CTB RT M5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 434,
    "number": 433,
    "name": "CTB RT M6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 435,
    "number": 434,
    "name": "CTB RT M7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 436,
    "number": 435,
    "name": "CTB RT M8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 437,
    "number": 436,
    "name": "CTB RT M9",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 438,
    "number": 437,
    "name": "CTB RT M10",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 439,
    "number": 438,
    "name": "CTB RT M11",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 440,
    "number": 439,
    "name": "CTB RT M12",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 441,
    "number": 440,
    "name": "CTB RT M13",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 442,
    "number": 441,
    "name": "CTB RT M14",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 443,
    "number": 442,
    "name": "CTB RT M15",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 444,
    "number": 443,
    "name": "CTB RT M16",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 445,
    "number": 444,
    "name": "CTB RT M17",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 446,
    "number": 445,
    "name": "CTB RT M18",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 447,
    "number": 446,
    "name": "CTB RT M19",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 448,
    "number": 447,
    "name": "CTB RT M20",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 449,
    "number": 448,
    "name": "CTB RT M21",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 450,
    "number": 449,
    "name": "CTB RT M22",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 451,
    "number": 450,
    "name": "CTB RT M23",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 452,
    "number": 451,
    "name": "CTB RT M24",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 453,
    "number": 452,
    "name": "CTB RT M25",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 454,
    "number": 453,
    "name": "CTB RT M26",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 455,
    "number": 454,
    "name": "CTB RT M27",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 456,
    "number": 455,
    "name": "CTB RT M28",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 457,
    "number": 456,
    "name": "CTB RT M29",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 458,
    "number": 457,
    "name": "CTB RT M30",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 459,
    "number": 458,
    "name": "CTB RT M31",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 460,
    "number": 459,
    "name": "CTB RT M32",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 461,
    "number": 460,
    "name": "CTB RT M33",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 462,
    "number": 461,
    "name": "CTB RT M34",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 463,
    "number": 462,
    "name": "CTB RT M35",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 464,
    "number": 463,
    "name": "CTB RT M36",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 465,
    "number": 464,
    "name": "CTB RT M37",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 466,
    "number": 465,
    "name": "CTB RT M38",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 467,
    "number": 466,
    "name": "CTB RT M39",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 468,
    "number": 467,
    "name": "CTB RT M40",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 469,
    "number": 468,
    "name": "CTB RT M41",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 470,
    "number": 469,
    "name": "CTB RT M42",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 471,
    "number": 470,
    "name": "CTB RT M43",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 472,
    "number": 471,
    "name": "CTB RT M44",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 473,
    "number": 472,
    "name": "CTB RT M45",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 474,
    "number": 473,
    "name": "CTB RT M46",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 475,
    "number": 474,
    "name": "CTB RT M47",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 476,
    "number": 475,
    "name": "CTB RT M48",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 477,
    "number": 476,
    "name": "CTB RT M49",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 478,
    "number": 477,
    "name": "CTB RT M50",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 479,
    "number": 478,
    "name": "CTB RT M51",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 480,
    "number": 479,
    "name": "CTB RT M52",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 481,
    "number": 480,
    "name": "CTB RT M53",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 482,
    "number": 481,
    "name": "CTB RT M54",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 483,
    "number": 482,
    "name": "CTB RT M55",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 484,
    "number": 483,
    "name": "CTB RT M56",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 485,
    "number": 484,
    "name": "CTB RT M57",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 486,
    "number": 485,
    "name": "CTB RT M58",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 487,
    "number": 486,
    "name": "CTB RT M59",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 488,
    "number": 487,
    "name": "CTB RT M60",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 489,
    "number": 488,
    "name": "CTB RT M61",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 490,
    "number": 489,
    "name": "CTB RT M62",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 491,
    "number": 490,
    "name": "CTB RT M63",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 492,
    "number": 491,
    "name": "CTB RT M64",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 493,
    "number": 492,
    "name": "COPA RT M1",
    "tag": "",
    "definition": "Module runtime limit exceeded for module index 1.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 494,
    "number": 493,
    "name": "COPA RT M2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 495,
    "number": 494,
    "name": "COPA RT M3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 496,
    "number": 495,
    "name": "COPA RT M4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 497,
    "number": 496,
    "name": "COPA RT M5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 498,
    "number": 497,
    "name": "COPA RT M6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 499,
    "number": 498,
    "name": "COPA RT M7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 500,
    "number": 499,
    "name": "COPA RT M8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 501,
    "number": 500,
    "name": "COPA RT M9",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 502,
    "number": 501,
    "name": "COPA RT M10",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 503,
    "number": 502,
    "name": "COPA RT M11",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 504,
    "number": 503,
    "name": "COPA RT M12",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 505,
    "number": 504,
    "name": "COPA RT M13",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 506,
    "number": 505,
    "name": "COPA RT M14",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 507,
    "number": 506,
    "name": "COPA RT M15",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 508,
    "number": 507,
    "name": "COPA RT M16",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 509,
    "number": 508,
    "name": "COPA RT M17",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 510,
    "number": 509,
    "name": "COPA RT M18",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 511,
    "number": 510,
    "name": "COPA RT M19",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 512,
    "number": 511,
    "name": "COPA RT M20",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 513,
    "number": 512,
    "name": "COPA RT M21",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 514,
    "number": 513,
    "name": "COPA RT M22",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 515,
    "number": 514,
    "name": "COPA RT M23",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 516,
    "number": 515,
    "name": "COPA RT M24",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 517,
    "number": 516,
    "name": "COPA RT M25",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 518,
    "number": 517,
    "name": "COPA RT M26",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 519,
    "number": 518,
    "name": "COPA RT M27",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 520,
    "number": 519,
    "name": "COPA RT M28",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 521,
    "number": 520,
    "name": "COPA RT M29",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 522,
    "number": 521,
    "name": "COPA RT M30",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 523,
    "number": 522,
    "name": "COPA RT M31",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 524,
    "number": 523,
    "name": "COPA RT M32",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 525,
    "number": 524,
    "name": "COPA RT M33",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 526,
    "number": 525,
    "name": "COPA RT M34",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 527,
    "number": 526,
    "name": "COPA RT M35",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 528,
    "number": 527,
    "name": "COPA RT M36",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 529,
    "number": 528,
    "name": "COPA RT M37",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 530,
    "number": 529,
    "name": "COPA RT M38",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 531,
    "number": 530,
    "name": "COPA RT M39",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 532,
    "number": 531,
    "name": "COPA RT M40",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 533,
    "number": 532,
    "name": "COPA RT M41",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 534,
    "number": 533,
    "name": "COPA RT M42",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 535,
    "number": 534,
    "name": "COPA RT M43",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 536,
    "number": 535,
    "name": "COPA RT M44",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 537,
    "number": 536,
    "name": "COPA RT M45",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 538,
    "number": 537,
    "name": "COPA RT M46",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 539,
    "number": 538,
    "name": "COPA RT M47",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 540,
    "number": 539,
    "name": "COPA RT M48",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 541,
    "number": 540,
    "name": "COPA RT M49",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 542,
    "number": 541,
    "name": "COPA RT M50",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 543,
    "number": 542,
    "name": "COPA RT M51",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 544,
    "number": 543,
    "name": "COPA RT M52",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 545,
    "number": 544,
    "name": "COPA RT M53",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 546,
    "number": 545,
    "name": "COPA RT M54",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 547,
    "number": 546,
    "name": "COPA RT M55",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 548,
    "number": 547,
    "name": "COPA RT M56",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 549,
    "number": 548,
    "name": "COPA RT M57",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 550,
    "number": 549,
    "name": "COPA RT M58",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 551,
    "number": 550,
    "name": "COPA RT M59",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 552,
    "number": 551,
    "name": "COPA RT M60",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 553,
    "number": 552,
    "name": "COPA RT M61",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 554,
    "number": 553,
    "name": "COPA RT M62",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 555,
    "number": 554,
    "name": "COPA RT M63",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 556,
    "number": 555,
    "name": "COPA RT M64",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 557,
    "number": 556,
    "name": "COPB RT M1",
    "tag": "",
    "definition": "Module runtime limit exceeded for module index 1.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 558,
    "number": 557,
    "name": "COPB RT M2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 559,
    "number": 558,
    "name": "COPB RT M3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 560,
    "number": 559,
    "name": "COPB RT M4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 561,
    "number": 560,
    "name": "COPB RT M5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 562,
    "number": 561,
    "name": "COPB RT M6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 563,
    "number": 562,
    "name": "COPB RT M7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 564,
    "number": 563,
    "name": "COPB RT M8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 565,
    "number": 564,
    "name": "COPB RT M9",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 566,
    "number": 565,
    "name": "COPB RT M10",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 567,
    "number": 566,
    "name": "COPB RT M11",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 568,
    "number": 567,
    "name": "COPB RT M12",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 569,
    "number": 568,
    "name": "COPB RT M13",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 570,
    "number": 569,
    "name": "COPB RT M14",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 571,
    "number": 570,
    "name": "COPB RT M15",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 572,
    "number": 571,
    "name": "COPB RT M16",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 573,
    "number": 572,
    "name": "COPB RT M17",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "N/A"
  },
  {
    "id": 574,
    "number": 573,
    "name": "COPB RT M18",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 575,
    "number": 574,
    "name": "COPB RT M19",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 576,
    "number": 575,
    "name": "COPB RT M20",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 577,
    "number": 576,
    "name": "COPB RT M21",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 578,
    "number": 577,
    "name": "COPB RT M22",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 579,
    "number": 578,
    "name": "COPB RT M23",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 580,
    "number": 579,
    "name": "COPB RT M24",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 581,
    "number": 580,
    "name": "COPB RT M25",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 582,
    "number": 581,
    "name": "COPB RT M26",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 583,
    "number": 582,
    "name": "COPB RT M27",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 584,
    "number": 583,
    "name": "COPB RT M28",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 585,
    "number": 584,
    "name": "COPB RT M29",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 586,
    "number": 585,
    "name": "COPB RT M30",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 587,
    "number": 586,
    "name": "COPB RT M31",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 588,
    "number": 587,
    "name": "COPB RT M32",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 589,
    "number": 588,
    "name": "COPB RT M33",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 590,
    "number": 589,
    "name": "COPB RT M34",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 591,
    "number": 590,
    "name": "COPB RT M35",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 592,
    "number": 591,
    "name": "COPB RT M36",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 593,
    "number": 592,
    "name": "COPB RT M37",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 594,
    "number": 593,
    "name": "COPB RT M38",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 595,
    "number": 594,
    "name": "COPB RT M39",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 596,
    "number": 595,
    "name": "COPB RT M40",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 597,
    "number": 596,
    "name": "COPB RT M41",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 598,
    "number": 597,
    "name": "COPB RT M42",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 599,
    "number": 598,
    "name": "COPB RT M43",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 600,
    "number": 599,
    "name": "COPB RT M44",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 601,
    "number": 600,
    "name": "COPB RT M45",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 602,
    "number": 601,
    "name": "COPB RT M46",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 603,
    "number": 602,
    "name": "COPB RT M47",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 604,
    "number": 603,
    "name": "COPB RT M48",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 605,
    "number": 604,
    "name": "COPB RT M49",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 606,
    "number": 605,
    "name": "COPB RT M50",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 607,
    "number": 606,
    "name": "COPB RT M51",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 608,
    "number": 607,
    "name": "COPB RT M52",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 609,
    "number": 608,
    "name": "COPB RT M53",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 610,
    "number": 609,
    "name": "COPB RT M54",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 611,
    "number": 610,
    "name": "COPB RT M55",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 612,
    "number": 611,
    "name": "COPB RT M56",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 613,
    "number": 612,
    "name": "COPB RT M57",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 614,
    "number": 613,
    "name": "COPB RT M58",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 615,
    "number": 614,
    "name": "COPB RT M59",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 616,
    "number": 615,
    "name": "COPB RT M60",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 617,
    "number": 616,
    "name": "COPB RT M61",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 618,
    "number": 617,
    "name": "COPB RT M62",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 619,
    "number": 618,
    "name": "COPB RT M63",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 620,
    "number": 619,
    "name": "COPB RT M64",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 621,
    "number": 620,
    "name": "Car Offline 1",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 622,
    "number": 621,
    "name": "Car Offline 2",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 623,
    "number": 622,
    "name": "Car Offline 3",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 624,
    "number": 623,
    "name": "Car Offline 4",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 625,
    "number": 624,
    "name": "Car Offline 5",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 626,
    "number": 625,
    "name": "Car Offline 6",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 627,
    "number": 626,
    "name": "Car Offline 7",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 628,
    "number": 627,
    "name": "Car Offline 8",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 629,
    "number": 628,
    "name": "DDM Offline",
    "tag": "",
    "definition": "DD Panel manager board has gone offline.",
    "category": 0,
    "solution": "Check DD manager board wiring."
  },
  {
    "id": 630,
    "number": 629,
    "name": "Door Open In Motion",
    "tag": "",
    "definition": "Test alarm signaling that both locks and gsw are open while in motion. Enabled with 01-159.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 631,
    "number": 630,
    "name": "FRAM Redundancy",
    "tag": "",
    "definition": "FRAM's data redundancy check has failed, but the data was recovered.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 632,
    "number": 631,
    "name": "DO During Run",
    "tag": "",
    "definition": "Debugging alarm signalling that DO output asserted during a run. Will not flag if decelerating, in stop sequence, or releveling.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 633,
    "number": 632,
    "name": "In Dest DZ During Run",
    "tag": "",
    "definition": "Debugging alarm signalling that the flag preventing DO is being lost during a run. Will not flag if decelerating, in stop sequence, or releveling.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 634,
    "number": 633,
    "name": "Dupl. MR 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 635,
    "number": 634,
    "name": "Dupl. MR 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 636,
    "number": 635,
    "name": "Dupl. MR 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 637,
    "number": 636,
    "name": "Dupl. MR 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 638,
    "number": 637,
    "name": "Dupl. MR 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 639,
    "number": 638,
    "name": "Dupl. MR 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 640,
    "number": 639,
    "name": "Dupl. MR 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 641,
    "number": 640,
    "name": "Dupl. MR 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 642,
    "number": 641,
    "name": "Dupl. CT 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 643,
    "number": 642,
    "name": "Dupl. CT 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 644,
    "number": 643,
    "name": "Dupl. CT 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 645,
    "number": 644,
    "name": "Dupl. CT 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 646,
    "number": 645,
    "name": "Dupl. CT 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 647,
    "number": 646,
    "name": "Dupl. CT 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 648,
    "number": 647,
    "name": "Dupl. CT 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 649,
    "number": 648,
    "name": "Dupl. CT 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 650,
    "number": 649,
    "name": "Dupl. CT 509",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 651,
    "number": 650,
    "name": "Dupl. CT 510",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 652,
    "number": 651,
    "name": "Dupl. CT 511",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 653,
    "number": 652,
    "name": "Dupl. CT 512",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 654,
    "number": 653,
    "name": "Dupl. CT 513",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 655,
    "number": 654,
    "name": "Dupl. CT 514",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 656,
    "number": 655,
    "name": "Dupl. CT 515",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 657,
    "number": 656,
    "name": "Dupl. CT 516",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 658,
    "number": 657,
    "name": "Dupl. COP 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 659,
    "number": 658,
    "name": "Dupl. COP 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 660,
    "number": 659,
    "name": "Dupl. COP 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 661,
    "number": 660,
    "name": "Dupl. COP 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 662,
    "number": 661,
    "name": "Dupl. COP 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 663,
    "number": 662,
    "name": "Dupl. COP 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 664,
    "number": 663,
    "name": "Dupl. COP 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 665,
    "number": 664,
    "name": "Dupl. COP 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 666,
    "number": 665,
    "name": "Dupl. COP 509",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 667,
    "number": 666,
    "name": "Dupl. COP 510",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 668,
    "number": 667,
    "name": "Dupl. COP 511",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 669,
    "number": 668,
    "name": "Dupl. COP 512",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 670,
    "number": 669,
    "name": "Dupl. COP 513",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 671,
    "number": 670,
    "name": "Dupl. COP 514",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 672,
    "number": 671,
    "name": "Dupl. COP 515",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 673,
    "number": 672,
    "name": "Dupl. COP 516",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 674,
    "number": 673,
    "name": "Dupl. RIS1 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 675,
    "number": 674,
    "name": "Dupl. RIS1 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 676,
    "number": 675,
    "name": "Dupl. RIS1 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 677,
    "number": 676,
    "name": "Dupl. RIS1 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 678,
    "number": 677,
    "name": "Dupl. RIS1 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 679,
    "number": 678,
    "name": "Dupl. RIS1 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 680,
    "number": 679,
    "name": "Dupl. RIS1 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 681,
    "number": 680,
    "name": "Dupl. RIS1 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 682,
    "number": 681,
    "name": "Dupl. RIS2 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 683,
    "number": 682,
    "name": "Dupl. RIS2 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 684,
    "number": 683,
    "name": "Dupl. RIS2 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 685,
    "number": 684,
    "name": "Dupl. RIS2 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 686,
    "number": 685,
    "name": "Dupl. RIS2 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 687,
    "number": 686,
    "name": "Dupl. RIS2 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 688,
    "number": 687,
    "name": "Dupl. RIS2 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 689,
    "number": 688,
    "name": "Dupl. RIS2 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 690,
    "number": 689,
    "name": "Dupl. RIS3 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 691,
    "number": 690,
    "name": "Dupl. RIS3 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 692,
    "number": 691,
    "name": "Dupl. RIS3 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 693,
    "number": 692,
    "name": "Dupl. RIS3 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 694,
    "number": 693,
    "name": "Dupl. RIS3 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 695,
    "number": 694,
    "name": "Dupl. RIS3 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 696,
    "number": 695,
    "name": "Dupl. RIS3 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 697,
    "number": 696,
    "name": "Dupl. RIS3 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 698,
    "number": 697,
    "name": "Dupl. RIS4 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 699,
    "number": 698,
    "name": "Dupl. RIS4 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 700,
    "number": 699,
    "name": "Dupl. RIS4 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 701,
    "number": 700,
    "name": "Dupl. RIS4 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 702,
    "number": 701,
    "name": "Dupl. RIS4 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 703,
    "number": 702,
    "name": "Dupl. RIS4 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 704,
    "number": 703,
    "name": "Dupl. RIS4 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 705,
    "number": 704,
    "name": "Dupl. RIS4 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 706,
    "number": 705,
    "name": "Dupl. EXP1 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 707,
    "number": 706,
    "name": "Dupl. EXP1 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 708,
    "number": 707,
    "name": "Dupl. EXP1 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 709,
    "number": 708,
    "name": "Dupl. EXP1 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 710,
    "number": 709,
    "name": "Dupl. EXP1 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 711,
    "number": 710,
    "name": "Dupl. EXP1 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 712,
    "number": 711,
    "name": "Dupl. EXP1 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 713,
    "number": 712,
    "name": "Dupl. EXP1 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 714,
    "number": 713,
    "name": "Dupl. EXP2 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 715,
    "number": 714,
    "name": "Dupl. EXP2 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 716,
    "number": 715,
    "name": "Dupl. EXP2 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 717,
    "number": 716,
    "name": "Dupl. EXP2 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 718,
    "number": 717,
    "name": "Dupl. EXP2 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 719,
    "number": 718,
    "name": "Dupl. EXP2 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 720,
    "number": 719,
    "name": "Dupl. EXP2 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 721,
    "number": 720,
    "name": "Dupl. EXP2 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 722,
    "number": 721,
    "name": "Dupl. EXP3 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 723,
    "number": 722,
    "name": "Dupl. EXP3 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 724,
    "number": 723,
    "name": "Dupl. EXP3 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 725,
    "number": 724,
    "name": "Dupl. EXP3 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 726,
    "number": 725,
    "name": "Dupl. EXP3 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 727,
    "number": 726,
    "name": "Dupl. EXP3 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 728,
    "number": 727,
    "name": "Dupl. EXP3 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 729,
    "number": 728,
    "name": "Dupl. EXP3 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 730,
    "number": 729,
    "name": "Dupl. EXP4 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 731,
    "number": 730,
    "name": "Dupl. EXP4 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 732,
    "number": 731,
    "name": "Dupl. EXP4 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 733,
    "number": 732,
    "name": "Dupl. EXP4 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 734,
    "number": 733,
    "name": "Dupl. EXP4 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 735,
    "number": 734,
    "name": "Dupl. EXP4 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 736,
    "number": 735,
    "name": "Dupl. EXP4 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 737,
    "number": 736,
    "name": "Dupl. EXP4 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 738,
    "number": 737,
    "name": "Dupl. EXP5 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 739,
    "number": 738,
    "name": "Dupl. EXP5 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 740,
    "number": 739,
    "name": "Dupl. EXP5 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 741,
    "number": 740,
    "name": "Dupl. EXP5 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 742,
    "number": 741,
    "name": "Dupl. EXP5 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 743,
    "number": 742,
    "name": "Dupl. EXP5 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 744,
    "number": 743,
    "name": "Dupl. EXP5 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 745,
    "number": 744,
    "name": "Dupl. EXP5 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 746,
    "number": 745,
    "name": "Dupl. EXP6 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 747,
    "number": 746,
    "name": "Dupl. EXP6 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 748,
    "number": 747,
    "name": "Dupl. EXP6 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 749,
    "number": 748,
    "name": "Dupl. EXP6 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 750,
    "number": 749,
    "name": "Dupl. EXP6 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 751,
    "number": 750,
    "name": "Dupl. EXP6 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 752,
    "number": 751,
    "name": "Dupl. EXP6 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 753,
    "number": 752,
    "name": "Dupl. EXP6 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 754,
    "number": 753,
    "name": "Dupl. EXP7 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 755,
    "number": 754,
    "name": "Dupl. EXP7 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 756,
    "number": 755,
    "name": "Dupl. EXP7 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 757,
    "number": 756,
    "name": "Dupl. EXP7 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 758,
    "number": 757,
    "name": "Dupl. EXP7 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 759,
    "number": 758,
    "name": "Dupl. EXP7 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 760,
    "number": 759,
    "name": "Dupl. EXP7 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 761,
    "number": 760,
    "name": "Dupl. EXP7 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 762,
    "number": 761,
    "name": "Dupl. EXP8 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 763,
    "number": 762,
    "name": "Dupl. EXP8 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 764,
    "number": 763,
    "name": "Dupl. EXP8 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 765,
    "number": 764,
    "name": "Dupl. EXP8 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 766,
    "number": 765,
    "name": "Dupl. EXP8 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 767,
    "number": 766,
    "name": "Dupl. EXP8 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 768,
    "number": 767,
    "name": "Dupl. EXP8 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 769,
    "number": 768,
    "name": "Dupl. EXP8 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 770,
    "number": 769,
    "name": "Dupl. EXP9 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 771,
    "number": 770,
    "name": "Dupl. EXP9 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 772,
    "number": 771,
    "name": "Dupl. EXP9 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 773,
    "number": 772,
    "name": "Dupl. EXP9 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 774,
    "number": 773,
    "name": "Dupl. EXP9 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 775,
    "number": 774,
    "name": "Dupl. EXP9 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 776,
    "number": 775,
    "name": "Dupl. EXP9 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 777,
    "number": 776,
    "name": "Dupl. EXP9 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 778,
    "number": 777,
    "name": "Dupl. EXP10 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 779,
    "number": 778,
    "name": "Dupl. EXP10 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 780,
    "number": 779,
    "name": "Dupl. EXP10 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 781,
    "number": 780,
    "name": "Dupl. EXP10 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 782,
    "number": 781,
    "name": "Dupl. EXP10 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 783,
    "number": 782,
    "name": "Dupl. EXP10 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 784,
    "number": 783,
    "name": "Dupl. EXP10 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 785,
    "number": 784,
    "name": "Dupl. EXP10 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 786,
    "number": 785,
    "name": "Dupl. EXP11 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 787,
    "number": 786,
    "name": "Dupl. EXP11 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 788,
    "number": 787,
    "name": "Dupl. EXP11 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 789,
    "number": 788,
    "name": "Dupl. EXP11 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 790,
    "number": 789,
    "name": "Dupl. EXP11 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 791,
    "number": 790,
    "name": "Dupl. EXP11 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 792,
    "number": 791,
    "name": "Dupl. EXP11 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 793,
    "number": 792,
    "name": "Dupl. EXP11 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 794,
    "number": 793,
    "name": "Dupl. EXP12 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 795,
    "number": 794,
    "name": "Dupl. EXP12 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 796,
    "number": 795,
    "name": "Dupl. EXP12 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 797,
    "number": 796,
    "name": "Dupl. EXP12 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 798,
    "number": 797,
    "name": "Dupl. EXP12 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 799,
    "number": 798,
    "name": "Dupl. EXP12 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 800,
    "number": 799,
    "name": "Dupl. EXP12 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 801,
    "number": 800,
    "name": "Dupl. EXP12 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 802,
    "number": 801,
    "name": "Dupl. EXP13 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 803,
    "number": 802,
    "name": "Dupl. EXP13 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 804,
    "number": 803,
    "name": "Dupl. EXP13 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 805,
    "number": 804,
    "name": "Dupl. EXP13 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 806,
    "number": 805,
    "name": "Dupl. EXP13 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 807,
    "number": 806,
    "name": "Dupl. EXP13 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 808,
    "number": 807,
    "name": "Dupl. EXP13 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 809,
    "number": 808,
    "name": "Dupl. EXP13 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 810,
    "number": 809,
    "name": "Dupl. EXP14 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 811,
    "number": 810,
    "name": "Dupl. EXP14 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 812,
    "number": 811,
    "name": "Dupl. EXP14 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 813,
    "number": 812,
    "name": "Dupl. EXP14 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 814,
    "number": 813,
    "name": "Dupl. EXP14 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 815,
    "number": 814,
    "name": "Dupl. EXP14 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 816,
    "number": 815,
    "name": "Dupl. EXP14 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 817,
    "number": 816,
    "name": "Dupl. EXP14 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 818,
    "number": 817,
    "name": "Dupl. EXP15 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 819,
    "number": 818,
    "name": "Dupl. EXP15 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 820,
    "number": 819,
    "name": "Dupl. EXP15 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 821,
    "number": 820,
    "name": "Dupl. EXP15 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 822,
    "number": 821,
    "name": "Dupl. EXP15 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 823,
    "number": 822,
    "name": "Dupl. EXP15 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 824,
    "number": 823,
    "name": "Dupl. EXP15 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 825,
    "number": 824,
    "name": "Dupl. EXP15 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 826,
    "number": 825,
    "name": "Dupl. EXP16 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 827,
    "number": 826,
    "name": "Dupl. EXP16 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 828,
    "number": 827,
    "name": "Dupl. EXP16 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 829,
    "number": 828,
    "name": "Dupl. EXP16 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 830,
    "number": 829,
    "name": "Dupl. EXP16 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 831,
    "number": 830,
    "name": "Dupl. EXP16 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 832,
    "number": 831,
    "name": "Dupl. EXP16 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 833,
    "number": 832,
    "name": "Dupl. EXP16 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 834,
    "number": 833,
    "name": "Dupl. EXP17 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 835,
    "number": 834,
    "name": "Dupl. EXP17 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 836,
    "number": 835,
    "name": "Dupl. EXP17 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 837,
    "number": 836,
    "name": "Dupl. EXP17 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 838,
    "number": 837,
    "name": "Dupl. EXP17 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 839,
    "number": 838,
    "name": "Dupl. EXP17 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 840,
    "number": 839,
    "name": "Dupl. EXP17 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 841,
    "number": 840,
    "name": "Dupl. EXP17 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 842,
    "number": 841,
    "name": "Dupl. EXP18 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 843,
    "number": 842,
    "name": "Dupl. EXP18 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 844,
    "number": 843,
    "name": "Dupl. EXP18 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 845,
    "number": 844,
    "name": "Dupl. EXP18 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 846,
    "number": 845,
    "name": "Dupl. EXP18 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 847,
    "number": 846,
    "name": "Dupl. EXP18 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 848,
    "number": 847,
    "name": "Dupl. EXP18 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 849,
    "number": 848,
    "name": "Dupl. EXP18 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 850,
    "number": 849,
    "name": "Dupl. EXP19 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 851,
    "number": 850,
    "name": "Dupl. EXP19 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 852,
    "number": 851,
    "name": "Dupl. EXP19 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 853,
    "number": 852,
    "name": "Dupl. EXP19 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 854,
    "number": 853,
    "name": "Dupl. EXP19 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 855,
    "number": 854,
    "name": "Dupl. EXP19 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 856,
    "number": 855,
    "name": "Dupl. EXP19 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 857,
    "number": 856,
    "name": "Dupl. EXP19 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 858,
    "number": 857,
    "name": "Dupl. EXP20 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 859,
    "number": 858,
    "name": "Dupl. EXP20 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 860,
    "number": 859,
    "name": "Dupl. EXP20 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 861,
    "number": 860,
    "name": "Dupl. EXP20 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 862,
    "number": 861,
    "name": "Dupl. EXP20 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 863,
    "number": 862,
    "name": "Dupl. EXP20 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 864,
    "number": 863,
    "name": "Dupl. EXP20 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 865,
    "number": 864,
    "name": "Dupl. EXP20 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 866,
    "number": 865,
    "name": "Dupl. EXP21 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 867,
    "number": 866,
    "name": "Dupl. EXP21 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 868,
    "number": 867,
    "name": "Dupl. EXP21 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 869,
    "number": 868,
    "name": "Dupl. EXP21 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 870,
    "number": 869,
    "name": "Dupl. EXP21 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 871,
    "number": 870,
    "name": "Dupl. EXP21 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 872,
    "number": 871,
    "name": "Dupl. EXP21 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 873,
    "number": 872,
    "name": "Dupl. EXP21 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 874,
    "number": 873,
    "name": "Dupl. EXP22 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 875,
    "number": 874,
    "name": "Dupl. EXP22 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 876,
    "number": 875,
    "name": "Dupl. EXP22 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 877,
    "number": 876,
    "name": "Dupl. EXP22 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 878,
    "number": 877,
    "name": "Dupl. EXP22 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 879,
    "number": 878,
    "name": "Dupl. EXP22 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 880,
    "number": 879,
    "name": "Dupl. EXP22 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 881,
    "number": 880,
    "name": "Dupl. EXP22 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 882,
    "number": 881,
    "name": "Dupl. EXP23 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 883,
    "number": 882,
    "name": "Dupl. EXP23 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 884,
    "number": 883,
    "name": "Dupl. EXP23 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 885,
    "number": 884,
    "name": "Dupl. EXP23 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 886,
    "number": 885,
    "name": "Dupl. EXP23 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 887,
    "number": 886,
    "name": "Dupl. EXP23 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 888,
    "number": 887,
    "name": "Dupl. EXP23 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 889,
    "number": 888,
    "name": "Dupl. EXP23 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 890,
    "number": 889,
    "name": "Dupl. EXP24 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 891,
    "number": 890,
    "name": "Dupl. EXP24 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 892,
    "number": 891,
    "name": "Dupl. EXP24 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 893,
    "number": 892,
    "name": "Dupl. EXP24 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 894,
    "number": 893,
    "name": "Dupl. EXP24 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 895,
    "number": 894,
    "name": "Dupl. EXP24 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 896,
    "number": 895,
    "name": "Dupl. EXP24 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 897,
    "number": 896,
    "name": "Dupl. EXP24 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 898,
    "number": 897,
    "name": "Dupl. EXP25 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 899,
    "number": 898,
    "name": "Dupl. EXP25 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 900,
    "number": 899,
    "name": "Dupl. EXP25 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 901,
    "number": 900,
    "name": "Dupl. EXP25 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 902,
    "number": 901,
    "name": "Dupl. EXP25 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 903,
    "number": 902,
    "name": "Dupl. EXP25 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 904,
    "number": 903,
    "name": "Dupl. EXP25 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 905,
    "number": 904,
    "name": "Dupl. EXP25 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 906,
    "number": 905,
    "name": "Dupl. EXP26 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 907,
    "number": 906,
    "name": "Dupl. EXP26 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 908,
    "number": 907,
    "name": "Dupl. EXP26 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 909,
    "number": 908,
    "name": "Dupl. EXP26 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 910,
    "number": 909,
    "name": "Dupl. EXP26 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 911,
    "number": 910,
    "name": "Dupl. EXP26 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 912,
    "number": 911,
    "name": "Dupl. EXP26 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 913,
    "number": 912,
    "name": "Dupl. EXP26 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 914,
    "number": 913,
    "name": "Dupl. EXP27 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 915,
    "number": 914,
    "name": "Dupl. EXP27 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 916,
    "number": 915,
    "name": "Dupl. EXP27 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 917,
    "number": 916,
    "name": "Dupl. EXP27 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 918,
    "number": 917,
    "name": "Dupl. EXP27 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 919,
    "number": 918,
    "name": "Dupl. EXP27 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 920,
    "number": 919,
    "name": "Dupl. EXP27 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 921,
    "number": 920,
    "name": "Dupl. EXP27 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 922,
    "number": 921,
    "name": "Dupl. EXP28 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 923,
    "number": 922,
    "name": "Dupl. EXP28 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 924,
    "number": 923,
    "name": "Dupl. EXP28 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 925,
    "number": 924,
    "name": "Dupl. EXP28 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 926,
    "number": 925,
    "name": "Dupl. EXP28 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 927,
    "number": 926,
    "name": "Dupl. EXP28 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 928,
    "number": 927,
    "name": "Dupl. EXP28 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 929,
    "number": 928,
    "name": "Dupl. EXP28 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 930,
    "number": 929,
    "name": "Dupl. EXP29 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 931,
    "number": 930,
    "name": "Dupl. EXP29 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 932,
    "number": 931,
    "name": "Dupl. EXP29 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 933,
    "number": 932,
    "name": "Dupl. EXP29 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 934,
    "number": 933,
    "name": "Dupl. EXP29 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 935,
    "number": 934,
    "name": "Dupl. EXP29 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 936,
    "number": 935,
    "name": "Dupl. EXP29 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 937,
    "number": 936,
    "name": "Dupl. EXP29 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 938,
    "number": 937,
    "name": "Dupl. EXP30 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 939,
    "number": 938,
    "name": "Dupl. EXP30 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 940,
    "number": 939,
    "name": "Dupl. EXP30 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 941,
    "number": 940,
    "name": "Dupl. EXP30 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 942,
    "number": 941,
    "name": "Dupl. EXP30 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 943,
    "number": 942,
    "name": "Dupl. EXP30 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 944,
    "number": 943,
    "name": "Dupl. EXP30 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 945,
    "number": 944,
    "name": "Dupl. EXP30 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 946,
    "number": 945,
    "name": "Dupl. EXP31 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 947,
    "number": 946,
    "name": "Dupl. EXP31 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 948,
    "number": 947,
    "name": "Dupl. EXP31 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 949,
    "number": 948,
    "name": "Dupl. EXP31 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 950,
    "number": 949,
    "name": "Dupl. EXP31 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 951,
    "number": 950,
    "name": "Dupl. EXP31 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 952,
    "number": 951,
    "name": "Dupl. EXP31 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 953,
    "number": 952,
    "name": "Dupl. EXP31 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 954,
    "number": 953,
    "name": "Dupl. EXP32 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 955,
    "number": 954,
    "name": "Dupl. EXP32 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 956,
    "number": 955,
    "name": "Dupl. EXP32 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 957,
    "number": 956,
    "name": "Dupl. EXP32 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 958,
    "number": 957,
    "name": "Dupl. EXP32 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 959,
    "number": 958,
    "name": "Dupl. EXP32 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 960,
    "number": 959,
    "name": "Dupl. EXP32 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 961,
    "number": 960,
    "name": "Dupl. EXP32 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 962,
    "number": 961,
    "name": "Dupl. EXP33 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 963,
    "number": 962,
    "name": "Dupl. EXP33 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 964,
    "number": 963,
    "name": "Dupl. EXP33 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 965,
    "number": 964,
    "name": "Dupl. EXP33 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 966,
    "number": 965,
    "name": "Dupl. EXP33 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 967,
    "number": 966,
    "name": "Dupl. EXP33 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 968,
    "number": 967,
    "name": "Dupl. EXP33 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 969,
    "number": 968,
    "name": "Dupl. EXP33 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 970,
    "number": 969,
    "name": "Dupl. EXP34 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 971,
    "number": 970,
    "name": "Dupl. EXP34 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 972,
    "number": 971,
    "name": "Dupl. EXP34 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 973,
    "number": 972,
    "name": "Dupl. EXP34 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 974,
    "number": 973,
    "name": "Dupl. EXP34 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 975,
    "number": 974,
    "name": "Dupl. EXP34 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 976,
    "number": 975,
    "name": "Dupl. EXP34 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 977,
    "number": 976,
    "name": "Dupl. EXP34 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 978,
    "number": 977,
    "name": "Dupl. EXP35 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 979,
    "number": 978,
    "name": "Dupl. EXP35 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 980,
    "number": 979,
    "name": "Dupl. EXP35 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 981,
    "number": 980,
    "name": "Dupl. EXP35 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 982,
    "number": 981,
    "name": "Dupl. EXP35 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 983,
    "number": 982,
    "name": "Dupl. EXP35 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 984,
    "number": 983,
    "name": "Dupl. EXP35 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 985,
    "number": 984,
    "name": "Dupl. EXP35 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 986,
    "number": 985,
    "name": "Dupl. EXP36 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 987,
    "number": 986,
    "name": "Dupl. EXP36 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 988,
    "number": 987,
    "name": "Dupl. EXP36 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 989,
    "number": 988,
    "name": "Dupl. EXP36 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 990,
    "number": 989,
    "name": "Dupl. EXP36 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 991,
    "number": 990,
    "name": "Dupl. EXP36 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 992,
    "number": 991,
    "name": "Dupl. EXP36 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 993,
    "number": 992,
    "name": "Dupl. EXP36 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 994,
    "number": 993,
    "name": "Dupl. EXP37 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 995,
    "number": 994,
    "name": "Dupl. EXP37 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 996,
    "number": 995,
    "name": "Dupl. EXP37 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 997,
    "number": 996,
    "name": "Dupl. EXP37 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 998,
    "number": 997,
    "name": "Dupl. EXP37 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 999,
    "number": 998,
    "name": "Dupl. EXP37 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1000,
    "number": 999,
    "name": "Dupl. EXP37 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1001,
    "number": 1000,
    "name": "Dupl. EXP37 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1002,
    "number": 1001,
    "name": "Dupl. EXP38 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1003,
    "number": 1002,
    "name": "Dupl. EXP38 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1004,
    "number": 1003,
    "name": "Dupl. EXP38 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1005,
    "number": 1004,
    "name": "Dupl. EXP38 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1006,
    "number": 1005,
    "name": "Dupl. EXP38 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1007,
    "number": 1006,
    "name": "Dupl. EXP38 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1008,
    "number": 1007,
    "name": "Dupl. EXP38 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1009,
    "number": 1008,
    "name": "Dupl. EXP38 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1010,
    "number": 1009,
    "name": "Dupl. EXP39 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1011,
    "number": 1010,
    "name": "Dupl. EXP39 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1012,
    "number": 1011,
    "name": "Dupl. EXP39 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1013,
    "number": 1012,
    "name": "Dupl. EXP39 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1014,
    "number": 1013,
    "name": "Dupl. EXP39 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1015,
    "number": 1014,
    "name": "Dupl. EXP39 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1016,
    "number": 1015,
    "name": "Dupl. EXP39 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1017,
    "number": 1016,
    "name": "Dupl. EXP39 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1018,
    "number": 1017,
    "name": "Dupl. EXP40 501",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1019,
    "number": 1018,
    "name": "Dupl. EXP40 502",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1020,
    "number": 1019,
    "name": "Dupl. EXP40 503",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1021,
    "number": 1020,
    "name": "Dupl. EXP40 504",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1022,
    "number": 1021,
    "name": "Dupl. EXP40 505",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1023,
    "number": 1022,
    "name": "Dupl. EXP40 506",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1024,
    "number": 1023,
    "name": "Dupl. EXP40 507",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1025,
    "number": 1024,
    "name": "Dupl. EXP40 508",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per input function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1026,
    "number": 1025,
    "name": "Dupl. MR 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1027,
    "number": 1026,
    "name": "Dupl. MR 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1028,
    "number": 1027,
    "name": "Dupl. MR 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1029,
    "number": 1028,
    "name": "Dupl. MR 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1030,
    "number": 1029,
    "name": "Dupl. MR 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1031,
    "number": 1030,
    "name": "Dupl. MR 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1032,
    "number": 1031,
    "name": "Dupl. MR 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1033,
    "number": 1032,
    "name": "Dupl. MR 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1034,
    "number": 1033,
    "name": "Dupl. CT 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1035,
    "number": 1034,
    "name": "Dupl. CT 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1036,
    "number": 1035,
    "name": "Dupl. CT 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1037,
    "number": 1036,
    "name": "Dupl. CT 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1038,
    "number": 1037,
    "name": "Dupl. CT 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1039,
    "number": 1038,
    "name": "Dupl. CT 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1040,
    "number": 1039,
    "name": "Dupl. CT 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1041,
    "number": 1040,
    "name": "Dupl. CT 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1042,
    "number": 1041,
    "name": "Dupl. CT 609",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1043,
    "number": 1042,
    "name": "Dupl. CT 610",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1044,
    "number": 1043,
    "name": "Dupl. CT 611",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1045,
    "number": 1044,
    "name": "Dupl. CT 612",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1046,
    "number": 1045,
    "name": "Dupl. CT 613",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1047,
    "number": 1046,
    "name": "Dupl. CT 614",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1048,
    "number": 1047,
    "name": "Dupl. CT 615",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1049,
    "number": 1048,
    "name": "Dupl. CT 616",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1050,
    "number": 1049,
    "name": "Dupl. COP 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1051,
    "number": 1050,
    "name": "Dupl. COP 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1052,
    "number": 1051,
    "name": "Dupl. COP 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1053,
    "number": 1052,
    "name": "Dupl. COP 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1054,
    "number": 1053,
    "name": "Dupl. COP 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1055,
    "number": 1054,
    "name": "Dupl. COP 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1056,
    "number": 1055,
    "name": "Dupl. COP 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1057,
    "number": 1056,
    "name": "Dupl. COP 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1058,
    "number": 1057,
    "name": "Dupl. COP 609",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1059,
    "number": 1058,
    "name": "Dupl. COP 610",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1060,
    "number": 1059,
    "name": "Dupl. COP 611",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1061,
    "number": 1060,
    "name": "Dupl. COP 612",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1062,
    "number": 1061,
    "name": "Dupl. COP 613",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1063,
    "number": 1062,
    "name": "Dupl. COP 614",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1064,
    "number": 1063,
    "name": "Dupl. COP 615",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1065,
    "number": 1064,
    "name": "Dupl. COP 616",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1066,
    "number": 1065,
    "name": "Dupl. RIS1 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1067,
    "number": 1066,
    "name": "Dupl. RIS1 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1068,
    "number": 1067,
    "name": "Dupl. RIS1 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1069,
    "number": 1068,
    "name": "Dupl. RIS1 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1070,
    "number": 1069,
    "name": "Dupl. RIS1 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1071,
    "number": 1070,
    "name": "Dupl. RIS1 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1072,
    "number": 1071,
    "name": "Dupl. RIS1 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1073,
    "number": 1072,
    "name": "Dupl. RIS1 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1074,
    "number": 1073,
    "name": "Dupl. RIS2 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1075,
    "number": 1074,
    "name": "Dupl. RIS2 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1076,
    "number": 1075,
    "name": "Dupl. RIS2 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1077,
    "number": 1076,
    "name": "Dupl. RIS2 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1078,
    "number": 1077,
    "name": "Dupl. RIS2 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1079,
    "number": 1078,
    "name": "Dupl. RIS2 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1080,
    "number": 1079,
    "name": "Dupl. RIS2 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1081,
    "number": 1080,
    "name": "Dupl. RIS2 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1082,
    "number": 1081,
    "name": "Dupl. RIS3 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1083,
    "number": 1082,
    "name": "Dupl. RIS3 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1084,
    "number": 1083,
    "name": "Dupl. RIS3 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1085,
    "number": 1084,
    "name": "Dupl. RIS3 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1086,
    "number": 1085,
    "name": "Dupl. RIS3 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1087,
    "number": 1086,
    "name": "Dupl. RIS3 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1088,
    "number": 1087,
    "name": "Dupl. RIS3 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1089,
    "number": 1088,
    "name": "Dupl. RIS3 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1090,
    "number": 1089,
    "name": "Dupl. RIS4 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1091,
    "number": 1090,
    "name": "Dupl. RIS4 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1092,
    "number": 1091,
    "name": "Dupl. RIS4 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1093,
    "number": 1092,
    "name": "Dupl. RIS4 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1094,
    "number": 1093,
    "name": "Dupl. RIS4 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1095,
    "number": 1094,
    "name": "Dupl. RIS4 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1096,
    "number": 1095,
    "name": "Dupl. RIS4 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1097,
    "number": 1096,
    "name": "Dupl. RIS4 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1098,
    "number": 1097,
    "name": "Dupl. EXP1 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1099,
    "number": 1098,
    "name": "Dupl. EXP1 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1100,
    "number": 1099,
    "name": "Dupl. EXP1 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1101,
    "number": 1100,
    "name": "Dupl. EXP1 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1102,
    "number": 1101,
    "name": "Dupl. EXP1 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1103,
    "number": 1102,
    "name": "Dupl. EXP1 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1104,
    "number": 1103,
    "name": "Dupl. EXP1 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1105,
    "number": 1104,
    "name": "Dupl. EXP1 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1106,
    "number": 1105,
    "name": "Dupl. EXP2 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1107,
    "number": 1106,
    "name": "Dupl. EXP2 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1108,
    "number": 1107,
    "name": "Dupl. EXP2 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1109,
    "number": 1108,
    "name": "Dupl. EXP2 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1110,
    "number": 1109,
    "name": "Dupl. EXP2 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1111,
    "number": 1110,
    "name": "Dupl. EXP2 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1112,
    "number": 1111,
    "name": "Dupl. EXP2 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1113,
    "number": 1112,
    "name": "Dupl. EXP2 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1114,
    "number": 1113,
    "name": "Dupl. EXP3 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1115,
    "number": 1114,
    "name": "Dupl. EXP3 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1116,
    "number": 1115,
    "name": "Dupl. EXP3 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1117,
    "number": 1116,
    "name": "Dupl. EXP3 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1118,
    "number": 1117,
    "name": "Dupl. EXP3 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1119,
    "number": 1118,
    "name": "Dupl. EXP3 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1120,
    "number": 1119,
    "name": "Dupl. EXP3 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1121,
    "number": 1120,
    "name": "Dupl. EXP3 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1122,
    "number": 1121,
    "name": "Dupl. EXP4 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1123,
    "number": 1122,
    "name": "Dupl. EXP4 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1124,
    "number": 1123,
    "name": "Dupl. EXP4 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1125,
    "number": 1124,
    "name": "Dupl. EXP4 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1126,
    "number": 1125,
    "name": "Dupl. EXP4 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1127,
    "number": 1126,
    "name": "Dupl. EXP4 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1128,
    "number": 1127,
    "name": "Dupl. EXP4 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1129,
    "number": 1128,
    "name": "Dupl. EXP4 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1130,
    "number": 1129,
    "name": "Dupl. EXP5 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1131,
    "number": 1130,
    "name": "Dupl. EXP5 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1132,
    "number": 1131,
    "name": "Dupl. EXP5 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1133,
    "number": 1132,
    "name": "Dupl. EXP5 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1134,
    "number": 1133,
    "name": "Dupl. EXP5 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1135,
    "number": 1134,
    "name": "Dupl. EXP5 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1136,
    "number": 1135,
    "name": "Dupl. EXP5 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1137,
    "number": 1136,
    "name": "Dupl. EXP5 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1138,
    "number": 1137,
    "name": "Dupl. EXP6 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1139,
    "number": 1138,
    "name": "Dupl. EXP6 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1140,
    "number": 1139,
    "name": "Dupl. EXP6 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1141,
    "number": 1140,
    "name": "Dupl. EXP6 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1142,
    "number": 1141,
    "name": "Dupl. EXP6 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1143,
    "number": 1142,
    "name": "Dupl. EXP6 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1144,
    "number": 1143,
    "name": "Dupl. EXP6 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1145,
    "number": 1144,
    "name": "Dupl. EXP6 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1146,
    "number": 1145,
    "name": "Dupl. EXP7 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1147,
    "number": 1146,
    "name": "Dupl. EXP7 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1148,
    "number": 1147,
    "name": "Dupl. EXP7 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1149,
    "number": 1148,
    "name": "Dupl. EXP7 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1150,
    "number": 1149,
    "name": "Dupl. EXP7 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1151,
    "number": 1150,
    "name": "Dupl. EXP7 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1152,
    "number": 1151,
    "name": "Dupl. EXP7 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1153,
    "number": 1152,
    "name": "Dupl. EXP7 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1154,
    "number": 1153,
    "name": "Dupl. EXP8 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1155,
    "number": 1154,
    "name": "Dupl. EXP8 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1156,
    "number": 1155,
    "name": "Dupl. EXP8 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1157,
    "number": 1156,
    "name": "Dupl. EXP8 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1158,
    "number": 1157,
    "name": "Dupl. EXP8 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1159,
    "number": 1158,
    "name": "Dupl. EXP8 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1160,
    "number": 1159,
    "name": "Dupl. EXP8 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1161,
    "number": 1160,
    "name": "Dupl. EXP8 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1162,
    "number": 1161,
    "name": "Dupl. EXP9 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1163,
    "number": 1162,
    "name": "Dupl. EXP9 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1164,
    "number": 1163,
    "name": "Dupl. EXP9 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1165,
    "number": 1164,
    "name": "Dupl. EXP9 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1166,
    "number": 1165,
    "name": "Dupl. EXP9 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1167,
    "number": 1166,
    "name": "Dupl. EXP9 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1168,
    "number": 1167,
    "name": "Dupl. EXP9 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1169,
    "number": 1168,
    "name": "Dupl. EXP9 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1170,
    "number": 1169,
    "name": "Dupl. EXP10 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1171,
    "number": 1170,
    "name": "Dupl. EXP10 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1172,
    "number": 1171,
    "name": "Dupl. EXP10 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1173,
    "number": 1172,
    "name": "Dupl. EXP10 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1174,
    "number": 1173,
    "name": "Dupl. EXP10 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1175,
    "number": 1174,
    "name": "Dupl. EXP10 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1176,
    "number": 1175,
    "name": "Dupl. EXP10 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1177,
    "number": 1176,
    "name": "Dupl. EXP10 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1178,
    "number": 1177,
    "name": "Dupl. EXP11 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1179,
    "number": 1178,
    "name": "Dupl. EXP11 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1180,
    "number": 1179,
    "name": "Dupl. EXP11 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1181,
    "number": 1180,
    "name": "Dupl. EXP11 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1182,
    "number": 1181,
    "name": "Dupl. EXP11 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1183,
    "number": 1182,
    "name": "Dupl. EXP11 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1184,
    "number": 1183,
    "name": "Dupl. EXP11 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1185,
    "number": 1184,
    "name": "Dupl. EXP11 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1186,
    "number": 1185,
    "name": "Dupl. EXP12 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1187,
    "number": 1186,
    "name": "Dupl. EXP12 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1188,
    "number": 1187,
    "name": "Dupl. EXP12 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1189,
    "number": 1188,
    "name": "Dupl. EXP12 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1190,
    "number": 1189,
    "name": "Dupl. EXP12 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1191,
    "number": 1190,
    "name": "Dupl. EXP12 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1192,
    "number": 1191,
    "name": "Dupl. EXP12 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1193,
    "number": 1192,
    "name": "Dupl. EXP12 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1194,
    "number": 1193,
    "name": "Dupl. EXP13 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1195,
    "number": 1194,
    "name": "Dupl. EXP13 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1196,
    "number": 1195,
    "name": "Dupl. EXP13 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1197,
    "number": 1196,
    "name": "Dupl. EXP13 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1198,
    "number": 1197,
    "name": "Dupl. EXP13 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1199,
    "number": 1198,
    "name": "Dupl. EXP13 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1200,
    "number": 1199,
    "name": "Dupl. EXP13 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1201,
    "number": 1200,
    "name": "Dupl. EXP13 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1202,
    "number": 1201,
    "name": "Dupl. EXP14 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1203,
    "number": 1202,
    "name": "Dupl. EXP14 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1204,
    "number": 1203,
    "name": "Dupl. EXP14 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1205,
    "number": 1204,
    "name": "Dupl. EXP14 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1206,
    "number": 1205,
    "name": "Dupl. EXP14 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1207,
    "number": 1206,
    "name": "Dupl. EXP14 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1208,
    "number": 1207,
    "name": "Dupl. EXP14 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1209,
    "number": 1208,
    "name": "Dupl. EXP14 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1210,
    "number": 1209,
    "name": "Dupl. EXP15 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1211,
    "number": 1210,
    "name": "Dupl. EXP15 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1212,
    "number": 1211,
    "name": "Dupl. EXP15 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1213,
    "number": 1212,
    "name": "Dupl. EXP15 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1214,
    "number": 1213,
    "name": "Dupl. EXP15 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1215,
    "number": 1214,
    "name": "Dupl. EXP15 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1216,
    "number": 1215,
    "name": "Dupl. EXP15 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1217,
    "number": 1216,
    "name": "Dupl. EXP15 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1218,
    "number": 1217,
    "name": "Dupl. EXP16 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1219,
    "number": 1218,
    "name": "Dupl. EXP16 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1220,
    "number": 1219,
    "name": "Dupl. EXP16 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1221,
    "number": 1220,
    "name": "Dupl. EXP16 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1222,
    "number": 1221,
    "name": "Dupl. EXP16 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1223,
    "number": 1222,
    "name": "Dupl. EXP16 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1224,
    "number": 1223,
    "name": "Dupl. EXP16 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1225,
    "number": 1224,
    "name": "Dupl. EXP16 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1226,
    "number": 1225,
    "name": "Dupl. EXP17 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1227,
    "number": 1226,
    "name": "Dupl. EXP17 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1228,
    "number": 1227,
    "name": "Dupl. EXP17 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1229,
    "number": 1228,
    "name": "Dupl. EXP17 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1230,
    "number": 1229,
    "name": "Dupl. EXP17 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1231,
    "number": 1230,
    "name": "Dupl. EXP17 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1232,
    "number": 1231,
    "name": "Dupl. EXP17 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1233,
    "number": 1232,
    "name": "Dupl. EXP17 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1234,
    "number": 1233,
    "name": "Dupl. EXP18 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1235,
    "number": 1234,
    "name": "Dupl. EXP18 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1236,
    "number": 1235,
    "name": "Dupl. EXP18 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1237,
    "number": 1236,
    "name": "Dupl. EXP18 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1238,
    "number": 1237,
    "name": "Dupl. EXP18 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1239,
    "number": 1238,
    "name": "Dupl. EXP18 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1240,
    "number": 1239,
    "name": "Dupl. EXP18 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1241,
    "number": 1240,
    "name": "Dupl. EXP18 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1242,
    "number": 1241,
    "name": "Dupl. EXP19 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1243,
    "number": 1242,
    "name": "Dupl. EXP19 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1244,
    "number": 1243,
    "name": "Dupl. EXP19 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1245,
    "number": 1244,
    "name": "Dupl. EXP19 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1246,
    "number": 1245,
    "name": "Dupl. EXP19 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1247,
    "number": 1246,
    "name": "Dupl. EXP19 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1248,
    "number": 1247,
    "name": "Dupl. EXP19 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1249,
    "number": 1248,
    "name": "Dupl. EXP19 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1250,
    "number": 1249,
    "name": "Dupl. EXP20 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1251,
    "number": 1250,
    "name": "Dupl. EXP20 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1252,
    "number": 1251,
    "name": "Dupl. EXP20 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1253,
    "number": 1252,
    "name": "Dupl. EXP20 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1254,
    "number": 1253,
    "name": "Dupl. EXP20 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1255,
    "number": 1254,
    "name": "Dupl. EXP20 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1256,
    "number": 1255,
    "name": "Dupl. EXP20 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1257,
    "number": 1256,
    "name": "Dupl. EXP20 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1258,
    "number": 1257,
    "name": "Dupl. EXP21 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1259,
    "number": 1258,
    "name": "Dupl. EXP21 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1260,
    "number": 1259,
    "name": "Dupl. EXP21 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1261,
    "number": 1260,
    "name": "Dupl. EXP21 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1262,
    "number": 1261,
    "name": "Dupl. EXP21 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1263,
    "number": 1262,
    "name": "Dupl. EXP21 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1264,
    "number": 1263,
    "name": "Dupl. EXP21 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1265,
    "number": 1264,
    "name": "Dupl. EXP21 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1266,
    "number": 1265,
    "name": "Dupl. EXP22 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1267,
    "number": 1266,
    "name": "Dupl. EXP22 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1268,
    "number": 1267,
    "name": "Dupl. EXP22 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1269,
    "number": 1268,
    "name": "Dupl. EXP22 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1270,
    "number": 1269,
    "name": "Dupl. EXP22 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1271,
    "number": 1270,
    "name": "Dupl. EXP22 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1272,
    "number": 1271,
    "name": "Dupl. EXP22 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1273,
    "number": 1272,
    "name": "Dupl. EXP22 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1274,
    "number": 1273,
    "name": "Dupl. EXP23 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1275,
    "number": 1274,
    "name": "Dupl. EXP23 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1276,
    "number": 1275,
    "name": "Dupl. EXP23 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1277,
    "number": 1276,
    "name": "Dupl. EXP23 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1278,
    "number": 1277,
    "name": "Dupl. EXP23 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1279,
    "number": 1278,
    "name": "Dupl. EXP23 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1280,
    "number": 1279,
    "name": "Dupl. EXP23 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1281,
    "number": 1280,
    "name": "Dupl. EXP23 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1282,
    "number": 1281,
    "name": "Dupl. EXP24 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1283,
    "number": 1282,
    "name": "Dupl. EXP24 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1284,
    "number": 1283,
    "name": "Dupl. EXP24 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1285,
    "number": 1284,
    "name": "Dupl. EXP24 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1286,
    "number": 1285,
    "name": "Dupl. EXP24 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1287,
    "number": 1286,
    "name": "Dupl. EXP24 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1288,
    "number": 1287,
    "name": "Dupl. EXP24 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1289,
    "number": 1288,
    "name": "Dupl. EXP24 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1290,
    "number": 1289,
    "name": "Dupl. EXP25 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1291,
    "number": 1290,
    "name": "Dupl. EXP25 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1292,
    "number": 1291,
    "name": "Dupl. EXP25 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1293,
    "number": 1292,
    "name": "Dupl. EXP25 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1294,
    "number": 1293,
    "name": "Dupl. EXP25 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1295,
    "number": 1294,
    "name": "Dupl. EXP25 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1296,
    "number": 1295,
    "name": "Dupl. EXP25 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1297,
    "number": 1296,
    "name": "Dupl. EXP25 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1298,
    "number": 1297,
    "name": "Dupl. EXP26 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1299,
    "number": 1298,
    "name": "Dupl. EXP26 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1300,
    "number": 1299,
    "name": "Dupl. EXP26 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1301,
    "number": 1300,
    "name": "Dupl. EXP26 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1302,
    "number": 1301,
    "name": "Dupl. EXP26 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1303,
    "number": 1302,
    "name": "Dupl. EXP26 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1304,
    "number": 1303,
    "name": "Dupl. EXP26 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1305,
    "number": 1304,
    "name": "Dupl. EXP26 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1306,
    "number": 1305,
    "name": "Dupl. EXP27 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1307,
    "number": 1306,
    "name": "Dupl. EXP27 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1308,
    "number": 1307,
    "name": "Dupl. EXP27 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1309,
    "number": 1308,
    "name": "Dupl. EXP27 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1310,
    "number": 1309,
    "name": "Dupl. EXP27 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1311,
    "number": 1310,
    "name": "Dupl. EXP27 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1312,
    "number": 1311,
    "name": "Dupl. EXP27 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1313,
    "number": 1312,
    "name": "Dupl. EXP27 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1314,
    "number": 1313,
    "name": "Dupl. EXP28 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1315,
    "number": 1314,
    "name": "Dupl. EXP28 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1316,
    "number": 1315,
    "name": "Dupl. EXP28 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1317,
    "number": 1316,
    "name": "Dupl. EXP28 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1318,
    "number": 1317,
    "name": "Dupl. EXP28 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1319,
    "number": 1318,
    "name": "Dupl. EXP28 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1320,
    "number": 1319,
    "name": "Dupl. EXP28 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1321,
    "number": 1320,
    "name": "Dupl. EXP28 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1322,
    "number": 1321,
    "name": "Dupl. EXP29 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1323,
    "number": 1322,
    "name": "Dupl. EXP29 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1324,
    "number": 1323,
    "name": "Dupl. EXP29 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1325,
    "number": 1324,
    "name": "Dupl. EXP29 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1326,
    "number": 1325,
    "name": "Dupl. EXP29 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1327,
    "number": 1326,
    "name": "Dupl. EXP29 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1328,
    "number": 1327,
    "name": "Dupl. EXP29 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1329,
    "number": 1328,
    "name": "Dupl. EXP29 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1330,
    "number": 1329,
    "name": "Dupl. EXP30 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1331,
    "number": 1330,
    "name": "Dupl. EXP30 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1332,
    "number": 1331,
    "name": "Dupl. EXP30 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1333,
    "number": 1332,
    "name": "Dupl. EXP30 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1334,
    "number": 1333,
    "name": "Dupl. EXP30 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1335,
    "number": 1334,
    "name": "Dupl. EXP30 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1336,
    "number": 1335,
    "name": "Dupl. EXP30 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1337,
    "number": 1336,
    "name": "Dupl. EXP30 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1338,
    "number": 1337,
    "name": "Dupl. EXP31 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1339,
    "number": 1338,
    "name": "Dupl. EXP31 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1340,
    "number": 1339,
    "name": "Dupl. EXP31 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1341,
    "number": 1340,
    "name": "Dupl. EXP31 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1342,
    "number": 1341,
    "name": "Dupl. EXP31 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1343,
    "number": 1342,
    "name": "Dupl. EXP31 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1344,
    "number": 1343,
    "name": "Dupl. EXP31 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1345,
    "number": 1344,
    "name": "Dupl. EXP31 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1346,
    "number": 1345,
    "name": "Dupl. EXP32 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1347,
    "number": 1346,
    "name": "Dupl. EXP32 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1348,
    "number": 1347,
    "name": "Dupl. EXP32 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1349,
    "number": 1348,
    "name": "Dupl. EXP32 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1350,
    "number": 1349,
    "name": "Dupl. EXP32 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1351,
    "number": 1350,
    "name": "Dupl. EXP32 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1352,
    "number": 1351,
    "name": "Dupl. EXP32 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1353,
    "number": 1352,
    "name": "Dupl. EXP32 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1354,
    "number": 1353,
    "name": "Dupl. EXP33 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1355,
    "number": 1354,
    "name": "Dupl. EXP33 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1356,
    "number": 1355,
    "name": "Dupl. EXP33 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1357,
    "number": 1356,
    "name": "Dupl. EXP33 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1358,
    "number": 1357,
    "name": "Dupl. EXP33 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1359,
    "number": 1358,
    "name": "Dupl. EXP33 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1360,
    "number": 1359,
    "name": "Dupl. EXP33 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1361,
    "number": 1360,
    "name": "Dupl. EXP33 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1362,
    "number": 1361,
    "name": "Dupl. EXP34 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1363,
    "number": 1362,
    "name": "Dupl. EXP34 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1364,
    "number": 1363,
    "name": "Dupl. EXP34 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1365,
    "number": 1364,
    "name": "Dupl. EXP34 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1366,
    "number": 1365,
    "name": "Dupl. EXP34 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1367,
    "number": 1366,
    "name": "Dupl. EXP34 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1368,
    "number": 1367,
    "name": "Dupl. EXP34 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1369,
    "number": 1368,
    "name": "Dupl. EXP34 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1370,
    "number": 1369,
    "name": "Dupl. EXP35 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1371,
    "number": 1370,
    "name": "Dupl. EXP35 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1372,
    "number": 1371,
    "name": "Dupl. EXP35 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1373,
    "number": 1372,
    "name": "Dupl. EXP35 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1374,
    "number": 1373,
    "name": "Dupl. EXP35 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1375,
    "number": 1374,
    "name": "Dupl. EXP35 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1376,
    "number": 1375,
    "name": "Dupl. EXP35 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1377,
    "number": 1376,
    "name": "Dupl. EXP35 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1378,
    "number": 1377,
    "name": "Dupl. EXP36 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1379,
    "number": 1378,
    "name": "Dupl. EXP36 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1380,
    "number": 1379,
    "name": "Dupl. EXP36 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1381,
    "number": 1380,
    "name": "Dupl. EXP36 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1382,
    "number": 1381,
    "name": "Dupl. EXP36 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1383,
    "number": 1382,
    "name": "Dupl. EXP36 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1384,
    "number": 1383,
    "name": "Dupl. EXP36 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1385,
    "number": 1384,
    "name": "Dupl. EXP36 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1386,
    "number": 1385,
    "name": "Dupl. EXP37 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1387,
    "number": 1386,
    "name": "Dupl. EXP37 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1388,
    "number": 1387,
    "name": "Dupl. EXP37 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1389,
    "number": 1388,
    "name": "Dupl. EXP37 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1390,
    "number": 1389,
    "name": "Dupl. EXP37 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1391,
    "number": 1390,
    "name": "Dupl. EXP37 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1392,
    "number": 1391,
    "name": "Dupl. EXP37 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1393,
    "number": 1392,
    "name": "Dupl. EXP37 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1394,
    "number": 1393,
    "name": "Dupl. EXP38 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1395,
    "number": 1394,
    "name": "Dupl. EXP38 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1396,
    "number": 1395,
    "name": "Dupl. EXP38 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1397,
    "number": 1396,
    "name": "Dupl. EXP38 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1398,
    "number": 1397,
    "name": "Dupl. EXP38 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1399,
    "number": 1398,
    "name": "Dupl. EXP38 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1400,
    "number": 1399,
    "name": "Dupl. EXP38 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1401,
    "number": 1400,
    "name": "Dupl. EXP38 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1402,
    "number": 1401,
    "name": "Dupl. EXP39 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1403,
    "number": 1402,
    "name": "Dupl. EXP39 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1404,
    "number": 1403,
    "name": "Dupl. EXP39 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1405,
    "number": 1404,
    "name": "Dupl. EXP39 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1406,
    "number": 1405,
    "name": "Dupl. EXP39 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1407,
    "number": 1406,
    "name": "Dupl. EXP39 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1408,
    "number": 1407,
    "name": "Dupl. EXP39 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1409,
    "number": 1408,
    "name": "Dupl. EXP39 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1410,
    "number": 1409,
    "name": "Dupl. EXP40 601",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1411,
    "number": 1410,
    "name": "Dupl. EXP40 602",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1412,
    "number": 1411,
    "name": "Dupl. EXP40 603",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1413,
    "number": 1412,
    "name": "Dupl. EXP40 604",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1414,
    "number": 1413,
    "name": "Dupl. EXP40 605",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1415,
    "number": 1414,
    "name": "Dupl. EXP40 606",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1416,
    "number": 1415,
    "name": "Dupl. EXP40 607",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1417,
    "number": 1416,
    "name": "Dupl. EXP40 608",
    "tag": "",
    "definition": "Specified terminal exceeds the two duplicate limit per output function.",
    "category": 0,
    "solution": "Clear the terminal's function."
  },
  {
    "id": 1418,
    "number": 1417,
    "name": "LWD Offline",
    "tag": "",
    "definition": "Communication with load weighing device has been lost.",
    "category": 0,
    "solution": "Check the status of the smart rise load weigher. If no loadweigher exists, set load weigher select (08-135) to zero."
  },
  {
    "id": 1419,
    "number": 1418,
    "name": "DL20 Offline CT",
    "tag": "",
    "definition": "Communication with DL20 fixture and car top SRU has been lost.",
    "category": 0,
    "solution": "Check wiring and power to DL20."
  },
  {
    "id": 1420,
    "number": 1419,
    "name": "DL20 Offline COP",
    "tag": "",
    "definition": "Communication with DL20 fixture and car operating panel SRU has been lost.",
    "category": 0,
    "solution": "Check wiring and power to DL20."
  },
  {
    "id": 1421,
    "number": 1420,
    "name": "CPLD OVF MR",
    "tag": "",
    "definition": "CPLD communication buffers have been overrun.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1422,
    "number": 1421,
    "name": "CPLD OVF CT",
    "tag": "",
    "definition": "CPLD communication buffers have been overrun.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1423,
    "number": 1422,
    "name": "CPLD OVF COP",
    "tag": "",
    "definition": "CPLD communication buffers have been overrun.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1424,
    "number": 1423,
    "name": "Fire Key Main",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the main fire keyswitch.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1425,
    "number": 1424,
    "name": "Fire Key Remote",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the remote fire keyswitch.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1426,
    "number": 1425,
    "name": "Fire Smoke Main",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the main smoke input.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1427,
    "number": 1426,
    "name": "Fire Smoke Alt",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the alternate smoke input.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1428,
    "number": 1427,
    "name": "Fire Smoke MR",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the machine room smoke input.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1429,
    "number": 1428,
    "name": "Fire Smoke HA",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the hoistway smoke input.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1430,
    "number": 1429,
    "name": "Fire Smoke Latched",
    "tag": "",
    "definition": "Fire phase 1 has been activated by a latched fire reclal source following a power loss.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1431,
    "number": 1430,
    "name": "Fire Smoke Pit",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the pit smoke input.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1432,
    "number": 1431,
    "name": "Fire Smoke MR 2",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the second machine room smoke input.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1433,
    "number": 1432,
    "name": "Fire Smoke HA 2",
    "tag": "",
    "definition": "Fire phase 1 has been activated by the second hoistway smoke input.",
    "category": 0,
    "solution": "Check the fire input and riser board status."
  },
  {
    "id": 1434,
    "number": 1433,
    "name": "NEED TO RST MR",
    "tag": "",
    "definition": "Machine room SRU board needs to be reset.",
    "category": 0,
    "solution": "Cycle power to the machine room SRU board."
  },
  {
    "id": 1435,
    "number": 1434,
    "name": "NEED TO RST CT",
    "tag": "",
    "definition": "Car top SRU board needs to be reset.",
    "category": 0,
    "solution": "Cycle power to the car top SRU board."
  },
  {
    "id": 1436,
    "number": 1435,
    "name": "NEED TO RST COP",
    "tag": "",
    "definition": "Car operating panel SRU board needs to be reset.",
    "category": 0,
    "solution": "Cycle power to the car operating panel SRU board."
  },
  {
    "id": 1437,
    "number": 1436,
    "name": "Unint. Mov. Test Active",
    "tag": "",
    "definition": "Unintended movement test feature is active. If not intended, turn OFF MR SRU DIP B8 and parameter 01-0052 to disable the feature.",
    "category": 0,
    "solution": "Unintended movement test feature is active. If not intended, turn OFF MR SRU DIP B8 and parameter 01-0052 to disable the feature."
  },
  {
    "id": 1438,
    "number": 1437,
    "name": "Dupar COP Offline",
    "tag": "",
    "definition": "Communication has been lost between Dupar COP and COP SRU.",
    "category": 0,
    "solution": "Check wiring between Dupar COP and COP SRU (C3H/C3L)"
  },
  {
    "id": 1439,
    "number": 1438,
    "name": "RIS1 HB Offline",
    "tag": "",
    "definition": "Riser 1 has reported communication loss with one of its hall boards.",
    "category": 0,
    "solution": "Check the hall board status menu for a hall board reporting 0% communcation and check wiring."
  },
  {
    "id": 1440,
    "number": 1439,
    "name": "RIS2 HB Offline",
    "tag": "",
    "definition": "Riser 2 has reported communication loss with one of its hall boards.",
    "category": 0,
    "solution": "Check the hall board status menu for a hall board reporting 0% communcation and check wiring."
  },
  {
    "id": 1441,
    "number": 1440,
    "name": "RIS3 HB Offline",
    "tag": "",
    "definition": "Riser 3 has reported communication loss with one of its hall boards.",
    "category": 0,
    "solution": "Check the hall board status menu for a hall board reporting 0% communcation and check wiring."
  },
  {
    "id": 1442,
    "number": 1441,
    "name": "RIS4 HB Offline",
    "tag": "",
    "definition": "Riser 4 has reported communication loss with one of its hall boards.",
    "category": 0,
    "solution": "Check the hall board status menu for a hall board reporting 0% communcation and check wiring."
  },
  {
    "id": 1443,
    "number": 1442,
    "name": "Shield Unknown",
    "tag": "",
    "definition": "Shield error state is unknown.",
    "category": 0,
    "solution": "Check wiring of power and network lines."
  },
  {
    "id": 1444,
    "number": 1443,
    "name": "Shield POR Rst",
    "tag": "",
    "definition": "Shield is starting up after a standard reset event.",
    "category": 0,
    "solution": "Check wiring of power and network lines."
  },
  {
    "id": 1445,
    "number": 1444,
    "name": "Shield BOD Rst",
    "tag": "",
    "definition": "Shield is starting up after a brown out reset event.",
    "category": 0,
    "solution": "Check wiring of power and network lines."
  },
  {
    "id": 1446,
    "number": 1445,
    "name": "Shield WDT Rst",
    "tag": "",
    "definition": "Shield is starting up after a watchdog timer reset event.",
    "category": 0,
    "solution": "Check wiring of power and network lines."
  },
  {
    "id": 1447,
    "number": 1446,
    "name": "Shield COM Group",
    "tag": "",
    "definition": "Shield has not see communication from the group network in 5 seconds.",
    "category": 0,
    "solution": "Check wiring of power and network lines."
  },
  {
    "id": 1448,
    "number": 1447,
    "name": "Shield COM RPi",
    "tag": "",
    "definition": "Shield has not seen communication from the RPi in 5 seconds.",
    "category": 0,
    "solution": "Check wiring of power and network lines."
  },
  {
    "id": 1449,
    "number": 1448,
    "name": "Shield Failed RTC",
    "tag": "",
    "definition": "Shield RTC has failed.",
    "category": 0,
    "solution": "Replace on board battery."
  },
  {
    "id": 1450,
    "number": 1449,
    "name": "Shield UART OVF TX",
    "tag": "",
    "definition": "Shield UART transmit buffer has overflowed.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1451,
    "number": 1450,
    "name": "Shield UART OVF RX",
    "tag": "",
    "definition": "Shield UART receive buffer has overflowed.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1452,
    "number": 1451,
    "name": "Shield CAN OVF TX",
    "tag": "",
    "definition": "Shield CAN transmit buffer has overflowed.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1453,
    "number": 1452,
    "name": "Shield CAN OVF RX",
    "tag": "",
    "definition": "Shield CAN receive buffer has overflowed.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1454,
    "number": 1453,
    "name": "Shield CAN Bus Rst",
    "tag": "",
    "definition": "Shield has detected a can bus reset event.",
    "category": 0,
    "solution": "Check wiring of power and network lines."
  },
  {
    "id": 1455,
    "number": 1454,
    "name": "VIP Timeout",
    "tag": "",
    "definition": "VIP process has been canceled due to excessive wait time.",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 1456,
    "number": 1455,
    "name": "Fire Virtual Remote Recall",
    "tag": "",
    "definition": "Fire phase 1 has been activated by Virtual Input Fire Remote Recall",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 1457,
    "number": 1456,
    "name": "EMS2 Not At Recall",
    "tag": "",
    "definition": "Car is on EMS phase 2, in a dead zone with doors open, but can't exit EMS 2 because it is not at the correct recall floor (the floor it was first called to on EMS phase 1).",
    "category": 0,
    "solution": "Either move car to the correct EMS 1 recall floor, or turn ON parameter EMS_ExitPh2AtAnyFloor (01-98) to allow exiting EMS phase 2 at any floor."
  },
  {
    "id": 1458,
    "number": 1457,
    "name": "NA",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 1459,
    "number": 1458,
    "name": "NA",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 1460,
    "number": 1459,
    "name": "NA",
    "tag": "",
    "definition": "NA",
    "category": 0,
    "solution": "NA"
  },
  {
    "id": 1461,
    "number": 1460,
    "name": "Invalid Buffer Speed",
    "tag": "",
    "definition": "While attempting to do the Buffer Test, Buffer speed is 0 or less than Learn Speed.",
    "category": 0,
    "solution": "Set the Buffer Speed to a higher FPM ( Contract Speed or above Learn Speed ). "
  },
  {
    "id": 1462,
    "number": 1461,
    "name": "Invalid Asc/Des Speed",
    "tag": "",
    "definition": "While attempting to do the Asc/Des Overspeed test, Asc/Des speed is 0 or less than Learn Speed.",
    "category": 0,
    "solution": "Set the Asc/Des speed to a higher FPM ( Contract Speed or above Learn Speed ). "
  },
  {
    "id": 1463,
    "number": 1462,
    "name": "CEDES1 COMM",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a communication error.",
    "category": 0,
    "solution": "Check wiring and network termination."
  },
  {
    "id": 1464,
    "number": 1463,
    "name": "CEDES1 READ",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a cannot read tape error.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1465,
    "number": 1464,
    "name": "CEDES1 CLOSE",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a tape too close error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1466,
    "number": 1465,
    "name": "CEDES1 FAR",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a tape too far error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1467,
    "number": 1466,
    "name": "CEDES1 LEFT",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a tape too far left error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1468,
    "number": 1467,
    "name": "CEDES1 RIGHT",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a tape too far right error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1469,
    "number": 1468,
    "name": "CEDES1 CONTRAST1",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a contrast - service recommended read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1470,
    "number": 1469,
    "name": "CEDES1 CONTRAST2",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a contrast - warning read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1471,
    "number": 1470,
    "name": "CEDES1 CONTRAST3",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 reporting a contrast - stopped read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1472,
    "number": 1471,
    "name": "CEDES1 CRC",
    "tag": "",
    "definition": "Primary CEDES camera channel 1 failed CRC check.",
    "category": 0,
    "solution": "Check wiring and network termination."
  },
  {
    "id": 1473,
    "number": 1472,
    "name": "CEDES2 COMM",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a communication error.",
    "category": 0,
    "solution": "Check wiring and network termination."
  },
  {
    "id": 1474,
    "number": 1473,
    "name": "CEDES2 READ",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a cannot read tape error.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1475,
    "number": 1474,
    "name": "CEDES2 CLOSE",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a tape too close error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1476,
    "number": 1475,
    "name": "CEDES2 FAR",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a tape too far error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1477,
    "number": 1476,
    "name": "CEDES2 LEFT",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a tape too far left error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1478,
    "number": 1477,
    "name": "CEDES2 RIGHT",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a tape too far right error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1479,
    "number": 1478,
    "name": "CEDES2 CONTRAST1",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a contrast - service recommended read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1480,
    "number": 1479,
    "name": "CEDES2 CONTRAST2",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a contrast - warning read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1481,
    "number": 1480,
    "name": "CEDES2 CONTRAST3",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 reporting a contrast - stopped read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1482,
    "number": 1481,
    "name": "CEDES2 CRC",
    "tag": "",
    "definition": "Primary CEDES camera channel 2 failed CRC check.",
    "category": 0,
    "solution": "Check wiring and network termination."
  },
  {
    "id": 1483,
    "number": 1482,
    "name": "CEDES3 COMM",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a communication error.",
    "category": 0,
    "solution": "Check wiring and network termination."
  },
  {
    "id": 1484,
    "number": 1483,
    "name": "CEDES3 READ",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a cannot read tape error.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1485,
    "number": 1484,
    "name": "CEDES3 CLOSE",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a tape too close error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1486,
    "number": 1485,
    "name": "CEDES3 FAR",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a tape too far error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1487,
    "number": 1486,
    "name": "CEDES3 LEFT",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a tape too far left error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1488,
    "number": 1487,
    "name": "CEDES3 RIGHT",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a tape too far right error.",
    "category": 0,
    "solution": "Fix tape alignment."
  },
  {
    "id": 1489,
    "number": 1488,
    "name": "CEDES3 CONTRAST1",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a contrast - service recommended read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1490,
    "number": 1489,
    "name": "CEDES3 CONTRAST2",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a contrast - warning read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1491,
    "number": 1490,
    "name": "CEDES3 CONTRAST3",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 reporting a contrast - stopped read status.",
    "category": 0,
    "solution": "Clean camera window, clean tape, check alignment."
  },
  {
    "id": 1492,
    "number": 1491,
    "name": "CEDES3 CRC",
    "tag": "",
    "definition": "ETSL CEDES camera channel 2 failed CRC check.",
    "category": 0,
    "solution": "Check wiring and network termination."
  },
  {
    "id": 1493,
    "number": 1492,
    "name": "DAD Offline",
    "tag": "",
    "definition": "DAD unit has stopped communicating with the C4 car for 15 seconds.",
    "category": 0,
    "solution": "Check group network wiring. Check that power is supplied to the DAD unit."
  },
  {
    "id": 1494,
    "number": 1493,
    "name": "SS Offline",
    "tag": "",
    "definition": "Communication lost with primary soft starter.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1495,
    "number": 1494,
    "name": "SS Unk",
    "tag": "",
    "definition": "Primary soft starter reporting an unknown fault.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1496,
    "number": 1495,
    "name": "SS POR Rst",
    "tag": "",
    "definition": "Primary soft starter recovering from a reset due to power off.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1497,
    "number": 1496,
    "name": "SS WDT Rst",
    "tag": "",
    "definition": "Primary soft starter recovering from reset due to watchdog.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1498,
    "number": 1497,
    "name": "SS BOD Rst",
    "tag": "",
    "definition": "Primary soft starter recovering from reset due to voltage dip.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1499,
    "number": 1498,
    "name": "SS Comm Loss",
    "tag": "",
    "definition": "Primary soft starter reporting loss of communication with the elevator controller.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1500,
    "number": 1499,
    "name": "SS OC",
    "tag": "",
    "definition": "Primary soft starter reporting an overcurrent error.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1501,
    "number": 1500,
    "name": "SS OVV",
    "tag": "",
    "definition": "Primary soft starter reporting an overvoltage error.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1502,
    "number": 1501,
    "name": "SS UNDV",
    "tag": "",
    "definition": "Primary soft starter reporting an undervoltage error.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1503,
    "number": 1502,
    "name": "SS Phase Miss",
    "tag": "",
    "definition": "Primary soft starter reporting a missing phase.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1504,
    "number": 1503,
    "name": "SS Phase Seq",
    "tag": "",
    "definition": "Primary soft starter reporting phase sequence error.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1505,
    "number": 1504,
    "name": "SS CAN Bus Rst",
    "tag": "",
    "definition": "Primary soft starter reporting a CAN bus reset.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter board and wiring."
  },
  {
    "id": 1506,
    "number": 1505,
    "name": "SS Input Flt",
    "tag": "",
    "definition": "Discrete input fault 2 from the Soft Starter has been actived.",
    "category": 0,
    "solution": "(Hydro Only) Check the SS 2 Input fault, and the contact feeding the input from the drive."
  },
  {
    "id": 1507,
    "number": 1506,
    "name": "SS2 Offline",
    "tag": "",
    "definition": "Communication lost with secondary soft starter.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1508,
    "number": 1507,
    "name": "SS2 Unk",
    "tag": "",
    "definition": "Secondary soft starter reporting an unknown fault.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1509,
    "number": 1508,
    "name": "SS2 POR Rst",
    "tag": "",
    "definition": "Secondary soft starter recovering from a reset due to power off.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1510,
    "number": 1509,
    "name": "SS2 WDT Rst",
    "tag": "",
    "definition": "Secondary soft starter recovering from reset due to watchdog.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1511,
    "number": 1510,
    "name": "SS2 BOD Rst",
    "tag": "",
    "definition": "Secondary soft starter recovering from reset due to voltage dip.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1512,
    "number": 1511,
    "name": "SS2 Comm Loss",
    "tag": "",
    "definition": "Secondary soft starter reporting loss of communication with the elevator controller.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1513,
    "number": 1512,
    "name": "SS2 OC",
    "tag": "",
    "definition": "Secondary soft starter reporting an overcurrent error.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1514,
    "number": 1513,
    "name": "SS2 OVV",
    "tag": "",
    "definition": "Secondary soft starter reporting an overvoltage error.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1515,
    "number": 1514,
    "name": "SS2 UNDV",
    "tag": "",
    "definition": "Secondary soft starter reporting an undervoltage error.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1516,
    "number": 1515,
    "name": "SS2 Phase Miss",
    "tag": "",
    "definition": "Secondary soft starter reporting a missing phase.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1517,
    "number": 1516,
    "name": "SS2 Phase Seq",
    "tag": "",
    "definition": "Secondary soft starter reporting phase sequence error.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1518,
    "number": 1517,
    "name": "SS2 CAN Bus Rst",
    "tag": "",
    "definition": "Secondary soft starter reporting a CAN bus reset.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter board and wiring."
  },
  {
    "id": 1519,
    "number": 1518,
    "name": "SS2 Input Flt",
    "tag": "",
    "definition": "Discrete input fault 2 from the Soft Starter has been actived.",
    "category": 0,
    "solution": "(Hydro Only) Check the SS 2 Input fault, and the contact feeding the input from the drive."
  },
  {
    "id": 1520,
    "number": 1519,
    "name": "SS ADDR",
    "tag": "",
    "definition": "Primary soft starter reporting another board on the network has the same address.",
    "category": 0,
    "solution": "(Hydro Only) Check primary soft starter address DIP switches."
  },
  {
    "id": 1521,
    "number": 1520,
    "name": "SS2 ADDR",
    "tag": "",
    "definition": "Secondary soft starter reporting another board on the network has the same address.",
    "category": 0,
    "solution": "(Hydro Only) Check secondary soft starter address DIP switches."
  },
  {
    "id": 1522,
    "number": 1521,
    "name": "Fire2 Hold",
    "tag": "",
    "definition": "If the car on fire phase 2 operation, and not at the recall floor. When the in car fire keyswitch is turned to the OFF position, the car will be put in a Fire Phase 2 Hold state if option Fire__Phase2ExitOnlyAtRecallFlr (01-0017) is ON. This alarm informs the user that they should move the car back to the recall floor before attempting to exit phase 2.",
    "category": 0,
    "solution": "Return the car to the recall floor before exiting phase 2."
  },
  {
    "id": 1523,
    "number": 1522,
    "name": "RCL MOVE",
    "tag": "",
    "definition": "The car has attempted to move to a recall floor but failed to start movement within 5 seconds.",
    "category": 0,
    "solution": "This alarm is for diagnostics and does not require immediate smartrise support unless accompanied by other recall related issues."
  },
  {
    "id": 1524,
    "number": 1523,
    "name": "SLWDN LRN T/O",
    "tag": "",
    "definition": "The car has failed to slowdown to configured leveling speed during a slowdown learn within 10 seconds of cutting the high speed valve. Set the car's leveling speed parameter to above the car's max leveling valve speed.",
    "category": 0,
    "solution": "This alarm is for identifying when the car's leveling speed is not set above the car's leveling speed."
  },
  {
    "id": 1525,
    "number": 1524,
    "name": "LWD UNK",
    "tag": "",
    "definition": "Serial load weighing device reporting an unknown error.",
    "category": 0,
    "solution": "Check wiring of the serial load weighing device."
  },
  {
    "id": 1526,
    "number": 1525,
    "name": "LWD POR",
    "tag": "",
    "definition": "Serial load weighing device reporting a powering on reset error.",
    "category": 0,
    "solution": "Check serial load weighing device's power supply."
  },
  {
    "id": 1527,
    "number": 1526,
    "name": "LWD WDT",
    "tag": "",
    "definition": "Serial load weighing device reporting a watchdog reset error.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1528,
    "number": 1527,
    "name": "LWD BOD",
    "tag": "",
    "definition": "Serial load weighing device reporting a brown out reset error.",
    "category": 0,
    "solution": "Check serial load weighing device's power supply."
  },
  {
    "id": 1529,
    "number": 1528,
    "name": "LWD COM SYS",
    "tag": "",
    "definition": "Serial load weighing device reporting no communciation with the C4 system detected.",
    "category": 0,
    "solution": "Check wiring of serial load weighing device's CAN H and CAN L."
  },
  {
    "id": 1530,
    "number": 1529,
    "name": "LWD COM LOAD",
    "tag": "",
    "definition": "Serial load weighing device reporting no communication detected with load cell processor.",
    "category": 0,
    "solution": "Contact smartrise support."
  },
  {
    "id": 1531,
    "number": 1530,
    "name": "LWD CAN BUS RST",
    "tag": "",
    "definition": "Serial load weighing device reporting the can bus controller has reset.",
    "category": 0,
    "solution": "Check wiring of serial load weighing device's CAN H and CAN L."
  },
  {
    "id": 1532,
    "number": 1531,
    "name": "LWD WD DISA",
    "tag": "",
    "definition": "Serial load weighing device reporting the watchdog is disabled.",
    "category": 0,
    "solution": "Check on board watchdog jumper."
  },
  {
    "id": 1533,
    "number": 1532,
    "name": "CAN1 OVF MRA",
    "tag": "",
    "definition": "The CAN1 buffer on MRA has overflowed. Investigate CN1+/- network issues.",
    "category": 0,
    "solution": "Check CN1 +/- network wiring and termination."
  },
  {
    "id": 1534,
    "number": 1533,
    "name": "CAN1 OVF CTA",
    "tag": "",
    "definition": "The CAN1 buffer on CTA has overflowed. Investigate CN1+/- network issues.",
    "category": 0,
    "solution": "Check CN1 +/- network wiring and termination."
  },
  {
    "id": 1535,
    "number": 1534,
    "name": "CAN1 OVF COPA",
    "tag": "",
    "definition": "The CAN1 buffer on COPA has overflowed. Investigate CN1+/- network issues.",
    "category": 0,
    "solution": "Check CN1 +/- network wiring and termination."
  },
  {
    "id": 1536,
    "number": 1535,
    "name": "Normal Limit Reached",
    "tag": "",
    "definition": "The car has reached the normal limits of either the bottom or top doorzone. ",
    "category": 0,
    "solution": "Move the car away from the Norma Limit. "
  },
  {
    "id": 1537,
    "number": 1536,
    "name": "Touchscreen Offline",
    "tag": "",
    "definition": "Communication has been lost between Touchscreen/COP and COP SRU.",
    "category": 0,
    "solution": "Check wiring between Tuchscreen/COP and COP SRU (C3H/C3L)"
  },
  {
    "id": 1538,
    "number": 1537,
    "name": "HB Configuration",
    "tag": "",
    "definition": "This alarm appears when Param. 01-0195 and Param. 01-0225 aren't equal.",
    "category": 0,
    "solution": "Review parameter 01-0195 and 01-0225"
  },
  {
    "id": 1539,
    "number": 1538,
    "name": "SS3 Input Flt",
    "tag": "",
    "definition": "Discrete input fault 3 from the Soft Starter has been actived.",
    "category": 0,
    "solution": "(Hydro Only) Check the SS 2 Input fault, and the contact feeding the input from the drive."
  },
  {
    "id": 1540,
    "number": 1539,
    "name": "CC Button Stuck Active",
    "tag": "",
    "definition": "A car call button is stuck active while not pressed down",
    "category": 0,
    "solution": "Check whether any car call button is experiencing an input stuck On condition while the button is not being actively pressed."
  },
  {
    "id": 1541,
    "number": 1540,
    "name": "FINAL Limit Bypassed",
    "tag": "",
    "definition": "BFL or TFL is bypassed ",
    "category": 0,
    "solution": "Check if BFL/TFL  is connected directly to 120VAC and wire it through the BFL/TFL switch"
  },
  {
    "id": 1542,
    "number": 1541,
    "name": "Phone Failure",
    "tag": "",
    "definition": "Phone failure input has been activated.",
    "category": 0,
    "solution": "Check phone failure input wiring."
  },
  {
    "id": 1543,
    "number": 1542,
    "name": "Phase Fault Input",
    "tag": "",
    "definition": "Phase fault input has been activated on learn and manual classes of operation",
    "category": 0,
    "solution": "Check Phase fault input"
  }
].map(r => ({...r, createdAt: r.createdAt ?? now, updatedAt: r.updatedAt ?? now}));
    await queryInterface.bulkInsert('system_alarms', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('system_alarms', null, {});
  }
};
