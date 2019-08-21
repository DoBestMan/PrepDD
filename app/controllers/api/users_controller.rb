class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user, only: %i[ update ]

  def update
    render json: {user: @user}
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(profile_picture: [])
  end
end
