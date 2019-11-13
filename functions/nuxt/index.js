const Koa = require('koa')
const { Nuxt } = require('nuxt')
const serverless = require('serverless-http')
const fs = require('fs')
const path = require('path')

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('./nuxt.config.js')
config.dev = false
async function main(...args) {
  console.log(...args)
  const nuxt = new Nuxt(config)
  await nuxt.ready()
  app.use((ctx) => {
    ctx.status = 200
    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    ctx.set('Pragma', 'no-cache')
    ctx.set('Expires', 0)
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash

    try {
      nuxt.render(ctx.req, ctx.res)
    } catch (e) {
      console.log(e)
    }
  })

  return serverless(app, {
    binary: ['application/javascript',
      'application/json',
      'application/octet-stream',
      'application/xml',
      'font/eot',
      'font/opentype',
      'font/otf',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'text/comma-separated-values',
      'text/css',
      'text/javascript',
      'text/plain',
      'text/text',
      'text/xml']
  })(...args)
}

exports.main = main

// async function start() {
//   // Instantiate nuxt.js
//   const nuxt = new Nuxt(config)

//   const {
//     host = process.env.HOST || '127.0.0.1',
//     port = process.env.PORT || 3000
//   } = nuxt.options.server
//   await nuxt.ready()

//   app.use((ctx) => {
//     ctx.status = 200
//     ctx.respond = false // Bypass Koa's built-in response handling
//     ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
//     nuxt.render(ctx.req, ctx.res)
//   })

//   app.listen(port, host)
//   consola.ready({
//     message: `Server listening on http://${host}:${port}`,
//     badge: true
//   })
// }

// start()