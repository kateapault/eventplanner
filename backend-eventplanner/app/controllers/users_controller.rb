class UsersController < ApplicationController
  def new
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id]);
    render json: @user
  end

  def create
    @user = User.new(user_params);
    
    if @user.save
      render json: @user.to_json
    else
      render json: ("User creation unsuccessful").to_json
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: ("User successfully deleted")   # do we want to return the destroyed json for an undo option?
  end

  private

  def user_params
    params.require(:user).permit(:username, :name, :age, :email, :phone_number)
  end


 end