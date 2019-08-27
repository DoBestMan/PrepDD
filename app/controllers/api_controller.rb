class ApiController < ActionController::Base
  before_action :authenticate

  def authenticate
    api_key = request.headers['X-Api-Key']
    if api_key.present? && api_key == 'jKXFpXpMXYeeI0aCPfh14w'
      true
    else
      render json: { error: 'Invalid Api-Key' }, status: :unauthorized
    end
  end
end
