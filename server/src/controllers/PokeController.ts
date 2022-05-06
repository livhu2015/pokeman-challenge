import {
  Controller,
  Get
} from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { pokeServiceCore } from "../core/PokeServiceCore";

@Controller("poke-service")
export class PokeController {
  /**
 * @swagger
 * /poke-service/ping:
 *   get:
 *     description: Returns the status of the server
 *     responses:
 *       200:
 *         description: Pong
 */
  @Get("ping")
  private async ping(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return res.status(200).send({
      status: true,
      message: "Pong",
      data: "Pong",
    });
  }

/**
 * @swagger
 * /poke-service/get/pokemons:
 *   get:
 *     description: Get a list of pokemons
 *     responses:
 *       200:
 *         description: Returns a list of pokemons.
 */
  @Get("get/pokemons")
  private async getPokemons(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { page = 0 } = req.query;

    return res.json(await pokeServiceCore.getPokemons(+page));
  }

/**
 * @swagger
 * /poke-service/get/pokemon/{id}:
 *   get:
 *     description: Get a pokemon by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Pokemon's id.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a pokemon with the provided id.
 */
  @Get("get/pokemon/:id")
  private async getPokemon(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;

    return res.json(await pokeServiceCore.getPokemon(id));
  }
}
