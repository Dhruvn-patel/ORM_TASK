/**
 * 
 * @swagger
 * /:
 *   post:
 *     summary: Generate combo
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: gender
 *                 type:
 *                   type: string
 *                   example: radio
 *                 options: 
 *                   type: array
 *                   items:
 *                      type: object
 *                      xml:
 *                         name: 'options'
 *                      properties: 
 *                         values:
 *                          type: string
 *                   example: 
 *                     - values: "male"
 *                     - values: "female"
 *     responses:
 *       200:
 *         description: okk
 *       404:
 *         description: error
 *       
 */

/**
 * 
 * @swagger
 * /show:
 *    get:
 *      summary: Returns options for a given name
 *      requestBody:
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: radio
 *                 fields: 
 *                   type: string
 *                   example: checkbox
 *                
 *       responses:
 *        200:
 *           description: okk
 *           content: 
 *               application/json:
 *               schema:   
 *                type: object
 *                properties:
 *        500:
 *           description: error
 */

/**
 * @swagger
 * /update/{Id}:
 *    put:
 *      summary: Returns options for a given name
 *      parameters:
 *       - name: Id
 *         in: path
 *         required: true
 *         description: Parameter description in CommonMark or HTML.
 *         schema:
 *             type : integer
 *             format: int64
 *             minimum: 1
 *      requestBody:
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: checkbox
 *                 name: 
 *                   type: string
 *                   example: state
 *      responses:
 *        200:
 *           description: okk
 *        500:
 *           description: error
 * 
 */