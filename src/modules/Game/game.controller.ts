import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { gameDTO, updateGameDto } from "./dto/game.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.auth.guard";
// @UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
    constructor(private gameService: GameService) { }

    @Get()
    async fetchGame(
        @Query('gameType') gameType,
    ) {
        const game = await this.gameService.getAllGameList(gameType)
        return game
    }

    @Get('single-game/:id')
    async fetchGameById(
        @Param('id') gameId,
    ) {
        const game = await this.gameService.getGame(gameId)
        return game
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async addGame(@Body() gameDTO: gameDTO) {
        const game = await this.gameService.addGame(gameDTO)
        return game
    }


    @UseGuards(JwtAuthGuard)
    @Put()
    async updateScoreOfGame(@Query('gameId') gameId, @Body() updateGameDto: updateGameDto) {
        const game = await this.gameService.updateScore(gameId, updateGameDto)
        return game
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteGame(@Query('gameId') gameId) {
        const game = await this.gameService.deleteGame(gameId)
        return game
    }

}

