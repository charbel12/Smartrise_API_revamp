'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const data = [
  {
    "id": 1,
    "role_id": 1,
    "permission_id": 1
  },
  {
    "id": 2,
    "role_id": 1,
    "permission_id": 2
  },
  {
    "id": 3,
    "role_id": 1,
    "permission_id": 3
  },
  {
    "id": 4,
    "role_id": 1,
    "permission_id": 4
  },
  {
    "id": 5,
    "role_id": 1,
    "permission_id": 5
  },
  {
    "id": 6,
    "role_id": 1,
    "permission_id": 6
  },
  {
    "id": 7,
    "role_id": 1,
    "permission_id": 7
  },
  {
    "id": 8,
    "role_id": 1,
    "permission_id": 8
  },
  {
    "id": 9,
    "role_id": 1,
    "permission_id": 9
  },
  {
    "id": 10,
    "role_id": 1,
    "permission_id": 10
  },
  {
    "id": 11,
    "role_id": 1,
    "permission_id": 11
  },
  {
    "id": 12,
    "role_id": 1,
    "permission_id": 12
  },
  {
    "id": 13,
    "role_id": 1,
    "permission_id": 13
  },
  {
    "id": 14,
    "role_id": 1,
    "permission_id": 14
  },
  {
    "id": 15,
    "role_id": 1,
    "permission_id": 15
  },
  {
    "id": 16,
    "role_id": 1,
    "permission_id": 16
  },
  {
    "id": 17,
    "role_id": 1,
    "permission_id": 17
  },
  {
    "id": 18,
    "role_id": 1,
    "permission_id": 18
  },
  {
    "id": 19,
    "role_id": 1,
    "permission_id": 19
  },
  {
    "id": 20,
    "role_id": 1,
    "permission_id": 20
  },
  {
    "id": 21,
    "role_id": 1,
    "permission_id": 21
  },
  {
    "id": 22,
    "role_id": 1,
    "permission_id": 22
  },
  {
    "id": 23,
    "role_id": 1,
    "permission_id": 23
  },
  {
    "id": 24,
    "role_id": 1,
    "permission_id": 24
  },
  {
    "id": 25,
    "role_id": 1,
    "permission_id": 25
  },
  {
    "id": 26,
    "role_id": 1,
    "permission_id": 26
  },
  {
    "id": 27,
    "role_id": 1,
    "permission_id": 27
  },
  {
    "id": 28,
    "role_id": 1,
    "permission_id": 28
  },
  {
    "id": 29,
    "role_id": 1,
    "permission_id": 29
  },
  {
    "id": 30,
    "role_id": 1,
    "permission_id": 30
  },
  {
    "id": 31,
    "role_id": 1,
    "permission_id": 31
  },
  {
    "id": 32,
    "role_id": 1,
    "permission_id": 32
  },
  {
    "id": 33,
    "role_id": 1,
    "permission_id": 33
  },
  {
    "id": 34,
    "role_id": 1,
    "permission_id": 34
  },
  {
    "id": 35,
    "role_id": 1,
    "permission_id": 35
  },
  {
    "id": 36,
    "role_id": 1,
    "permission_id": 36
  },
  {
    "id": 37,
    "role_id": 1,
    "permission_id": 37
  },
  {
    "id": 38,
    "role_id": 1,
    "permission_id": 38
  },
  {
    "id": 39,
    "role_id": 1,
    "permission_id": 39
  },
  {
    "id": 40,
    "role_id": 1,
    "permission_id": 40
  },
  {
    "id": 41,
    "role_id": 1,
    "permission_id": 41
  },
  {
    "id": 42,
    "role_id": 1,
    "permission_id": 42
  },
  {
    "id": 43,
    "role_id": 1,
    "permission_id": 43
  },
  {
    "id": 44,
    "role_id": 1,
    "permission_id": 44
  },
  {
    "id": 45,
    "role_id": 1,
    "permission_id": 45
  },
  {
    "id": 47,
    "role_id": 1,
    "permission_id": 47
  },
  {
    "id": 48,
    "role_id": 1,
    "permission_id": 48
  },
  {
    "id": 49,
    "role_id": 1,
    "permission_id": 49
  },
  {
    "id": 50,
    "role_id": 1,
    "permission_id": 50
  },
  {
    "id": 60,
    "role_id": 2,
    "permission_id": 0
  },
  {
    "id": 61,
    "role_id": 2,
    "permission_id": 2
  },
  {
    "id": 64,
    "role_id": 2,
    "permission_id": 5
  },
  {
    "id": 65,
    "role_id": 2,
    "permission_id": 6
  },
  {
    "id": 66,
    "role_id": 2,
    "permission_id": 7
  },
  {
    "id": 67,
    "role_id": 2,
    "permission_id": 8
  },
  {
    "id": 68,
    "role_id": 2,
    "permission_id": 9
  },
  {
    "id": 69,
    "role_id": 2,
    "permission_id": 10
  },
  {
    "id": 70,
    "role_id": 2,
    "permission_id": 11
  },
  {
    "id": 71,
    "role_id": 2,
    "permission_id": 12
  },
  {
    "id": 72,
    "role_id": 2,
    "permission_id": 13
  },
  {
    "id": 73,
    "role_id": 2,
    "permission_id": 14
  },
  {
    "id": 74,
    "role_id": 2,
    "permission_id": 15
  },
  {
    "id": 75,
    "role_id": 2,
    "permission_id": 16
  },
  {
    "id": 76,
    "role_id": 2,
    "permission_id": 17
  },
  {
    "id": 77,
    "role_id": 2,
    "permission_id": 18
  },
  {
    "id": 78,
    "role_id": 2,
    "permission_id": 19
  },
  {
    "id": 79,
    "role_id": 2,
    "permission_id": 20
  },
  {
    "id": 80,
    "role_id": 2,
    "permission_id": 21
  },
  {
    "id": 81,
    "role_id": 2,
    "permission_id": 22
  },
  {
    "id": 82,
    "role_id": 2,
    "permission_id": 23
  },
  {
    "id": 83,
    "role_id": 2,
    "permission_id": 24
  },
  {
    "id": 84,
    "role_id": 2,
    "permission_id": 25
  },
  {
    "id": 85,
    "role_id": 2,
    "permission_id": 26
  },
  {
    "id": 86,
    "role_id": 2,
    "permission_id": 27
  },
  {
    "id": 87,
    "role_id": 2,
    "permission_id": 28
  },
  {
    "id": 88,
    "role_id": 2,
    "permission_id": 29
  },
  {
    "id": 89,
    "role_id": 2,
    "permission_id": 30
  },
  {
    "id": 90,
    "role_id": 2,
    "permission_id": 31
  },
  {
    "id": 91,
    "role_id": 2,
    "permission_id": 32
  },
  {
    "id": 92,
    "role_id": 2,
    "permission_id": 33
  },
  {
    "id": 93,
    "role_id": 2,
    "permission_id": 34
  },
  {
    "id": 94,
    "role_id": 2,
    "permission_id": 35
  },
  {
    "id": 95,
    "role_id": 2,
    "permission_id": 36
  },
  {
    "id": 96,
    "role_id": 2,
    "permission_id": 37
  },
  {
    "id": 97,
    "role_id": 2,
    "permission_id": 38
  },
  {
    "id": 98,
    "role_id": 2,
    "permission_id": 39
  },
  {
    "id": 99,
    "role_id": 2,
    "permission_id": 40
  },
  {
    "id": 100,
    "role_id": 2,
    "permission_id": 41
  },
  {
    "id": 101,
    "role_id": 2,
    "permission_id": 42
  },
  {
    "id": 102,
    "role_id": 2,
    "permission_id": 43
  },
  {
    "id": 103,
    "role_id": 2,
    "permission_id": 44
  },
  {
    "id": 105,
    "role_id": 2,
    "permission_id": 1
  },
  {
    "id": 106,
    "role_id": 2,
    "permission_id": 4
  },
  {
    "id": 116,
    "role_id": 3,
    "permission_id": 0
  },
  {
    "id": 117,
    "role_id": 3,
    "permission_id": 2
  },
  {
    "id": 120,
    "role_id": 3,
    "permission_id": 5
  },
  {
    "id": 121,
    "role_id": 3,
    "permission_id": 6
  },
  {
    "id": 122,
    "role_id": 3,
    "permission_id": 7
  },
  {
    "id": 123,
    "role_id": 3,
    "permission_id": 8
  },
  {
    "id": 124,
    "role_id": 3,
    "permission_id": 9
  },
  {
    "id": 125,
    "role_id": 3,
    "permission_id": 10
  },
  {
    "id": 126,
    "role_id": 3,
    "permission_id": 11
  },
  {
    "id": 127,
    "role_id": 3,
    "permission_id": 12
  },
  {
    "id": 128,
    "role_id": 3,
    "permission_id": 13
  },
  {
    "id": 129,
    "role_id": 3,
    "permission_id": 14
  },
  {
    "id": 130,
    "role_id": 3,
    "permission_id": 15
  },
  {
    "id": 131,
    "role_id": 3,
    "permission_id": 16
  },
  {
    "id": 132,
    "role_id": 3,
    "permission_id": 17
  },
  {
    "id": 133,
    "role_id": 3,
    "permission_id": 18
  },
  {
    "id": 134,
    "role_id": 3,
    "permission_id": 19
  },
  {
    "id": 135,
    "role_id": 3,
    "permission_id": 20
  },
  {
    "id": 136,
    "role_id": 3,
    "permission_id": 21
  },
  {
    "id": 137,
    "role_id": 3,
    "permission_id": 22
  },
  {
    "id": 138,
    "role_id": 3,
    "permission_id": 23
  },
  {
    "id": 139,
    "role_id": 3,
    "permission_id": 24
  },
  {
    "id": 140,
    "role_id": 3,
    "permission_id": 25
  },
  {
    "id": 141,
    "role_id": 3,
    "permission_id": 26
  },
  {
    "id": 142,
    "role_id": 3,
    "permission_id": 27
  },
  {
    "id": 143,
    "role_id": 3,
    "permission_id": 28
  },
  {
    "id": 144,
    "role_id": 3,
    "permission_id": 29
  },
  {
    "id": 145,
    "role_id": 3,
    "permission_id": 30
  },
  {
    "id": 146,
    "role_id": 3,
    "permission_id": 31
  },
  {
    "id": 147,
    "role_id": 3,
    "permission_id": 32
  },
  {
    "id": 148,
    "role_id": 3,
    "permission_id": 33
  },
  {
    "id": 149,
    "role_id": 3,
    "permission_id": 34
  },
  {
    "id": 150,
    "role_id": 3,
    "permission_id": 35
  },
  {
    "id": 151,
    "role_id": 3,
    "permission_id": 36
  },
  {
    "id": 152,
    "role_id": 3,
    "permission_id": 37
  },
  {
    "id": 153,
    "role_id": 3,
    "permission_id": 38
  },
  {
    "id": 154,
    "role_id": 3,
    "permission_id": 39
  },
  {
    "id": 155,
    "role_id": 3,
    "permission_id": 40
  },
  {
    "id": 156,
    "role_id": 3,
    "permission_id": 41
  },
  {
    "id": 157,
    "role_id": 3,
    "permission_id": 42
  },
  {
    "id": 158,
    "role_id": 3,
    "permission_id": 43
  },
  {
    "id": 159,
    "role_id": 3,
    "permission_id": 44
  },
  {
    "id": 160,
    "role_id": 3,
    "permission_id": 1
  },
  {
    "id": 161,
    "role_id": 3,
    "permission_id": 4
  },
  {
    "id": 166,
    "role_id": 4,
    "permission_id": 43
  },
  {
    "id": 167,
    "role_id": 4,
    "permission_id": 44
  },
  {
    "id": 168,
    "role_id": 4,
    "permission_id": 0
  },
  {
    "id": 169,
    "role_id": 4,
    "permission_id": 12
  },
  {
    "id": 170,
    "role_id": 4,
    "permission_id": 13
  },
  {
    "id": 171,
    "role_id": 4,
    "permission_id": 14
  },
  {
    "id": 172,
    "role_id": 4,
    "permission_id": 15
  },
  {
    "id": 173,
    "role_id": 4,
    "permission_id": 16
  },
  {
    "id": 174,
    "role_id": 4,
    "permission_id": 17
  },
  {
    "id": 179,
    "role_id": 5,
    "permission_id": 18
  },
  {
    "id": 180,
    "role_id": 5,
    "permission_id": 19
  },
  {
    "id": 181,
    "role_id": 5,
    "permission_id": 20
  },
  {
    "id": 182,
    "role_id": 5,
    "permission_id": 21
  },
  {
    "id": 183,
    "role_id": 5,
    "permission_id": 22
  },
  {
    "id": 184,
    "role_id": 5,
    "permission_id": 23
  },
  {
    "id": 185,
    "role_id": 5,
    "permission_id": 24
  },
  {
    "id": 186,
    "role_id": 1,
    "permission_id": 52
  },
  {
    "id": 187,
    "role_id": 1,
    "permission_id": 53
  },
  {
    "id": 188,
    "role_id": 1,
    "permission_id": 54
  },
  {
    "id": 189,
    "role_id": 1,
    "permission_id": 55
  },
  {
    "id": 190,
    "role_id": 1,
    "permission_id": 56
  },
  {
    "id": 191,
    "role_id": 1,
    "permission_id": 57
  },
  {
    "id": 192,
    "role_id": 1,
    "permission_id": 58
  },
  {
    "id": 193,
    "role_id": 1,
    "permission_id": 77
  },
  {
    "id": 194,
    "role_id": 1,
    "permission_id": 78
  },
  {
    "id": 195,
    "role_id": 1,
    "permission_id": 79
  },
  {
    "id": 196,
    "role_id": 1,
    "permission_id": 76
  },
  {
    "id": 197,
    "role_id": 1,
    "permission_id": 80
  },
  {
    "id": 198,
    "role_id": 1,
    "permission_id": 81
  },
  {
    "id": 199,
    "role_id": 1,
    "permission_id": 82
  },
  {
    "id": 200,
    "role_id": 1,
    "permission_id": 83
  },
  {
    "id": 201,
    "role_id": 1,
    "permission_id": 84
  },
  {
    "id": 202,
    "role_id": 1,
    "permission_id": 76
  },
  {
    "id": 203,
    "role_id": 1,
    "permission_id": 59
  },
  {
    "id": 204,
    "role_id": 1,
    "permission_id": 60
  },
  {
    "id": 205,
    "role_id": 1,
    "permission_id": 61
  },
  {
    "id": 206,
    "role_id": 1,
    "permission_id": 63
  },
  {
    "id": 207,
    "role_id": 1,
    "permission_id": 66
  },
  {
    "id": 208,
    "role_id": 1,
    "permission_id": 67
  },
  {
    "id": 209,
    "role_id": 1,
    "permission_id": 71
  },
  {
    "id": 210,
    "role_id": 1,
    "permission_id": 72
  },
  {
    "id": 211,
    "role_id": 1,
    "permission_id": 74
  },
  {
    "id": 212,
    "role_id": 1,
    "permission_id": 52
  },
  {
    "id": 213,
    "role_id": 1,
    "permission_id": 53
  },
  {
    "id": 214,
    "role_id": 1,
    "permission_id": 58
  },
  {
    "id": 215,
    "role_id": 1,
    "permission_id": 75
  },
  {
    "id": 216,
    "role_id": 1,
    "permission_id": 85
  },
  {
    "id": 217,
    "role_id": 1,
    "permission_id": 86
  },
  {
    "id": 218,
    "role_id": 1,
    "permission_id": 87
  },
  {
    "id": 219,
    "role_id": 1,
    "permission_id": 88
  },
  {
    "id": 220,
    "role_id": 1,
    "permission_id": 89
  },
  {
    "id": 280,
    "role_id": 1,
    "permission_id": 90
  },
  {
    "id": 281,
    "role_id": 1,
    "permission_id": 91
  },
  {
    "id": 282,
    "role_id": 1,
    "permission_id": 92
  }
].map(r => ({...r, createdAt: r.createdAt ?? now, updatedAt: r.updatedAt ?? now}));
    await queryInterface.bulkInsert('roles_permissions', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles_permissions', null, {});
  }
};
