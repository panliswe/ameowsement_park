class RedDotGamesController < ApplicationController

    def index
        rounds = RedDotGame.all
        render json: rounds
    end

    def topscore
        rounds = RedDotGame.order('score DESC').limit(10)
        render json: rounds
    end

    def create
        round = RedDotGame.create(score: params[:score], user_id: params[:user_id])
        render json: round
    end

    def destroy
        round = RedDotGame.find(param[:id])
        round.destroy
    end
end
