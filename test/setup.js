//added dotenv to import testURL to articles service test
require('dotenv').config()
const expect = require('chai').expect
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest