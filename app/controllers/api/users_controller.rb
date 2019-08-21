class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user, only: %i[ update ]

  def update
    @user.profile_picture.attach(params[:profile_picture])
    render json: {user: @user}
  end

  private

  def set_user
    @user = User.find(user_params[:id])
  end

  def user_params
    params.permit(:id, profile_picture: [])
  end
end
