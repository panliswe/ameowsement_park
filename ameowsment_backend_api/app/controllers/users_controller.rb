class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def create
        user = User.find_or_create_by(username: params[:username])
        render json: user
    end

    def update
        user = User.find(params[:id])
        user.update(username: params[:user][:username])
        render json: user
    end
end
