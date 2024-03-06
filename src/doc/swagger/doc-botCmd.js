/**
 * @swagger
 * paths:
 *   /api/botcmd/findfreegames/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Free game list.
 *       description: Show a list of active free games.
 *       operationId: "freegames"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. Free game list obtained.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/botcmd/newfreegames/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: New free game list.
 *       description: Show a list of new free games.
 *       operationId: "newfreegames"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID user
 *           schema:
 *             type: string
 *             example: 4323
 *       responses:
 *         "200":
 *           description: OK. New free game list obtained.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/botcmd/showlogs/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Bot logs.
 *       description: Show Bot logs.
 *       operationId: "showlogs"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. Bot logs obtained.
 *         "500":
 *           description: Internal Server Error.
 *         "401":
 *           description: Unauthorized. 
 */

/**
 * @swagger
 * paths:
 *   /api/botcmd/dolarhoy/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Dolar & Euro price.
 *       description: Show Dolar price in Argentina market.
 *       operationId: "dolarhoy"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. Dolar price obtained.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/botcmd/eurohoy/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Dolar & Euro price.
 *       description: Show Euro price in Argentina market.
 *       operationId: "eurohoy"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. Euro price obtained.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/botcmd/claerlogs/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Clear Logs.
 *       description: Clear all logs files.
 *       operationId: "claerlogs"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. Logs cleared.
 *         "500":
 *           description: Internal Server Error.
 *         "401":
 *           description: Unauthorized. 
 */