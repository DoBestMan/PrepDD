class Api::UsersController < ApiController
  skip_before_action :verify_authenticity_token
  before_action :set_user, only: %i[ update ]

  def update
    picture = params[:profile_picture]
    if picture.content_type.in?(%['image/jpeg image/jpg image/png'])
      @user.profile_picture.attach(params[:profile_picture])
      render json: { status: true, user: @user, profile_url: url_for(@user.profile_picture) }
    else
      render json: { status: false, message: 'Not a valid file type' }
    end
  end

  private

  def set_user
    @user = User.find(user_params[:id])
  end

  def user_params
    params.permit(:id, profile_picture: [])
  end
end
