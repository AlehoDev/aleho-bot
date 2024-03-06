/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT*
 *
 *   schemas:
 * 
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Pepe
 *         lastname:
 *           type: string
 *           example: Argento
 *         email:
 *           type: string
 *           example: pepeargento@mail.com
 *         password:
 *           type: string
 *           example: fatiga
 *         image:
 *           type: string
 *           example: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgWSWOqeAoLAfMlbBBg8IN-v2x5IGAfbuSg&usqp=CAU
 * 
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2051
 *         url:
 *           type: string
 *           example: https://www.gamerpower.com/open/star-wars-squadrons
 *         title:
 *           type: string
 *           example: Star Wars Squadrons
 *         thumbnail:
 *           type: string
 *           example: https://www.gamerpower.com/offers/1/637f97a6a0d55.jpg
 *         status:
 *           type: string
 *           example: Active
 *         type:
 *           type: string
 *           example: Game
 *         end_date:
 *           type: string
 *           example: 2022-12-01 23:59:00
 * 
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: pepeargento@mail.com
 *         password:
 *           type: string
 *           example: fatiga 
 * 
 */