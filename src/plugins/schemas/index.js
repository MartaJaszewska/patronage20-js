const fp = require('fastify-plugin')
const path = require('path')

function registerSchemas (fastify, options, next) {
  // fastify.addSchema(require(path.resolve('./src/docs/schemas/endpoints/get/dashboard.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/dashboard-get-200.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/generic-error.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/hvac-status.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/map-add-request-body.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/map-point.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/rfid-sensor.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/rfid-tag.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/sensor-id.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/smoke-sensor.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/temperature-sensor.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/window-blind.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/window-sensor.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/hvac-room.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/light.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/notifications-get-200.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/notifications-body.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/notifications-id.json')))
  fastify.addSchema(require(path.resolve('./src/docs/schemas/timestamp.json')))

  next()
}

module.exports = fp(registerSchemas)
